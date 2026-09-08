import { getAccess, homeFor } from "@/lib/auth";
export async function GET() {
  try { const access = await getAccess(); return Response.json({ connected: Boolean(access), editor: access?.isEditor ?? false, href: access ? homeFor(access.user) : "/connexion" }, { headers: { "Cache-Control": "private, no-store" } }); }
  catch { return Response.json({ connected: false, href: "/connexion" }, { status: 503, headers: { "Cache-Control": "private, no-store" } }); }
}
