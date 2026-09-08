import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/AuthForm";
import { buildMetadata } from "@/lib/seo";
import { returnPath } from "@/lib/return-path";
import { getAccess, homeFor } from "@/lib/auth";
export const metadata = buildMetadata({ title: "Connexion à votre espace", path: "/connexion", noIndex: true });
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = returnPath((await searchParams).next);
  const access = await getAccess();
  if (access) redirect(access.user.role === "client" ? next : homeFor(access.user));
  return <section className="auth-section"><div className="wrap auth-layout"><div className="auth-visual"><Image src="/rentx-reference/asset-5812aa885dbd3625.webp" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" priority/><div><span className="eyebrow">Ubuntu Location BTP</span><h2>Votre chantier.<br/>Votre espace de suivi.</h2><p>Retrouvez vos demandes de location et échangez avec notre équipe.</p></div></div><div className="auth-panel"><span className="eyebrow">Votre espace</span><h1>Heureux de vous retrouver.</h1><p>Connectez-vous à votre compte client, agent ou administrateur.</p><AuthForm next={next}/><Link className="text-link" href="/">← Retour au site</Link></div></div></section>;
}
