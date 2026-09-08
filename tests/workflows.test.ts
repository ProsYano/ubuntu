import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openDatabase } from "../src/lib/server/database";
import { Store } from "../src/lib/server/store";
import { hashPassword, verifyPassword, tokenHash } from "../src/lib/server/passwords";
import { equipmentSchema } from "../src/lib/equipment-schema";
import { returnPath } from "../src/lib/return-path";
import { orderSchema, registrationSchema, today } from "../src/lib/workflow-schema";

function fixture() {
  const db = openDatabase(":memory:"), store = new Store(db);
  const client = store.createUser("Client un", "one@example.test", "unused");
  const other = store.createUser("Client deux", "two@example.test", "unused");
  const agent = store.createUser("Agent", "agent@example.test", "unused", "agent");
  const admin = store.createUser("Admin", "admin@example.test", "unused", "admin");
  const equipment = store.published().items[0];
  const future = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
  const order = () => ({ equipment_id: equipment.id, start_date: future(10), end_date: future(12), phone: "+242 060000000", company: "", location: "Brazzaville", notes: "Terrassement du chantier principal.", request_key: randomUUID() });
  return { db, store, client, other, agent, admin, equipment, order };
}

test("agents and admins can mutate the shared catalogue, with drafts, trash and stale-write protection", () => {
  const { db, store, client, agent, admin, equipment } = fixture();
  try {
    const input = equipmentSchema.parse({ ...equipment, name: "Pelle de test", status: "draft" });
    for (const id of [client.id, "unknown"]) {
      assert.throws(() => store.saveEquipment(id, input, null, "", null), /accès/);
      assert.throws(() => store.catalogue(id, "all"), /accès/);
      assert.throws(() => store.trashEquipment(id, equipment.id, equipment.updated_at), /accès/);
    }
    const slug = store.saveEquipment(agent.id, input, null, "", null);
    const adminSlug = store.saveEquipment(admin.id, { ...input, name: "Pelle admin" }, null, "", null);
    assert.equal(store.publishedBySlug(adminSlug), undefined);
    assert.equal(store.publishedBySlug(slug), undefined);
    const draft = store.catalogue(agent.id, "draft").items.find(item => item.slug === slug)!;
    store.saveEquipment(agent.id, { ...input, status: "published" }, draft.id, draft.updated_at, null);
    assert.throws(() => store.saveEquipment(agent.id, input, draft.id, draft.updated_at, null), /changé/);
    const published = store.publishedBySlug(slug)!;
    assert.equal(published.slug, slug);
    assert.throws(() => store.saveEquipment(agent.id, input, published.id, published.updated_at, "https://evil.test/a.svg"), /Image/);
    store.trashEquipment(agent.id, published.id, published.updated_at);
    assert.equal(store.publishedBySlug(slug), undefined);
    const trashed = store.catalogue(agent.id, "trash").items[0];
    assert.throws(() => store.trashEquipment(agent.id, trashed.id, published.updated_at, true), /changé/);
    store.trashEquipment(agent.id, trashed.id, trashed.updated_at, true);
    assert.equal(store.equipment(agent.id, trashed.id)?.status, "draft");
    assert.equal(store.publishedBySlug(slug), undefined);
  } finally { db.close(); }
});

