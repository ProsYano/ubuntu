import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-rentx-path", request.nextUrl.pathname + request.nextUrl.search);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
export const config = { matcher: ["/gestion/:path*", "/connexion", "/inscription", "/compte/:path*", "/auth/:path*", "/api/auth/:path*", "/mot-de-passe-oublie", "/reinitialiser-mot-de-passe"] };
