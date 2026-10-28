import { JsonLd } from "./JsonLd";
import { jsonLdBreadcrumb } from "@/lib/seo";
import Link from "next/link";
import { services } from "@/lib/content";
export function PageIntro({label, title, description}: {label: string; title: string; description: string}) {return <section className="page-intro"><JsonLd data={jsonLdBreadcrumb([{name:"Accueil",path:"/"},{name:label,path:({"L’entreprise":"/about","Services":"/services","Nos engins":"/equipments","Questions fréquentes":"/faq","Contact":"/contact"} as Record<string,string>)[label] || "/"}])}/><div className="wrap"><div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span>{label}</div><h1>{title}</h1><p>{description}</p></div></section>;}
export { DynamicEquipmentGrid as EquipmentGrid } from "./sections/DynamicEquipmentGrid";
export function ServicesGrid() {return <div className="services-grid">{services.map(([n,t,d]) => <article key={n}><span className="service-number">{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>;}
export function ContactCTA() {return <section className="contact-cta"><div className="wrap"><div><span className="eyebrow">Construisons votre projet</span><h2>Votre chantier commence<br/>par un échange.</h2><p>Parlez-nous de vos travaux. Ensemble, définissons les équipements adaptés.</p></div><Link className="button" href="/contact">Parlons de votre chantier</Link></div></section>;}