test("orders preserve server-side ownership and price snapshots, with atomic duplicate prevention", () => {
  const { db, store, client, other, agent, admin, equipment, order } = fixture();
  try {
    const input = { ...order(), user_id: other.id, daily_rate: 1, status: "accepted" };
    const id = store.createOrder(client.id, input);
    assert.equal(store.createOrder(client.id, input), id);
    const created = store.order(client.id, id)!;
    assert.equal(created.user_id, client.id); assert.equal(created.daily_rate, equipment.daily_rate); assert.equal(created.status, "pending");
    assert.equal(store.orders(client.id).total, 1); assert.equal(store.orders(other.id).total, 0); assert.equal(store.orders(admin.id).total, 1);
    assert.equal(store.order(other.id, id), undefined);
    assert.throws(() => store.orderEvents(other.id, id), /introuvable/);
    assert.throws(() => store.orderConversation(other.id, id), /introuvable/);
    assert.throws(() => store.orders(agent.id), /accès/);
    assert.throws(() => store.createOrder(agent.id, order()), /accès/);
    assert.throws(() => store.createOrder(admin.id, order()), /accès/);
    assert.throws(() => store.updateOrder(other.id, id, "cancelled", 1, ""), /changé/);
    assert.throws(() => store.updateOrder(client.id, id, "accepted", 1, ""), /autorisé/);
    store.saveEquipment(agent.id, { ...equipment, daily_rate: 999000 }, equipment.id, equipment.updated_at, equipment.image_path);
    assert.equal(store.order(client.id, id)!.daily_rate, equipment.daily_rate);
    assert.equal(store.orderEvents(client.id, id).length, 1);
  } finally { db.close(); }
});

test("admin processing rejects overlapping accepted bookings and stale updates", () => {
  const { db, store, client, other, admin, order } = fixture();
  try {
    const first = store.createOrder(client.id, order()), second = store.createOrder(other.id, order());
    store.updateOrder(admin.id, first, "accepted", 1, "Dates confirmées.");
    assert.throws(() => store.updateOrder(admin.id, first, "cancelled", 1, "Annulation"), /changé/);
    assert.throws(() => store.updateOrder(admin.id, second, "accepted", 1, ""), /déjà réservé/);
    assert.equal(store.order(admin.id, second)!.version, 1);
    assert.throws(() => store.updateOrder(client.id, first, "cancelled", 2, ""), /autorisé/);
    assert.throws(() => store.updateOrder(admin.id, first, "cancelled", 2, ""), /raison/);
    store.updateOrder(admin.id, first, "cancelled", 2, "À la demande du client.");
    store.updateOrder(admin.id, second, "accepted", 1, "");
    store.updateOrder(admin.id, second, "completed", 2, "Location terminée.");
    assert.throws(() => store.updateOrder(admin.id, second, "accepted", 3, ""), /autorisé/);
    assert.equal(store.orderEvents(admin.id, second).length, 3);
  } finally { db.close(); }
});

test("unavailable and removed equipment cannot be ordered or accepted", () => {
  const { db, store, client, agent, admin, equipment, order } = fixture();
  try {
    const id = store.createOrder(client.id, order());
    store.saveEquipment(agent.id, { ...equipment, availability: "unavailable" }, equipment.id, equipment.updated_at, equipment.image_path);
    assert.throws(() => store.createOrder(client.id, order()), /disponible/);
    assert.throws(() => store.updateOrder(admin.id, id, "accepted", 1, ""), /disponible/);
    const latest = store.equipment(agent.id, equipment.id)!;
    store.trashEquipment(agent.id, latest.id, latest.updated_at);
    assert.throws(() => store.createOrder(client.id, order()), /disponible/);
    assert.equal(store.order(client.id, id)!.equipment_name, equipment.name);
  } finally { db.close(); }
});

test("clients can cancel pending orders and see their history", () => {
  const { db, store, client, order } = fixture();
  try {
    const id = store.createOrder(client.id, order());
    store.updateOrder(client.id, id, "cancelled", 1, "Chantier reporté.");
    assert.equal(store.order(client.id, id)!.status, "cancelled");
    assert.equal(store.orderEvents(client.id, id)[1].note, "Chantier reporté.");
    assert.throws(() => store.updateOrder(client.id, id, "cancelled", 2, ""), /autorisé/);
  } finally { db.close(); }
});

