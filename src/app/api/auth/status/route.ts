import { getAccess } from "@/lib/auth";
export async function GET() {
  try {
    const access = await getAccess();
    return Response.json({ connected: Boolean(access), editor: access?.isEditor ?? false }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return Response.json({ connected: false, editor: false }, { status: 503, headers: { "Cache-Control": "private, no-store" } }); }
}
