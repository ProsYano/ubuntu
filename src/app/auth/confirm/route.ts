import { NextRequest, NextResponse } from "next/server";
import { createAuthClient } from "@/lib/supabase/server";
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  if (token && (type === "recovery" || type === "invite")) {
    const supabase = await createAuthClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: token, type });
    if (!error) return NextResponse.redirect(new URL("/compte/mot-de-passe", request.url));
  }
  return NextResponse.redirect(new URL("/compte/mot-de-passe?erreur=lien", request.url));
}
