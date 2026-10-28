import type Database from "better-sqlite3";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { equipmentSchema, slugify, type Equipment } from "../equipment-schema";
import { conversationSchema, messageSchema, orderSchema, publicQuoteSchema, roles, transitions, type Conversation, type Message, type Order, type OrderEvent, type OrderStatus, type PublicQuoteRequest, type Role, type User, today } from "../workflow-schema";
import { newToken, tokenHash } from "./passwords";

export class BusinessError extends Error {}
const userColumns = "id,name,email,role,active,created_at";
const now = () => new Date().toISOString();
const pageSize = 20;
const offset = (page: number) => (Math.max(1, Math.min(10000, Math.trunc(page) || 1)) - 1) * pageSize;

/** Server-only data access. Every private operation reloads the actor's current rights. */
export class Store {
  constructor(readonly db: Database.Database) {}
  user(id: string) { return this.db.prepare(`SELECT ${userColumns} FROM users WHERE id = ?`).get(id) as User | undefined; }
  requireUser(id: string, allowed: readonly Role[] = roles) {
    const user = this.user(id);
    if (!user?.active || !allowed.includes(user.role)) throw new BusinessError("Vous n’avez pas accès à cette opération.");
    return user;
  }
  audit(actor: string | null, action: string, target: string) {
    this.db.prepare("INSERT INTO audit_log(actor_id,action,target_id,created_at) VALUES (?,?,?,?)").run(actor, action, target, now());
  }
  createUser(name: string, email: string, hash: string, role: Role = "client") {
    const id = randomUUID();
    try { this.db.prepare("INSERT INTO users(id,name,email,password_hash,role,created_at) VALUES (?,?,?,?,?,?)").run(id, name, email, hash, role, now()); }
    catch (error) { if ((error as { code?: string }).code === "SQLITE_CONSTRAINT_UNIQUE") throw new BusinessError("Impossible de créer ce compte. Essayez de vous connecter ou contactez l’administration."); throw error; }
    return this.user(id)!;
  }
  credentials(email: string) {
    return this.db.prepare("SELECT id,password_hash,active FROM users WHERE email = ? COLLATE NOCASE").get(email) as { id: string; password_hash: string; active: number } | undefined;
  }
  limit(key: string, maximum: number, windowMs: number) {
    const timestamp = Date.now();
    const hashed = tokenHash(key);
    const count = this.db.transaction(() => {
      this.db.prepare("DELETE FROM rate_limits WHERE expires_at <= ?").run(timestamp);
      this.db.prepare("INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count = count + 1").run(hashed, timestamp + windowMs);
      return (this.db.prepare("SELECT count FROM rate_limits WHERE key = ?").get(hashed) as { count: number }).count;
    }).immediate();
    if (count > maximum) throw new BusinessError("Trop de tentatives. Veuillez patienter avant de réessayer.");
  }
  createSession(id: string, expectedHash?: string) {
    return this.db.transaction(() => {
      this.requireUser(id);
      if (expectedHash && !this.db.prepare("SELECT id FROM users WHERE id = ? AND password_hash = ?").get(id, expectedHash)) throw new BusinessError("Votre mot de passe a changé. Reconnectez-vous.");
      const token = newToken();
      const expires = Date.now() + 7 * 86400000;
      this.db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
      this.db.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)").run(tokenHash(token), id, expires);
      return { token, expires };
    }).immediate();
  }
  session(token?: string) {
    if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
    const row = this.db.prepare("SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?").get(tokenHash(token), Date.now()) as { user_id: string } | undefined;
    const user = row ? this.user(row.user_id) : null;
    return user?.active ? user : null;
  }
  revokeSession(token: string) { this.db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token)); }
  replacePassword(id: string, hash: string, expectedHash: string) {
    this.db.transaction(() => {
      this.requireUser(id);
      const updated = this.db.prepare("UPDATE users SET password_hash = ? WHERE id = ? AND password_hash = ?").run(hash, id, expectedHash);
      if (!updated.changes) throw new BusinessError("Votre compte a changé. Reconnectez-vous.");
      this.db.prepare("DELETE FROM sessions WHERE user_id = ?").run(id);
      this.db.prepare("DELETE FROM password_resets WHERE user_id = ?").run(id);
      this.audit(id, "password.changed", id);
    }).immediate();
  }
  issueReset(id: string) {
    this.requireUser(id);
    const token = newToken();
    this.db.transaction(() => {
      this.db.prepare("DELETE FROM password_resets WHERE user_id = ? OR expires_at <= ?").run(id, Date.now());
      this.db.prepare("INSERT INTO password_resets VALUES (?,?,?)").run(tokenHash(token), id, Date.now() + 30 * 60000);
      this.audit(null, "password.recovery-issued", id);
    }).immediate();
    return token;
  }
  consumeReset(token: string, hash: string) {
    return this.db.transaction(() => {
      const row = this.db.prepare("SELECT user_id FROM password_resets WHERE token_hash = ? AND expires_at > ?").get(tokenHash(token), Date.now()) as { user_id: string } | undefined;
      if (!row) throw new BusinessError("Ce lien est invalide ou a expiré.");
      this.requireUser(row.user_id);
      this.db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, row.user_id);
      this.db.prepare("DELETE FROM password_resets WHERE user_id = ?").run(row.user_id);
      this.db.prepare("DELETE FROM sessions WHERE user_id = ?").run(row.user_id);
      this.audit(row.user_id, "password.recovered", row.user_id);
      return row.user_id;
    }).immediate();
  }
  users(actor: string, page = 1, query = "") {
    this.requireUser(actor, ["admin"]);
    const term = `%${query.slice(0, 120)}%`;
    const where = "WHERE name LIKE ? OR email LIKE ?";
    return { items: this.db.prepare(`SELECT ${userColumns} FROM users ${where} ORDER BY created_at DESC,id LIMIT ? OFFSET ?`).all(term, term, pageSize, offset(page)) as User[], total: (this.db.prepare(`SELECT count(*) AS n FROM users ${where}`).get(term, term) as { n: number }).n };
  }
  updateUser(actor: string, id: string, role: Role, active: boolean) {
    this.db.transaction(() => {
      this.requireUser(actor, ["admin"]);
      if (actor === id) throw new BusinessError("Vous ne pouvez pas modifier vos propres droits.");
      const target = this.user(id);
      if (!target) throw new BusinessError("Compte introuvable.");
      // Admin creation/removal is an explicit server-operator task, never a form field.
      if (target.role === "admin" || role === "admin") throw new BusinessError("Les comptes administrateurs sont gérés sur le serveur.");
      z.enum(roles).parse(role);
      this.db.prepare("UPDATE users SET role = ?,active = ? WHERE id = ?").run(role, active ? 1 : 0, id);
      this.db.prepare("DELETE FROM sessions WHERE user_id = ?").run(id);
      this.audit(actor, `user.${role}.${active ? "enabled" : "disabled"}`, id);
    }).immediate();
  }
  published(offsetValue = 0, limit = 24) {
    const where = "WHERE status = 'published' AND deleted_at IS NULL";
    return { items: this.db.prepare(`SELECT * FROM equipment ${where} ORDER BY created_at,id LIMIT ? OFFSET ?`).all(Math.max(1, Math.min(500, Math.trunc(limit))), Math.max(0, Math.trunc(offsetValue))) as Equipment[], total: (this.db.prepare(`SELECT count(*) AS n FROM equipment ${where}`).get() as { n: number }).n };
  }
  publishedBySlug(slug: string) { return this.db.prepare("SELECT * FROM equipment WHERE slug = ? AND status = 'published' AND deleted_at IS NULL").get(slug) as Equipment | undefined; }
  equipment(actor: string, id: string) { this.requireUser(actor, ["agent", "admin"]); return this.db.prepare("SELECT * FROM equipment WHERE id = ? AND deleted_at IS NULL").get(id) as Equipment | undefined; }
  catalogue(actor: string, view: string, page = 1) {
    this.requireUser(actor, ["agent", "admin"]);
    const where = view === "trash" ? "WHERE deleted_at IS NOT NULL" : `WHERE deleted_at IS NULL${view === "draft" || view === "published" ? " AND status = ?" : ""}`;
    const args = view === "draft" || view === "published" ? [view] : [];
    return { items: this.db.prepare(`SELECT * FROM equipment ${where} ORDER BY updated_at DESC,id LIMIT 24 OFFSET ?`).all(...args, (page - 1) * 24) as Equipment[], total: (this.db.prepare(`SELECT count(*) AS n FROM equipment ${where}`).get(...args) as { n: number }).n };
  }
  saveEquipment(actor: string, raw: unknown, id: string | null, version: string, image: string | null) {
    this.requireUser(actor, ["agent", "admin"]);
    const input = equipmentSchema.parse(raw);
    if (image && !/^\/api\/media\/[a-f0-9-]{36}\.webp$/.test(image) && !/^\/rentx-reference\/asset-[a-f0-9]+\.png$/.test(image)) throw new BusinessError("Image invalide.");
    return this.db.transaction(() => {
      this.requireUser(actor, ["agent", "admin"]);
      const existing = id ? this.equipment(actor, id) : null;
      if (id && (!existing || existing.updated_at !== version)) throw new BusinessError("Cette fiche a changé. Rechargez la page avant de réessayer.");
      const timestamp = new Date(Math.max(Date.now(), existing ? Date.parse(existing.updated_at) + 1 : 0)).toISOString();
      const record = { ...input, id: id ?? randomUUID(), slug: existing?.slug ?? `${slugify(input.name)}-${randomUUID().slice(0, 8)}`, image_path: image, updated_at: timestamp, updated_by: actor };
      if (existing) {
        const keys = [...Object.keys(input), "image_path", "updated_at", "updated_by"];
        this.db.prepare(`UPDATE equipment SET ${keys.map(key => `${key} = @${key}`).join(",")} WHERE id = @id`).run(record);
      } else {
        const added = { ...record, created_at: timestamp, created_by: actor };
        const keys = Object.keys(added);
        this.db.prepare(`INSERT INTO equipment (${keys.join(",")}) VALUES (${keys.map(key => `@${key}`).join(",")})`).run(added);
      }
      this.audit(actor, existing ? "equipment.updated" : "equipment.created", record.id);
      return record.slug;
    }).immediate();
  }
  trashEquipment(actor: string, id: string, version: string, restore = false) {
    return this.db.transaction(() => {
      this.requireUser(actor, ["agent", "admin"]);
      const item = this.db.prepare("SELECT * FROM equipment WHERE id = ?").get(id) as Equipment | undefined;
      if (!item || item.updated_at !== version || Boolean(item.deleted_at) !== restore) throw new BusinessError("Cette fiche a changé. Rechargez la page.");
      const timestamp = new Date(Math.max(Date.now(), Date.parse(item.updated_at) + 1)).toISOString();
      this.db.prepare("UPDATE equipment SET deleted_at = ?,status = ?,updated_at = ?,updated_by = ? WHERE id = ?").run(restore ? null : timestamp, restore ? "draft" : item.status, timestamp, actor, id);
      this.audit(actor, restore ? "equipment.restored" : "equipment.trashed", id);
      return item.slug;
    }).immediate();
  }
  publicQuoteRequests(actor: string, page = 1) {
    this.requireUser(actor, ["admin"]);
    return { items: this.db.prepare("SELECT q.*,e.name AS equipment_name FROM quote_requests q JOIN equipment e ON e.id = q.equipment_id ORDER BY q.created_at DESC,q.id LIMIT ? OFFSET ?").all(pageSize, offset(page)) as PublicQuoteRequest[], total: (this.db.prepare("SELECT count(*) AS n FROM quote_requests").get() as { n: number }).n };
  }
  rentalRequests(actor: string, page = 1, status = "") {
    this.requireUser(actor, ["admin"]);
    const source = `SELECT o.id,o.equipment_name,o.start_date,o.end_date,o.location,o.company,o.status,o.created_at,u.name AS client_name,u.email AS client_email,'account' AS source FROM orders o JOIN users u ON u.id=o.user_id
      UNION ALL SELECT q.id,e.name,q.start_date,q.end_date,q.location,q.company,q.status,q.created_at,q.name,q.email,'public' FROM quote_requests q JOIN equipment e ON e.id=q.equipment_id`;
    const where = status ? "WHERE status = ?" : "";
    const args = status ? [status] : [];
    return {
      items: this.db.prepare(`SELECT * FROM (${source}) ${where} ORDER BY created_at DESC,id LIMIT ? OFFSET ?`).all(...args, pageSize, offset(page)) as (Pick<Order, "id" | "equipment_name" | "start_date" | "end_date" | "location" | "company" | "status" | "created_at" | "client_name" | "client_email"> & { source: "account" | "public" })[],
      total: (this.db.prepare(`SELECT count(*) AS n FROM (${source}) ${where}`).get(...args) as { n: number }).n,
    };
  }
  publicQuote(actor: string, id: string) {
    this.requireUser(actor, ["admin"]);
    return this.db.prepare("SELECT q.*,e.name AS equipment_name FROM quote_requests q JOIN equipment e ON e.id=q.equipment_id WHERE q.id=?").get(id) as PublicQuoteRequest | undefined;
  }
  publicQuoteEvents(actor: string, id: string) {
    this.requireUser(actor, ["admin"]);
    return this.db.prepare("SELECT e.*,coalesce(u.name,'Visiteur') AS actor_name FROM quote_events e LEFT JOIN users u ON u.id=e.actor_id WHERE quote_id=? ORDER BY e.id").all(id) as OrderEvent[];
  }
  updatePublicQuote(actor: string, id: string, status: OrderStatus, version: number, note: string) {
    if (note.length > 2000) throw new BusinessError("Le commentaire est trop long.");
    return this.db.transaction(() => {
      this.requireUser(actor, ["admin"]);
      const quote = this.publicQuote(actor, id);
      if (!quote || quote.version !== version) throw new BusinessError("Cette demande a changé. Rechargez la page.");
      if (!transitions[quote.status].includes(status)) throw new BusinessError("Ce changement de statut n’est pas autorisé.");
      if ((status === "rejected" || status === "cancelled") && !note.trim()) throw new BusinessError("Précisez le motif du refus ou de l’annulation.");
      if (status === "accepted") {
        if (quote.end_date < today()) throw new BusinessError("Cette période de location est déjà passée.");
        const item = this.db.prepare("SELECT * FROM equipment WHERE id=?").get(quote.equipment_id) as Equipment;
        if (item.deleted_at || item.status !== "published" || item.availability === "unavailable") throw new BusinessError("Cet engin n’est plus disponible.");
        if (this.db.prepare("SELECT id FROM orders WHERE equipment_id=? AND status='accepted' AND start_date<=? AND end_date>=? UNION ALL SELECT id FROM quote_requests WHERE equipment_id=? AND status='accepted' AND start_date<=? AND end_date>=? AND id!=?").get(quote.equipment_id,quote.end_date,quote.start_date,quote.equipment_id,quote.end_date,quote.start_date,id)) throw new BusinessError("Cet engin est déjà réservé sur cette période.");
      }
      const timestamp = now();
      this.db.prepare("UPDATE quote_requests SET status=?,admin_note=?,version=version+1,updated_at=? WHERE id=?").run(status,note.trim(),timestamp,id);
      this.db.prepare("INSERT INTO quote_events(quote_id,actor_id,status,note,created_at) VALUES (?,?,?,?,?)").run(id,actor,status,note.trim(),timestamp);
      this.audit(actor, `quote.${status}`, id);
    }).immediate();
  }
  createPublicQuoteRequest(raw: unknown, audio?: { bytes: Buffer; type: string }) {
    const input = publicQuoteSchema.parse(raw);
    return this.db.transaction(() => {
      const duplicate = this.db.prepare("SELECT id FROM quote_requests WHERE request_key = ?").get(input.request_key) as { id: string } | undefined;
      if (duplicate) return duplicate.id;
      const item = this.db.prepare("SELECT id FROM equipment WHERE id = ? AND status = 'published' AND deleted_at IS NULL AND availability != 'unavailable'").get(input.equipment_id);
      if (!item) throw new BusinessError("Cet engin n’est plus disponible pour une demande.");
      const id = randomUUID(), timestamp = now();
      this.db.prepare("INSERT INTO quote_requests(id,name,email,equipment_id,start_date,end_date,phone,company,location,notes,request_key,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)").run(id, input.name, input.email, input.equipment_id, input.start_date, input.end_date, input.phone, input.company, input.location, input.notes, input.request_key, timestamp);
      this.db.prepare("UPDATE quote_requests SET updated_at=? WHERE id=?").run(timestamp,id);
      if (audio) this.db.prepare("INSERT INTO quote_audio(quote_id,mime_type,data) VALUES (?,?,?)").run(id, audio.type, audio.bytes);
      this.db.prepare("INSERT INTO quote_events(quote_id,status,note,created_at) VALUES (?,'pending','Demande de location déposée.',?)").run(id,timestamp);
      return id;
    }).immediate();
  }
  createOrder(actor: string, raw: unknown) {
    this.requireUser(actor, ["client"]);
    const input = orderSchema.parse(raw);
    return this.db.transaction(() => {
      this.requireUser(actor, ["client"]);
      const duplicate = this.db.prepare("SELECT id FROM orders WHERE user_id = ? AND request_key = ?").get(actor, input.request_key) as { id: string } | undefined;
      if (duplicate) return duplicate.id;
      const item = this.db.prepare("SELECT * FROM equipment WHERE id = ? AND status = 'published' AND deleted_at IS NULL").get(input.equipment_id) as Equipment | undefined;
      if (!item || item.availability === "unavailable") throw new BusinessError("Cet engin n’est plus disponible pour une demande.");
      const id = randomUUID(), timestamp = now();
      this.db.prepare("INSERT INTO orders(id,user_id,equipment_id,equipment_name,daily_rate,start_date,end_date,phone,company,location,notes,status,request_key,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,'pending',?,?,?)")
        .run(id, actor, item.id, item.name, item.daily_rate, input.start_date, input.end_date, input.phone, input.company, input.location, input.notes, input.request_key, timestamp, timestamp);
      this.db.prepare("INSERT INTO order_events(order_id,actor_id,status,note,created_at) VALUES (?,?,'pending','Demande de location déposée.',?)").run(id, actor, timestamp);
      this.db.prepare("INSERT INTO conversations(id,user_id,order_id,subject,request_key,created_at,updated_at) VALUES (?,?,?,?,?,?,?)").run(randomUUID(), actor, id, `Location · ${item.name}`, randomUUID(), timestamp, timestamp);
      this.audit(actor, "order.created", id);
      return id;
    }).immediate();
  }
  orders(actor: string, page = 1, status = "") {
    const user = this.requireUser(actor, ["client", "admin"]);
    const clauses = user.role === "admin" ? ["1=1"] : ["o.user_id = ?"];
    const args: string[] = user.role === "admin" ? [] : [actor];
    if (Object.hasOwn(transitions, status)) { clauses.push("o.status = ?"); args.push(status); }
    const where = clauses.join(" AND ");
    return { items: this.db.prepare(`SELECT o.*,u.name AS client_name,u.email AS client_email FROM orders o JOIN users u ON u.id = o.user_id WHERE ${where} ORDER BY o.created_at DESC,o.id LIMIT ? OFFSET ?`).all(...args, pageSize, offset(page)) as Order[], total: (this.db.prepare(`SELECT count(*) AS n FROM orders o WHERE ${where}`).get(...args) as { n: number }).n };
  }
  order(actor: string, id: string) {
    const user = this.requireUser(actor, ["client", "admin"]);
    return this.db.prepare("SELECT o.*,u.name AS client_name,u.email AS client_email FROM orders o JOIN users u ON u.id = o.user_id WHERE o.id = ? AND (? = 'admin' OR o.user_id = ?)").get(id, user.role, actor) as Order | undefined;
  }
  orderEvents(actor: string, id: string) {
    if (!this.order(actor, id)) throw new BusinessError("Commande introuvable.");
    return this.db.prepare("SELECT e.*,u.name AS actor_name FROM order_events e JOIN users u ON u.id = e.actor_id WHERE order_id = ? ORDER BY e.id").all(id) as OrderEvent[];
  }
  updateOrder(actor: string, id: string, status: OrderStatus, version: number, note: string) {
    const user = this.requireUser(actor, ["client", "admin"]);
    if (note.length > 2000) throw new BusinessError("Le commentaire est trop long.");
    return this.db.transaction(() => {
      const order = this.order(actor, id);
      if (!order || order.version !== version) throw new BusinessError("Cette commande a changé. Rechargez la page.");
      if (!transitions[order.status].includes(status) || (user.role === "client" && (order.status !== "pending" || status !== "cancelled"))) throw new BusinessError("Ce changement de statut n’est pas autorisé.");
      if (user.role === "admin" && (status === "rejected" || status === "cancelled") && note.trim().length < 3) throw new BusinessError("Précisez la raison du refus ou de l’annulation.");
      if (status === "accepted") {
        if (this.db.prepare("SELECT id FROM quote_requests WHERE equipment_id=? AND status='accepted' AND start_date<=? AND end_date>=?").get(order.equipment_id,order.end_date,order.start_date)) throw new BusinessError("Cet engin est déjà réservé sur cette période.");
        if (order.end_date < today()) throw new BusinessError("Cette période de location est déjà passée.");
        const item = this.db.prepare("SELECT * FROM equipment WHERE id = ?").get(order.equipment_id) as Equipment;
        if (item.deleted_at || item.status !== "published" || item.availability === "unavailable") throw new BusinessError("L’engin n’est plus disponible.");
        if (this.db.prepare("SELECT id FROM orders WHERE equipment_id = ? AND status = 'accepted' AND start_date <= ? AND end_date >= ? AND id != ?").get(order.equipment_id, order.end_date, order.start_date, id)) throw new BusinessError("Cet engin est déjà réservé sur cette période.");
      }
      this.db.prepare("UPDATE orders SET status = ?,admin_note = ?,version = version + 1,updated_at = ? WHERE id = ?").run(status, user.role === "admin" ? note.trim() : order.admin_note, now(), id);
      this.db.prepare("INSERT INTO order_events(order_id,actor_id,status,note,created_at) VALUES (?,?,?,?,?)").run(id, actor, status, note.trim(), now());
      this.audit(actor, `order.${status}`, id);
    }).immediate();
  }
  conversations(actor: string, page = 1) {
    const user = this.requireUser(actor, ["client", "admin"]);
    const where = user.role === "admin" ? "1=1" : "c.user_id = @actor";
    const bindings = { actor, role: user.role, limit: pageSize, offset: offset(page) };
    const items = this.db.prepare(`SELECT c.*,u.name AS client_name,(SELECT count(*) FROM messages m WHERE m.conversation_id = c.id AND m.read_at IS NULL AND ((@role = 'admin' AND m.sender_id = c.user_id) OR (@role = 'client' AND m.sender_role = 'admin'))) AS unread FROM conversations c JOIN users u ON u.id = c.user_id WHERE ${where} ORDER BY c.updated_at DESC,c.id LIMIT @limit OFFSET @offset`).all(bindings) as Conversation[];
    const total = (this.db.prepare(`SELECT count(*) AS n FROM conversations c WHERE ${where}`).get(bindings) as { n: number }).n;
    return { items, total };
  }
  conversation(actor: string, id: string) {
    const user = this.requireUser(actor, ["client", "admin"]);
    return this.db.prepare("SELECT c.*,u.name AS client_name FROM conversations c JOIN users u ON u.id = c.user_id WHERE c.id = ? AND (? = 'admin' OR c.user_id = ?)").get(id, user.role, actor) as Conversation | undefined;
  }
  orderConversation(actor: string, orderId: string) {
    if (!this.order(actor, orderId)) throw new BusinessError("Commande introuvable.");
    return (this.db.prepare("SELECT id FROM conversations WHERE order_id = ?").get(orderId) as { id: string }).id;
  }
  createConversation(actor: string, raw: unknown) {
    this.requireUser(actor, ["client"]);
    const input = conversationSchema.parse(raw);
    return this.db.transaction(() => {
      this.requireUser(actor, ["client"]);
      const duplicate = this.db.prepare("SELECT id FROM conversations WHERE user_id = ? AND request_key = ?").get(actor, input.request_key) as { id: string } | undefined;
      if (duplicate) return duplicate.id;
      const id = randomUUID(), timestamp = now();
      this.db.prepare("INSERT INTO conversations(id,user_id,subject,request_key,created_at,updated_at) VALUES (?,?,?,?,?,?)").run(id, actor, input.subject, input.request_key, timestamp, timestamp);
      this.db.prepare("INSERT INTO messages(conversation_id,sender_id,sender_role,body,request_key,created_at) VALUES (?,?,'client',?,?,?)").run(id, actor, input.body, randomUUID(), timestamp);
      return id;
    }).immediate();
  }
  messages(actor: string, id: string, page = 1) {
    if (!this.conversation(actor, id)) throw new BusinessError("Conversation introuvable.");
    return { items: this.db.prepare("SELECT m.*,u.name AS sender_name FROM messages m JOIN users u ON u.id = m.sender_id WHERE conversation_id = ? ORDER BY m.id DESC LIMIT ? OFFSET ?").all(id, pageSize, offset(page)) as Message[], total: (this.db.prepare("SELECT count(*) AS n FROM messages WHERE conversation_id = ?").get(id) as { n: number }).n };
  }
  sendMessage(actor: string, id: string, raw: unknown) {
    const user = this.requireUser(actor, ["client", "admin"]);
    const input = messageSchema.parse(raw);
    this.db.transaction(() => {
      const thread = this.conversation(actor, id);
      if (!thread || thread.closed) throw new BusinessError("Cette conversation est fermée ou inaccessible.");
      const result = this.db.prepare("INSERT INTO messages(conversation_id,sender_id,sender_role,body,request_key,created_at) VALUES (?,?,?,?,?,?) ON CONFLICT(sender_id,request_key) DO NOTHING").run(id, actor, user.role, input.body, input.request_key, now());
      if (result.changes) this.db.prepare("UPDATE conversations SET updated_at = ? WHERE id = ?").run(now(), id);
    }).immediate();
  }
  markRead(actor: string, id: string, throughId: number, fromId = 0) {
    const user = this.requireUser(actor, ["client", "admin"]);
    const thread = this.conversation(actor, id);
    if (!thread) throw new BusinessError("Conversation introuvable.");
    this.db.prepare("UPDATE messages SET read_at = ? WHERE conversation_id = ? AND id <= ? AND id >= ? AND read_at IS NULL AND ((? = 'admin' AND sender_id = ?) OR (? = 'client' AND sender_role = 'admin'))").run(now(), id, throughId, fromId, user.role, thread.user_id, user.role);
  }
  closeConversation(actor: string, id: string, closed: boolean, version: number) {
    this.requireUser(actor, ["admin"]);
    const result = this.db.prepare("UPDATE conversations SET closed = ?,version = version + 1,updated_at = ? WHERE id = ? AND version = ?").run(closed ? 1 : 0, now(), id, version);
    if (!result.changes) throw new BusinessError("Cette conversation a changé. Rechargez la page.");
    this.audit(actor, closed ? "conversation.closed" : "conversation.reopened", id);
  }
}
