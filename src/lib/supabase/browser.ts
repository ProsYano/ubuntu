import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";
export function createBrowserAuthClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Le service de connexion n’est pas configuré.");
  return createBrowserClient(config.url,config.key,{auth:{detectSessionInUrl:false}});
}
