import "server-only";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { store } from "./server";
import type { Role, User } from "./workflow-schema";
import { returnPath } from "./return-path";

export const sessionCookie = "rentx_session";
export function homeFor(user: User) { return user.role === "agent" ? "/gestion/engins" : user.role === "admin" ? "/gestion/commandes" : "/compte"; }
export async function getAccess() {
  const user = store().session((await cookies()).get(sessionCookie)?.value);
  return user ? { user, isEditor: user.role === "agent", isAdmin: user.role === "admin" } : null;
}
export async function requireAccess(roles?: Role[]) {
  const access = await getAccess();
  if (!access) redirect(`/connexion?next=${encodeURIComponent(returnPath((await headers()).get("x-rentx-path")))}`);
  if (roles && !roles.includes(access.user.role)) redirect(homeFor(access.user));
  return access;
}
export async function requireEditor() { return requireAccess(["agent", "admin"]); }
export async function setSession(userId: string, expectedHash: string) {
  const jar = await cookies();
  const previous = jar.get(sessionCookie)?.value;
  if (previous) store().revokeSession(previous);
  const session = store().createSession(userId, expectedHash);
  jar.set(sessionCookie, session.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: new Date(session.expires) });
}
export async function throttlePublic(action: string, email = "") {
  const db = store();
  db.limit(`public:${action}`, action === "register" ? 40 : 300, 15 * 60000);
  if (email) db.limit(`${action}:email:${email}`, 10, 15 * 60000);
  // Only trust this header when a controlled reverse proxy overwrites it.
  if (process.env.RENTX_TRUST_PROXY === "true") {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 80);
    if (ip) db.limit(`${action}:ip:${ip}`, action === "register" ? 5 : 30, 15 * 60000);
  }
}
