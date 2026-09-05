import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEquipmentBySlug } from "@/lib/equipment";
import { imageUrl, availabilityLabels, formatRate } from "@/lib/equipment-schema";
import { buildMetadata, jsonLdBreadcrumb, jsonLdEquipment } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ContactCTA } from "@/components/UbuntuSections";
export const revalidate = 300;
type Props = {params: Promise<{slug:string}>};
export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const item = await getEquipmentBySlug(slug);
  if (!item) notFound();
  return buildMetadata({title: item.seo_title || `${item.name} en location à Brazzaville`, description: item.seo_description || item.summary, path:`/equipments/${item.slug}`, image: imageUrl(item.image_path) || undefined});
}
export default async function Page({params}: Props) {
  const {slug} = await params;
  const item = await getEquipmentBySlug(slug);
  if (!item) notFound();
  const source = imageUrl(item.image_path);
  const rates = [["À la journée",item.daily_rate],["À la semaine",item.weekly_rate],["Au mois",item.monthly_rate]] as const;
  return <><JsonLd data={jsonLdEquipment(item)}/><JsonLd data={jsonLdBreadcrumb([{name:"Accueil",path:"/"},{name:"Nos engins",path:"/equipments"},{name:item.name,path:`/equipments/${item.slug}`}])}/><section className="section section-cream"><div className="wrap"><nav className="breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span>/</span><Link href="/equipments">Nos engins</Link><span>/</span><span>{item.name}</span></nav><div className="equipment-detail"><div className="equipment-detail-photo">{source ? <Image src={source} alt={item.image_alt || item.name} width={900} height={650} sizes="(max-width: 800px) 100vw, 55vw" priority/> : <div className="equipment-type"><span aria-hidden="true">↗</span>{item.category}</div>}</div><div><span className="eyebrow">{item.category}</span><h1>{item.name}</h1><p>{item.summary}</p><span className="status-badge">{availabilityLabels[item.availability]}</span><p>Location à Brazzaville. Les caractéristiques et les modalités d’intervention sont à confirmer avec notre équipe.</p><Link className="button" href={`/contact?engin=${encodeURIComponent(item.name)}#devis`}>Demander un devis ↗</Link></div></div></div></section><section className="section"><div className="wrap equipment-detail-content"><article><span className="eyebrow">Présentation</span><h2>Un équipement pour vos travaux</h2><div className="equipment-description">{item.description.split(/\n\s*\n/).filter(Boolean).map((paragraph,i) => <p key={i}>{paragraph}</p>)}</div>{item.capacity_summary && <div className="capacity-panel"><h2>Capacités générales</h2><ul>{item.capacity_summary.split("\n").filter(line=>line.trim()).map((line,i)=><li key={i}>{line}</li>)}</ul></div>}</article><aside><div className="financial-panel"><span className="eyebrow">Informations financières</span><h2>Conditions de location</h2><dl>{rates.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{formatRate(value) ?? "Sur devis"}</dd></div>)}</dl>{item.rental_terms ? <p>{item.rental_terms}</p> : <p>Transport, opérateur, carburant, caution et durée de location : conditions communiquées après étude du chantier.</p>}<small>Tarifs indicatifs lorsqu’ils sont affichés. Le devis validé précise le montant final et les prestations incluses.</small><Link className="button" href={`/contact?engin=${encodeURIComponent(item.name)}#devis`}>Obtenir un devis personnalisé ↗</Link></div>{item.specifications && <div className="editor-panel"><h2>Caractéristiques techniques</h2><ul className="check-list">{item.specifications.split("\n").filter(line=>line.trim()).map((line,i)=><li key={i}>{line}</li>)}</ul></div>}</aside></div></section><ContactCTA/></>;
}
