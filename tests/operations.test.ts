import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import { openDatabase } from "../src/lib/server/database";
import { Store } from "../src/lib/server/store";
import { initialCatalogue } from "../src/lib/initial-catalogue";

test("operator backup, recovery and JSON import scripts work on isolated storage", async () => {
  const directory = await mkdtemp(join(tmpdir(), "rentx-operator-test-"));
  const data = join(directory, "data"), backups = join(directory, "backups");
  const env = { ...process.env, RENTX_DATA_DIR: data, NEXT_PUBLIC_SITE_URL: "https://rentx.example.test" };
  const run = (script: string, ...args: string[]) => execFileSync(process.execPath, ["--import", "tsx", `scripts/${script}.ts`, ...args], { env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const db = openDatabase(join(data, "rentx.db")), store = new Store(db);
  try {
    const user = store.createUser("Client test", "recovery@example.test", "old-hash");
    await mkdir(join(data, "uploads")); await writeFile(join(data, "uploads", "example.webp"), "sample-photo");
    run("backup", backups);
    const snapshot = join(backups, (await readdir(backups))[0]);
    assert.equal(await readFile(join(snapshot, "uploads", "example.webp"), "utf8"), "sample-photo");
    const restored = openDatabase(join(snapshot, "rentx.db"));
    try { assert.equal(new Store(restored).user(user.id)?.email, user.email); } finally { restored.close(); }
    const recovery = run("accounts", "reset", user.email).split("\n").find(line => line.startsWith("https://"))!;
    assert.ok(recovery);
    const token = new URL(recovery).searchParams.get("token")!;
    assert.equal(store.consumeReset(token, "replacement-hash"), user.id);
    const file = join(directory, "catalogue.json");
    await writeFile(file, JSON.stringify([{ ...initialCatalogue[0], id: randomUUID(), slug: "import-test" }]));
    run("import-catalogue", file);
    assert.equal(store.publishedBySlug("import-test")?.slug, "import-test");
    assert.throws(() => run("import-catalogue", file));
    assert.equal(store.published().total, 7);
  } finally { db.close(); await rm(directory, { recursive: true, force: true }); }
});
