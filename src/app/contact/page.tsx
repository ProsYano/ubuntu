import { getPublishedEquipment } from "@/lib/equipment";
import { Suspense } from "react";
import { PageIntro } from "@/components/UbuntuSections";
import { QuoteForm } from "@/components/QuoteForm";
import { SITE, phoneHref, mapHref } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({title: "Contact et demande de devis", path: "/contact"});
export const revalidate = 300;
export default async function Page(){const equipment = await getPublishedEquipment(); return <><PageIntro label="Contact" title="Parlons de votre chantier." description="Une demande de location, un besoin en équipement ou une question ? Contactez Ubuntu Location BTP à Brazzaville."/><section className="section"><div className="wrap contact-grid"><div className="contact-details"><span className="eyebrow">À votre écoute</span><h2>Nos coordonnées</h2><dl><dt>Téléphones</dt><dd>{SITE.phones.map(p=><a key={p} href={phoneHref(p)}>{p}</a>)}</dd><dt>E-mail</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd><dt>Site web</dt><dd><a href={SITE.url}>www.ubuntulocationbtp.com</a></dd><dt>Adresse</dt><dd><address>{SITE.address}</address><a className="text-link" href={mapHref} target="_blank" rel="noopener noreferrer">Voir l’itinéraire ↗</a></dd><dt>Horaires d’ouverture</dt><dd>Du lundi au vendredi : 08h00–17h30<br/>Le samedi : 08h00–13h00</dd><dt>Urgences</dt><dd>{SITE.emergencies}</dd></dl></div><Suspense fallback={<p>Chargement du formulaire…</p>}><QuoteForm equipment={equipment.map(({name})=>({name}))}/></Suspense></div></section></>;}