test("conversation access, admin replies, unread receipts and close/reopen rules", () => {
  const { db, store, client, other, agent, admin } = fixture();
  try {
    const input = { subject: "Question de transport", body: "Livrez-vous sur mon chantier ?", request_key: randomUUID(), user_id: other.id };
    const id = store.createConversation(client.id, input);
    assert.equal(store.createConversation(client.id, input), id);
    assert.equal(store.conversations(other.id).total, 0);
    assert.equal(store.conversation(other.id, id), undefined);
    assert.throws(() => store.messages(other.id, id), /introuvable/);
    assert.throws(() => store.sendMessage(other.id, id, { body: "Intrusion", request_key: randomUUID() }), /inaccessible/);
    assert.throws(() => store.conversations(agent.id), /accès/);
    assert.equal(store.conversations(admin.id).items[0].unread, 1);
    const first = store.messages(admin.id, id).items[0];
    store.markRead(admin.id, id, first.id);
    assert.equal(store.conversations(admin.id).items[0].unread, 0);
    assert.ok(store.messages(client.id, id).items[0].read_at);
    const reply = { body: "Oui, précisez votre adresse.", request_key: randomUUID(), sender_role: "client" };
    store.sendMessage(admin.id, id, reply); store.sendMessage(admin.id, id, reply);
    assert.equal(store.messages(client.id, id).total, 2);
    assert.equal(store.messages(client.id, id).items[0].sender_role, "admin");
    assert.equal(store.conversations(client.id).items[0].unread, 1);
    assert.throws(() => store.closeConversation(client.id, id, true, 1), /accès/);
    store.closeConversation(admin.id, id, true, 1);
    assert.throws(() => store.sendMessage(client.id, id, { body: "Merci", request_key: randomUUID() }), /fermée/);
    assert.throws(() => store.closeConversation(admin.id, id, false, 1), /changé/);
    store.closeConversation(admin.id, id, false, 2);
    store.sendMessage(client.id, id, { body: "Merci", request_key: randomUUID() });
    assert.equal(store.messages(client.id, id).total, 3);
    assert.throws(() => store.markRead(other.id, id, 999), /introuvable/);
  } finally { db.close(); }
});

test("messages and lists are paginated without exposing other clients", () => {
  const { db, store, client, other, admin } = fixture();
  try {
    const id = store.createConversation(client.id, { subject: "Suivi du chantier", body: "Premier message", request_key: randomUUID() });
    for (let i = 0; i < 24; i++) store.sendMessage(admin.id, id, { body: `Réponse ${i}`, request_key: randomUUID() });
    assert.equal(store.messages(client.id, id, 1).items.length, 20); assert.equal(store.messages(client.id, id, 2).items.length, 5);
    assert.equal(store.messages(client.id, id, 1).total, 25);
    const visible = store.messages(client.id, id, 1).items;
    store.markRead(client.id, id, Math.max(...visible.map(item => item.id)), Math.min(...visible.map(item => item.id)));
    assert.equal(store.conversations(client.id).items[0].unread, 4);
    assert.equal(store.conversations(other.id).items.length, 0);
    assert.equal(store.users(admin.id, 1, "Client").total, 2);
    assert.throws(() => store.users(client.id), /accès/);
  } finally { db.close(); }
});

test("sessions are hashed, expire and immediately reflect role changes and suspensions", () => {
  const { db, store, client, admin, agent } = fixture();
  try {
    const session = store.createSession(client.id);
    assert.equal(store.session(session.token)?.id, client.id);
    assert.equal((db.prepare("SELECT token_hash FROM sessions").get() as { token_hash: string }).token_hash, tokenHash(session.token));
    assert.equal(store.session("invalid"), null);
    assert.throws(() => store.updateUser(client.id, client.id, "agent", true), /accès/);
    assert.throws(() => store.updateUser(admin.id, admin.id, "client", true), /propres/);
    assert.throws(() => store.updateUser(admin.id, client.id, "admin", true), /administrateurs/);
    store.updateUser(admin.id, client.id, "agent", true);
    assert.equal(store.session(session.token), null);
    const next = store.createSession(client.id);
    assert.equal(store.session(next.token)?.role, "agent");
    store.updateUser(admin.id, client.id, "agent", false);
    assert.equal(store.session(next.token), null);
    assert.throws(() => store.createSession(client.id), /accès/);
    assert.throws(() => store.catalogue(client.id, "all"), /accès/);
    const expires = store.createSession(agent.id);
    db.prepare("UPDATE sessions SET expires_at = 0 WHERE token_hash = ?").run(tokenHash(expires.token));
    assert.equal(store.session(expires.token), null);
  } finally { db.close(); }
});

