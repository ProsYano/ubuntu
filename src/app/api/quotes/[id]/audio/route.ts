import { getAccess } from "@/lib/auth";
import { store } from "@/lib/server";
export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
  const access = await getAccess();
  if (!access?.isAdmin) return new Response(null, { status: 404, headers });
  const { id } = await params;
  const audio = store().db.prepare("SELECT mime_type,data FROM quote_audio WHERE quote_id=?").get(id) as { mime_type: string; data: Buffer } | undefined;
  if (!audio) return new Response(null, { status: 404, headers });
  return new Response(new Uint8Array(audio.data), { headers: { ...headers, "Content-Type": audio.mime_type, "Content-Length": String(audio.data.length) } });
}
