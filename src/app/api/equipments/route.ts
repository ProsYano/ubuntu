import { NextRequest } from "next/server";
import { getPublishedEquipmentPage } from "@/lib/equipment";
export async function GET(request: NextRequest) {
  const offset = Number(request.nextUrl.searchParams.get("offset") ?? 0);
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? 9);
  if (!Number.isInteger(offset) || offset < 0 || offset > 100000 || !Number.isInteger(limit) || limit < 1 || limit > 24) {
    return Response.json({error:"Paramètres invalides."},{status:400});
  }
  try {
    return Response.json(await getPublishedEquipmentPage(offset,limit), {headers:{"Cache-Control":"no-store"}});
  } catch { return Response.json({error:"Catalogue indisponible."},{status:503}); }
}