test("password hashing and recovery tokens are salted, single-use, expiring and revoke sessions", async () => {
  const { db, store, client } = fixture();
  try {
    const password = "A long test password!", hash = await hashPassword(password);
    assert.notEqual(hash, await hashPassword(password));
    assert.equal(await verifyPassword(password, hash), true); assert.equal(await verifyPassword("wrong", hash), false);
    assert.equal(await verifyPassword(password, "invalid"), false);
    const session = store.createSession(client.id), token = store.issueReset(client.id);
    store.consumeReset(token, hash);
    assert.throws(() => store.createSession(client.id, "unused"), /changé/);
    assert.equal(store.credentials(client.email)!.password_hash, hash);
    assert.equal(store.session(session.token), null);
    assert.throws(() => store.consumeReset(token, hash), /expiré/);
    const expired = store.issueReset(client.id);
    db.prepare("UPDATE password_resets SET expires_at = 0").run();
    assert.throws(() => store.consumeReset(expired, hash), /expiré/);
    const changedSession = store.createSession(client.id);
    assert.throws(() => store.replacePassword(client.id, "new", "old"), /changé/);
    store.replacePassword(client.id, hash, hash);
    assert.equal(store.session(changedSession.token), null);
  } finally { db.close(); }
});

test("limits persist and cannot be bypassed by repeating an action", () => {
  const { db, store } = fixture();
  try {
    store.limit("login:one", 2, 10000); store.limit("login:one", 2, 10000);
    assert.throws(() => store.limit("login:one", 2, 10000), /tentatives/);
    db.prepare("UPDATE rate_limits SET expires_at = 0").run();
    assert.doesNotThrow(() => store.limit("login:one", 2, 10000));
  } finally { db.close(); }
});

test("input validation rejects past and impossible dates, invalid periods and forged roles", () => {
  const { db, order } = fixture();
  try {
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(today()));
    assert.equal(orderSchema.safeParse({ ...order(), start_date: "2020-01-01" }).success, false);
    assert.equal(orderSchema.safeParse({ ...order(), start_date: "2027-02-30" }).success, false);
    assert.equal(orderSchema.safeParse({ ...order(), end_date: "2020-01-01" }).success, false);
    assert.equal(orderSchema.safeParse({ ...order(), end_date: "2099-01-01" }).success, false);
    const input = registrationSchema.parse({ name: "Client", email: " CLIENT@example.test ", password: "a sufficiently long password", role: "admin" });
    assert.equal(input.email, "client@example.test"); assert.equal("role" in input, false);
  } finally { db.close(); }
});

test("file persistence, migrations and backup retain data without reseeding deleted catalogue", async () => {
  const directory = await mkdtemp(join(tmpdir(), "rentx-sqlite-test-"));
  let db = openDatabase(join(directory, "rentx.db"));
  try {
    let store = new Store(db);
    const agent = store.createUser("Agent", "persist@example.test", "hash", "agent");
    const initial = store.published();
    assert.equal(initial.total, 6);
    for (const item of initial.items) store.trashEquipment(agent.id, item.id, item.updated_at);
    await db.backup(join(directory, "backup.db"));
    db.close(); db = openDatabase(join(directory, "rentx.db")); store = new Store(db);
    assert.equal(store.published().total, 0); assert.equal(store.catalogue(agent.id, "trash").total, 6);
    const backup = openDatabase(join(directory, "backup.db"));
    try { assert.equal(new Store(backup).catalogue(agent.id, "trash").total, 6); assert.equal(backup.pragma("integrity_check", { simple: true }), "ok"); }
    finally { backup.close(); }
  } finally { db.close(); await rm(directory, { recursive: true, force: true }); }
});

