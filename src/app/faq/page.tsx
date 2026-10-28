import Link from "next/link";
import { PageIntro } from "@/components/UbuntuSections";
import { faqs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({title: "Questions fréquentes", path: "/faq"});
export default function Page(){return <><PageIntro label="Questions fréquentes" title="Les réponses à vos questions." description="Retrouvez les informations utiles pour préparer votre location et échanger avec notre équipe."/><section className="section"><div className="wrap faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<div className="process"><h2>Un besoin particulier ?</h2><p>Notre équipe est à votre écoute pour étudier votre projet.</p><Link className="button" href="/contact">Nous contacter</Link></div></div></section></>;}
