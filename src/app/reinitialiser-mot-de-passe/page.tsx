import Link from "next/link";
import { AuthForm } from "@/components/admin/AuthForm";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Réinitialiser mon mot de passe", path: "/reinitialiser-mot-de-passe", noIndex: true });
export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <section className="section section-cream"><div className="auth-single"><h1>Choisir un nouveau mot de passe</h1>{token && /^[a-f0-9]{64}$/.test(token) ? <AuthForm mode="recovery" token={token}/> : <><p>Ce lien est invalide.</p><Link href="/mot-de-passe-oublie">Retrouver mon accès</Link></>}</div></section>;
}
