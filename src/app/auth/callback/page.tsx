import { AuthCallback } from "@/components/admin/AuthCallback";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({title:"Vérification de votre accès",path:"/auth/callback",noIndex:true});
export default function Page() {return <section className="section section-cream"><div className="auth-single"><span className="eyebrow">Accès sécurisé</span><h1>Retrouver votre espace</h1><AuthCallback/></div></section>;}
