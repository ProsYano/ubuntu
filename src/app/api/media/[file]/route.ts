import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAccess } from "@/lib/auth";
import { dataDirectory } from "@/lib/server/database";
import { store } from "@/lib/server";
export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
  if (!/^[a-f0-9-]{36}\.webp$/.test(file)) return new Response(null, { status: 404, headers });
  const path = `/api/media/${file}`;
  const publicImage = store().db.prepare("SELECT id FROM equipment WHERE image_path = ? AND status = 'published' AND deleted_at IS NULL").get(path);
  if (!publicImage) {
    const access = await getAccess();
    if (!access?.isEditor || !store().db.prepare("SELECT id FROM equipment WHERE image_path = ?").get(path)) return new Response(null, { status: 404, headers });
  }
  try { return new Response(new Uint8Array(await readFile(join(dataDirectory(), "uploads", file))), { headers: { ...headers, "Content-Type": "image/webp" } }); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response(null, { status: 404, headers }); throw error; }
}