test("login return destinations reject external URLs and unknown paths", () => {
  assert.equal(returnPath("https://evil.test"), "/compte");
  assert.equal(returnPath("//evil.test"), "/compte");
  assert.equal(returnPath("/gestion/utilisateurs"), "/compte");
  assert.equal(returnPath("/compte/messages/nouveau"), "/compte/messages/nouveau");
  const url = `/compte/commandes/nouvelle?engin=${randomUUID()}`;
  assert.equal(returnPath(url), url);
});


test("public requests retain equipment and contacts, deduplicate and restrict admin access", () => {
  const { db, store, client, agent, admin, equipment, order } = fixture();
  try {
    const input = { ...order(), name: "Visiteur chantier", email: "visitor@example.test" };
    const id = store.createPublicQuoteRequest(input);
    assert.equal(store.createPublicQuoteRequest(input), id);
    const result = store.publicQuoteRequests(admin.id);
    assert.equal(result.total, 1);
    assert.equal(result.items[0].equipment_id, equipment.id);
    assert.equal(result.items[0].equipment_name, equipment.name);
    assert.equal(result.items[0].email, input.email);
    for (const actor of [client.id, agent.id, "unknown"]) assert.throws(() => store.publicQuoteRequests(actor));
    for (const change of [{ status: "draft" }, { availability: "unavailable" }, { deleted_at: new Date().toISOString() }]) {
      db.prepare("UPDATE equipment SET status = 'published', availability = 'available', deleted_at = NULL WHERE id = ?").run(equipment.id);
      const [key, value] = Object.entries(change)[0];
      db.prepare(`UPDATE equipment SET ${key} = ? WHERE id = ?`).run(value, equipment.id);
      assert.throws(() => store.createPublicQuoteRequest({ ...input, request_key: randomUUID() }), /disponible/);
    }
  } finally { db.close(); }
});


test("rental dates reject inverted periods on the server and allow the same day", () => {
  const { db, store, client, admin, order } = fixture();
  try {
    const input = { ...order(), name: "Client dates", email: "dates@example.test" };
    const reversed = { ...input, start_date: input.end_date, end_date: input.start_date };
    assert.throws(() => store.createPublicQuoteRequest(reversed), /date de fin/);
    assert.throws(() => store.createOrder(client.id, reversed), /date de fin/);
    assert.equal(store.publicQuoteRequests(admin.id).total, 0);
    assert.equal(store.orders(admin.id).total, 0);
    const sameDay = { ...input, end_date: input.start_date };
    assert.ok(store.createPublicQuoteRequest(sameDay));
    assert.ok(store.createOrder(client.id, sameDay));
  } finally { db.close(); }
});

test("special characters and SQL or HTML payloads are stored as literal rental text", () => {
  const { db, store, client, admin, equipment, order } = fixture();
  try {
    const input = {
      ...order(), name: `Élodie O'Connor & associés`, email: "special+quote@example.test",
      company: `BTP "Étoile" <Congo> & fils`, location: `Allée de l'Été — dépôt 🚜`,
      notes: `L'engin coûte 100% : <script>alert("test")</script> & <img src=x onerror=alert(1)>\n'); DROP TABLE equipment; --`,
    };
    store.createPublicQuoteRequest(input);
    const quote = store.publicQuoteRequests(admin.id).items[0];
    for (const key of ["name", "company", "location", "notes"] as const) assert.equal(quote[key], input[key]);
    const id = store.createOrder(client.id, input);
    const saved = store.order(admin.id, id)!;
    for (const key of ["company", "location", "notes"] as const) assert.equal(saved[key], input[key]);
    assert.equal(store.publishedBySlug(equipment.slug)?.id, equipment.id);
    assert.equal(store.orders(admin.id).total, 1);
  } finally { db.close(); }
});


