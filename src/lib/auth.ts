import "server-only";
import { redirect } from "next/navigation";
import { createAuthClient } from "./supabase/server";
import { getSupabaseConfig } from "./supabase/config";

export async function getAccess() {
  if (!getSupabaseConfig()) return null;
  const supabase = await createAuthClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data, error: roleError } = await supabase.from("ubuntu_editors").select("user_id").eq("user_id", user.id).maybeSingle();
  if (roleError) throw new Error("Impossible de vérifier les droits d’accès. Réessayez dans quelques instants.");
  return { supabase, user, isEditor: Boolean(data) };
}

export async function requireEditor() {
  const access = await getAccess();
  if (!access) redirect("/connexion");
  if (!access.isEditor) redirect("/connexion?erreur=acces");
  return access;
}
