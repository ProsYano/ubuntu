import { readFile } from "node:fs/promises";
import { loadEnvConfig } from "@next/env";
import { z } from "zod";
import { openDatabase } from "../src/lib/server/database";
import { equipmentSchema, imageUrl } from "../src/lib/equipment-schema";
async function main() {
  loadEnvConfig(process.cwd());
  const file = process.argv[2];
  if (!file) throw new Error("Usage : npm run db:import -- /chemin/catalogue.json");
  const schema = equipmentSchema.extend({ id: z.uuid(), slug: z.string().regex(/^[a-z0-9-]{1,110}$/), image_path: z.string().nullable(), created_at: z.iso.datetime(), updated_at: z.iso.datetime(), deleted_at: z.iso.datetime().nullable() });
  const rows = z.array(schema).max(10000).parse(JSON.parse(await readFile(file, "utf8")));
  for (const row of rows) if (row.image_path && !imageUrl(row.image_path)) throw new Error(`Image incompatible pour ${row.slug}. Copiez la photo dans data/uploads sous un nom UUID.webp et utilisez /api/media/UUID.webp, ou renseignez null.`);
  const db = openDatabase();
  try {
    db.transaction(() => {
      for (const row of rows) {
        const existing = db.prepare("SELECT id FROM equipment WHERE id = ? OR slug = ?").get(row.id, row.slug);
        if (existing) throw new Error(`La fiche ${row.slug} existe déjà. Import annulé : aucune fiche n’a été écrasée.`);
        const keys = Object.keys(row);
        db.prepare(`INSERT INTO equipment (${keys.join(",")}) VALUES (${keys.map(key => `@${key}`).join(",")})`).run(row);
      }
    }).immediate();
    console.log(`${rows.length} fiches importées. Reconstruisez le site avant de redémarrer le serveur pour renouveler le cache public.`);
  } finally { db.close(); }
}
main().catch(error => { console.error(error instanceof Error ? error.message : "Import impossible."); process.exitCode = 1; });
