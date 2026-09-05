import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/AuthForm";
import { buildMetadata } from "@/lib/seo";
import { getAccess } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { logout } from "./actions";
export const metadata = buildMetadata({ title: "Connexion à l’espace de gestion", path: "/connexion", noIndex: true });
export default async function LoginPage() {
  const access = await getAccess();
  if (access?.isEditor) redirect("/gestion/engins");
  return <section className="auth-section"><div className="wrap auth-layout"><div className="auth-visual"><Image src="/rentx-reference/asset-5812aa885dbd3625.webp" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" priority /><div><span className="eyebrow">Ubuntu Location BTP</span><h2>Votre parc d’engins.<br />Un espace pour le piloter.</h2><p>Publiez vos équipements, actualisez leurs informations et présentez votre savoir-faire.</p></div></div><div className="auth-panel"><span className="eyebrow">Espace professionnel</span><h1>Heureux de vous retrouver.</h1><p>Connectez-vous pour gérer le catalogue Ubuntu Location BTP.</p>{access ? <><p className="form-notice" role="status">Votre compte est connecté, mais ne dispose pas des droits de gestion. Contactez l’administrateur pour obtenir un accès.</p><form action={logout}><button className="button">Se déconnecter</button></form></> : <AuthForm configured={Boolean(getSupabaseConfig())} />}<p className="auth-help">Accès réservé aux membres autorisés de l’équipe.</p><Link className="text-link" href="/">← Retour au site</Link></div></div></section>;
}
