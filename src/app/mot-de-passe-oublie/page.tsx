import Link from "next/link";
import { AuthForm } from "@/components/admin/AuthForm";
import { buildMetadata } from "@/lib/seo";
import { getSupabaseConfig } from "@/lib/supabase/config";
export const metadata = buildMetadata({ title: "Réinitialiser mon mot de passe", path: "/mot-de-passe-oublie", noIndex: true });
export default function Page() { return <section className="section section-cream"><div className="auth-single"><span className="eyebrow">Retrouver votre accès</span><h1>Mot de passe oublié ?</h1><p>Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.</p><AuthForm mode="reset" configured={Boolean(getSupabaseConfig())}/><Link className="text-link" href="/connexion">← Retour à la connexion</Link></div></section>; }
