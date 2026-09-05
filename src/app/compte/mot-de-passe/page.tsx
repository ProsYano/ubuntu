import Link from "next/link";
import { AuthForm } from "@/components/admin/AuthForm";
import { buildMetadata } from "@/lib/seo";
import { getAccess } from "@/lib/auth";
export const metadata = buildMetadata({ title: "Définir mon mot de passe", path: "/compte/mot-de-passe", noIndex: true });
export default async function Page({searchParams}: {searchParams: Promise<{erreur?: string}>}) {
  const params = await searchParams;
  const access = await getAccess();
  return <section className="section section-cream"><div className="auth-single"><span className="eyebrow">Votre compte</span><h1>Définir mon mot de passe</h1>{access && !params.erreur ? <AuthForm mode="password"/> : <><p className="form-error">Ce lien est invalide ou a expiré.</p><Link className="button" href="/mot-de-passe-oublie">Demander un nouveau lien</Link></>}</div></section>;
}
