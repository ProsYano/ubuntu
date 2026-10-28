import Link from "next/link";
import { SITE } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Retrouver mon accès", path: "/mot-de-passe-oublie", noIndex: true });
export default function Page() { return <section className="section section-cream"><div className="auth-single"><h1>Mot de passe oublié ?</h1><p>Contactez notre administration en indiquant l’adresse e-mail de votre compte. Après vérification de votre identité, elle vous remettra un lien valable 30 minutes pour choisir un nouveau mot de passe.</p><a className="button" href={`mailto:${SITE.email}?subject=Récupération%20de%20compte`}>Contacter l’administration</a><Link href="/connexion">← Retour à la connexion</Link></div></section>; }
