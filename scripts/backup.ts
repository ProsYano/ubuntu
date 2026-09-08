import { mkdir, cp, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { loadEnvConfig } from "@next/env";
import { openDatabase, dataDirectory } from "../src/lib/server/database";
async function main() {
  loadEnvConfig(process.cwd());
  const destination = resolve(process.argv[2] || "backups", new Date().toISOString().replace(/[:.]/g, "-"));
  await mkdir(destination, { recursive: true, mode: 0o700 });
  const db = openDatabase();
  try {
    await db.backup(join(destination, "rentx.db"));
    try { await cp(join(dataDirectory(), "uploads"), join(destination, "uploads"), { recursive: true, errorOnExist: true }); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
    await writeFile(join(destination, "README.txt"), "Sauvegarde SQLite et photos. Restaurer avec l’application arrêtée. Ne jamais servir ce dossier sur le web.\n", { mode: 0o600 });
    console.log(`Sauvegarde créée : ${destination}`);
  } finally { db.close(); }
}
main().catch(error => { console.error(error instanceof Error ? error.message : "Sauvegarde impossible."); process.exitCode = 1; });
