"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { homeFor, requireAccess, sessionCookie, setSession, throttlePublic } from "@/lib/auth";
import { store } from "@/lib/server";
import { actionError } from "@/lib/server/action-error";
import { dummyHash, hashPassword, verifyPassword } from "@/lib/server/passwords";
import { emailSchema, passwordSchema, registrationSchema } from "@/lib/workflow-schema";
import type { ActionState } from "@/lib/equipment-schema";
import { returnPath } from "@/lib/return-path";

export async function login(_state: ActionState, form: FormData): Promise<ActionState> {
  let destination: string;
  try {
    const input = z.object({ email: emailSchema, password: z.string().min(1).max(128) }).parse(Object.fromEntries(form));
    await throttlePublic("login", input.email);
    const record = store().credentials(input.email);
    const valid = await verifyPassword(input.password, record?.password_hash ?? dummyHash);
    if (!record?.active || !valid) return { error: "Adresse e-mail ou mot de passe incorrect." };
    // Reject a password reset or suspension that happened during password verification.
    const current = store().credentials(input.email);
    if (!current?.active || current.password_hash !== record.password_hash) return { error: "Votre compte a changé. Réessayez." };
    await setSession(record.id, record.password_hash);
    const user = store().user(record.id)!;
    destination = user.role === "client" ? returnPath(form.get("next")) : homeFor(user);
  } catch (error) { return actionError(error); }
  revalidatePath("/", "layout");
  redirect(destination);
}
export async function register(_state: ActionState, form: FormData): Promise<ActionState> {
  try {
    const input = registrationSchema.parse(Object.fromEntries(form));
    if (input.password !== form.get("confirmation")) return { error: "Les mots de passe ne correspondent pas." };
    await throttlePublic("register", input.email);
    const hash = await hashPassword(input.password);
    const user = store().createUser(input.name, input.email, hash);
    await setSession(user.id, hash);
  } catch (error) { return actionError(error); }
  revalidatePath("/", "layout");
  redirect(returnPath(form.get("next")));
}
export async function logout() {
  const jar = await cookies();
  const token = jar.get(sessionCookie)?.value;
  if (token) store().revokeSession(token);
  jar.delete(sessionCookie);
  revalidatePath("/", "layout");
  redirect("/connexion");
}
export async function changePassword(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess();
  try {
    const password = passwordSchema.parse(form.get("password"));
    const current = z.string().min(1).max(128).parse(form.get("current_password"));
    if (password !== form.get("confirmation")) return { error: "Les mots de passe ne correspondent pas." };
    store().limit(`password:${user.id}`, 10, 15 * 60000);
    const record = store().credentials(user.email)!;
    if (!await verifyPassword(current, record.password_hash)) return { error: "Le mot de passe actuel est incorrect." };
    const hash = await hashPassword(password);
    store().replacePassword(user.id, hash, record.password_hash);
    await setSession(user.id, hash);
  } catch (error) { return actionError(error); }
  return { success: "Mot de passe modifié. Les autres sessions ont été déconnectées." };
}
export async function recoverPassword(_state: ActionState, form: FormData): Promise<ActionState> {
  try {
    const token = z.string().regex(/^[a-f0-9]{64}$/).parse(form.get("token"));
    const password = passwordSchema.parse(form.get("password"));
    if (password !== form.get("confirmation")) return { error: "Les mots de passe ne correspondent pas." };
    await throttlePublic("recovery");
    store().consumeReset(token, await hashPassword(password));
  } catch (error) { return actionError(error); }
  return { success: "Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter." };
}
