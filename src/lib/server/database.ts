import Database from "better-sqlite3";
import { mkdirSync, chmodSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { initialCatalogue } from "../initial-catalogue";

export function dataDirectory() { return resolve(process.env.RENTX_DATA_DIR || "data"); }
export function openDatabase(filename = resolve(dataDirectory(), "rentx.db")) {
  if (process.env.VERCEL) throw new Error("SQLite local exige un serveur avec disque persistant. Configurez un hébergement adapté.");
  if (filename !== ":memory:") mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const db = new Database(filename);
  if (filename !== ":memory:") chmodSync(filename, 0o600);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");
  db.transaction(() => {
    const version = db.pragma("user_version", { simple: true }) as number;
    if (version > 3) throw new Error("Cette base nécessite une version plus récente de l’application.");
      const tableCount = (db.prepare("SELECT count(*) AS count FROM sqlite_master WHERE type = 'table' AND name IN ('users', 'equipment')").get() as { count: number }).count;
      if (version >= 2) return;
      if (version === 1 || (version === 0 && tableCount > 0)) {
      db.exec("CREATE TABLE IF NOT EXISTS quote_requests (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, equipment_id TEXT NOT NULL REFERENCES equipment(id), start_date TEXT NOT NULL, end_date TEXT NOT NULL, phone TEXT NOT NULL, company TEXT NOT NULL, location TEXT NOT NULL, notes TEXT NOT NULL, request_key TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL)");
      db.pragma("user_version = 2");
      return;
    }
    db.exec(`
      CREATE TABLE users (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'client' CHECK(role IN ('client','agent','admin')),
        active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)), created_at TEXT NOT NULL
      );
      CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
      CREATE INDEX sessions_user ON sessions(user_id);
      CREATE TABLE password_resets (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
      CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
      CREATE TABLE equipment (
        id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, category TEXT NOT NULL,
        summary TEXT NOT NULL, description TEXT NOT NULL, specifications TEXT NOT NULL, capacity_summary TEXT NOT NULL,
        daily_rate INTEGER, weekly_rate INTEGER, monthly_rate INTEGER, rental_terms TEXT NOT NULL,
        image_alt TEXT NOT NULL, seo_title TEXT NOT NULL, seo_description TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('draft','published')),
        availability TEXT NOT NULL CHECK(availability IN ('on_request','available','unavailable')),
        image_path TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, deleted_at TEXT,
        created_by TEXT REFERENCES users(id), updated_by TEXT REFERENCES users(id)
      );
      CREATE INDEX equipment_public ON equipment(status, deleted_at, created_at, id);
      CREATE TABLE orders (
        id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), equipment_id TEXT NOT NULL REFERENCES equipment(id),
        equipment_name TEXT NOT NULL, daily_rate INTEGER, start_date TEXT NOT NULL, end_date TEXT NOT NULL CHECK(end_date >= start_date),
        phone TEXT NOT NULL, company TEXT NOT NULL, location TEXT NOT NULL, notes TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('pending','accepted','rejected','completed','cancelled')),
        admin_note TEXT NOT NULL DEFAULT '', version INTEGER NOT NULL DEFAULT 1,
        request_key TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, UNIQUE(user_id,request_key)
      );
      CREATE TABLE quote_requests (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, equipment_id TEXT NOT NULL REFERENCES equipment(id),
        start_date TEXT NOT NULL, end_date TEXT NOT NULL, phone TEXT NOT NULL, company TEXT NOT NULL,
        location TEXT NOT NULL, notes TEXT NOT NULL, request_key TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL
      );
      CREATE INDEX orders_owner ON orders(user_id,created_at);
      CREATE INDEX orders_availability ON orders(equipment_id,status,start_date,end_date);
      CREATE TABLE order_events (id INTEGER PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id), actor_id TEXT NOT NULL REFERENCES users(id), status TEXT NOT NULL, note TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE conversations (
        id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), order_id TEXT UNIQUE REFERENCES orders(id),
        subject TEXT NOT NULL, closed INTEGER NOT NULL DEFAULT 0 CHECK(closed IN (0,1)), version INTEGER NOT NULL DEFAULT 1,
        request_key TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, UNIQUE(user_id,request_key)
      );
      CREATE INDEX conversations_owner ON conversations(user_id,updated_at);
      CREATE TABLE messages (
        id INTEGER PRIMARY KEY, conversation_id TEXT NOT NULL REFERENCES conversations(id), sender_id TEXT NOT NULL REFERENCES users(id),
        sender_role TEXT NOT NULL, body TEXT NOT NULL, request_key TEXT NOT NULL, created_at TEXT NOT NULL, read_at TEXT,
        UNIQUE(sender_id,request_key)
      );
      CREATE INDEX messages_thread ON messages(conversation_id,id);
      CREATE TABLE audit_log (id INTEGER PRIMARY KEY, actor_id TEXT REFERENCES users(id), action TEXT NOT NULL, target_id TEXT NOT NULL, created_at TEXT NOT NULL);
    `);
    const keys = Object.keys(initialCatalogue[0]);
    const insert = db.prepare(`INSERT INTO equipment (${keys.join(",")}) VALUES (${keys.map(k => `@${k}`).join(",")})`);
    for (const item of initialCatalogue) insert.run(item);
    db.pragma("user_version = 2");
  }).immediate();
  db.transaction(() => {
    if ((db.pragma("user_version", { simple: true }) as number) >= 3) return;
    db.exec(`
      ALTER TABLE quote_requests ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected','completed','cancelled'));
      ALTER TABLE quote_requests ADD COLUMN admin_note TEXT NOT NULL DEFAULT '';
      ALTER TABLE quote_requests ADD COLUMN version INTEGER NOT NULL DEFAULT 1;
      ALTER TABLE quote_requests ADD COLUMN updated_at TEXT NOT NULL DEFAULT '';
      UPDATE quote_requests SET updated_at = created_at;
      CREATE INDEX quotes_availability ON quote_requests(equipment_id,status,start_date,end_date);
      CREATE TABLE quote_events (id INTEGER PRIMARY KEY, quote_id TEXT NOT NULL REFERENCES quote_requests(id), actor_id TEXT REFERENCES users(id), status TEXT NOT NULL, note TEXT NOT NULL, created_at TEXT NOT NULL);
      INSERT INTO quote_events(quote_id,status,note,created_at) SELECT id,'pending','Demande de location déposée.',created_at FROM quote_requests;
    `);
    db.pragma("user_version = 3");
  }).immediate();
  return db;
}
