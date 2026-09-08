import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/AuthForm";
import { returnPath } from "@/lib/return-path";
import { getAccess, homeFor } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Créer un compte client", path: "/inscription", noIndex: true });
export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = returnPath((await searchParams).next);
  const access = await getAccess();
  if (access) redirect(access.user.role === "client" ? next : homeFor(access.user));
  return <section className="section section-cream"><div className="auth-single"><span className="eyebrow">Bienvenue</span><h1>Votre compte client</h1><p>Déposez vos demandes de location, suivez leur traitement et échangez avec l’administration.</p><AuthForm mode="register" next={next}/></div></section>;
}
