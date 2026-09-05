"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createAuthClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { SITE } from "@/lib/constants";
import type { ActionState } from "@/lib/equipment-schema";

export async function login(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!getSupabaseConfig()) return { error: "La connexion est en cours de configuration. Veuillez contacter l’administrateur." };
  const input = z.object({ email: z.email().max(254), password: z.string().min(1).max(128) }).safeParse(Object.fromEntries(form));
  if (!input.success) return { error: "Renseignez une adresse e-mail valide et votre mot de passe." };
  try {
    const supabase = await createAuthClient();
    const { error } = await supabase.auth.signInWithPassword(input.data);
    if (error) return { error: "Connexion impossible. Vérifiez vos identifiants ou réessayez dans quelques instants." };
  } catch { return { error: "Le service de connexion est momentanément indisponible." }; }
  revalidatePath("/", "layout");
  redirect("/gestion/engins");
}
export async function logout() {
  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw new Error("La déconnexion a échoué. Veuillez réessayer.");
  revalidatePath("/", "layout");
  redirect("/connexion");
}
export async function resetPassword(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!getSupabaseConfig()) return { error: "La connexion est en cours de configuration." };
  const email = z.email().max(254).safeParse(form.get("email"));
  if (!email.success) return { error: "Saisissez une adresse e-mail valide." };
  try {
    const supabase = await createAuthClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.data, { redirectTo: `${SITE.url}/auth/callback` });
    if (error) return { error: "Impossible de traiter la demande pour le moment. Réessayez plus tard." };
  } catch { return { error: "Le service est momentanément indisponible." }; }
  return { success: "Si un compte correspond à cette adresse, un lien de réinitialisation vous sera envoyé." };
}
export async function changePassword(_state: ActionState, form: FormData): Promise<ActionState> {
  const password = z.string().min(12).max(128).safeParse(form.get("password"));
  if (!password.success) return { error: "Choisissez un mot de passe de 12 à 128 caractères." };
  if (password.data !== form.get("confirmation")) return { error: "Les mots de passe ne correspondent pas." };
  try {
    const supabase = await createAuthClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return { error: "Votre lien a expiré. Demandez un nouveau lien de réinitialisation." };
    const { error } = await supabase.auth.updateUser({ password: password.data });
    if (error) return { error: "Le mot de passe n’a pas pu être modifié. Utilisez un autre mot de passe ou demandez un nouveau lien." };
  } catch { return { error: "Le service est momentanément indisponible." }; }
  return { success: "Votre mot de passe a été enregistré. Vous pouvez accéder à votre espace de gestion." };
}