test("public quote lifecycle, unified filters, authorization and cross-source booking conflicts", () => {
  const { db, store, client, agent, admin, order } = fixture();
  try {
    const raw = { ...order(), name: "Contact visiteur", email: "contact@example.test" };
    const id = store.createPublicQuoteRequest(raw);
    const accountId = store.createOrder(client.id, order());
    assert.equal(store.rentalRequests(admin.id, 1, "pending").total, 2);
    for (const actor of [client.id, agent.id, "unknown"]) {
      assert.throws(() => store.rentalRequests(actor));
      assert.throws(() => store.publicQuote(actor, id));
      assert.throws(() => store.updatePublicQuote(actor, id, "accepted", 1, ""));
    }
    assert.throws(() => store.updatePublicQuote(admin.id, id, "completed", 1, ""), /autorisé/);
    assert.throws(() => store.updatePublicQuote(admin.id, id, "rejected", 1, ""), /motif/);
    store.updatePublicQuote(admin.id, id, "accepted", 1, "Accord confirmé");
    assert.equal(store.rentalRequests(admin.id, 1, "accepted").total, 1);
    assert.throws(() => store.updatePublicQuote(admin.id, id, "cancelled", 1, "Annulation"), /changé/);
    assert.throws(() => store.updateOrder(admin.id, accountId, "accepted", 1, ""), /réservé/);
    const second = store.createPublicQuoteRequest({ ...raw, request_key: randomUUID() });
    assert.throws(() => store.updatePublicQuote(admin.id, second, "accepted", 1, ""), /réservé/);
    store.updatePublicQuote(admin.id, id, "completed", 2, "Location terminée");
    assert.equal(store.publicQuoteEvents(admin.id, id).length, 3);
    store.updateOrder(admin.id, accountId, "accepted", 1, "");
    assert.throws(() => store.updatePublicQuote(admin.id, second, "accepted", 1, ""), /réservé/);
    store.updatePublicQuote(admin.id, second, "rejected", 1, "Engin déjà réservé");
    assert.equal(store.publicQuote(admin.id, second)?.status, "rejected");
    const third = store.createPublicQuoteRequest({ ...raw, request_key: randomUUID() });
    store.updatePublicQuote(admin.id, third, "cancelled", 1, "À la demande du contact");
    for (let i = 0; i < 20; i++) store.createPublicQuoteRequest({ ...raw, request_key: randomUUID() });
    assert.equal(store.rentalRequests(admin.id).total, 24);
    assert.equal(store.rentalRequests(admin.id, 1).items.length, 20);
    assert.equal(store.rentalRequests(admin.id, 2).items.length, 4);
  } finally { db.close(); }
});

test("version 2 public requests migrate intact to pending with history", async () => {
  const directory = await mkdtemp(join(tmpdir(), "rentx-quote-migration-"));
  const filename = join(directory, "rentx.db");
  let db = openDatabase(filename);
  try {
    let store = new Store(db);
    const admin = store.createUser("Admin", "migration@example.test", "unused", "admin");
    const equipment = store.published().items[0];
    const id = store.createPublicQuoteRequest({ name: "Ancien contact", email: "old@example.test", equipment_id: equipment.id, start_date: today(), end_date: today(), phone: "+242 060000000", company: "Société historique", location: "Brazzaville", notes: "Demande reçue avant la migration.", request_key: randomUUID() });
    db.exec("DROP TABLE quote_events; DROP INDEX quotes_availability; ALTER TABLE quote_requests DROP COLUMN status; ALTER TABLE quote_requests DROP COLUMN admin_note; ALTER TABLE quote_requests DROP COLUMN version; ALTER TABLE quote_requests DROP COLUMN updated_at;");
    db.pragma("user_version = 2");
    db.close(); db = openDatabase(filename); store = new Store(db);
    assert.equal(store.publicQuote(admin.id, id)?.company, "Société historique");
    assert.equal(store.publicQuote(admin.id, id)?.status, "pending");
    assert.equal(store.publicQuoteEvents(admin.id, id).length, 1);
    assert.equal(db.pragma("integrity_check", { simple: true }), "ok");
    db.close(); db = openDatabase(filename);
    assert.equal(new Store(db).publicQuoteEvents(admin.id, id).length, 1);
  } finally { db.close(); await rm(directory, { recursive: true, force: true }); }
});
