import type { Metadata } from "next";
import { SITE, phoneHref } from "./constants";
import { imageUrl, type Equipment } from "./equipment-schema";

export const pageDescriptions: Record<string, string> = {
  "/": "Location d’engins BTP à Brazzaville : pelles, chargeuses, bulldozers, compacteurs, camions bennes et niveleuses. Contactez Ubuntu Location BTP pour un devis.",
  "/about": "Découvrez Ubuntu Location BTP à Brazzaville : location d’engins entretenus et professionnels qualifiés pour le bâtiment, les travaux publics, les mines et l’industrie.",
  "/services": "Location d’engins BTP, matériel entretenu et opérateurs qualifiés à Brazzaville. Étudions les équipements et les conditions d’intervention adaptés à votre chantier.",
  "/equipments": "Découvrez les engins proposés à la location par Ubuntu Location BTP à Brazzaville. Photos, caractéristiques et disponibilité : trouvez le matériel pour votre chantier.",
  "/contact": "Contactez Ubuntu Location BTP au 066 962 397. Adresse à Brazzaville, horaires et demande de devis pour la location d’engins et d’équipements de chantier.",
  "/faq": "Location d’engins BTP à Brazzaville : réponses à vos questions sur les devis, les opérateurs, le transport, les horaires et les demandes urgentes.",
};
export function buildMetadata({ title, description, path = "/", noIndex = false, image }: {title?: string; description?: string; path?: string; noIndex?: boolean; image?: string} = {}): Metadata {
  const fullTitle = `${title || "Location d’engins BTP à Brazzaville"} — ${SITE.name}`;
  const summary = description || pageDescriptions[path] || SITE.description;
  const socialImage = image || "/opengraph-image";
  return {
    title: fullTitle, description: summary, metadataBase: new URL(SITE.url),
    applicationName: SITE.name, authors: [{name: SITE.name}], creator: SITE.name, publisher: SITE.name,
    alternates: {canonical: path},
    openGraph: {title: fullTitle, description: summary, url: path, siteName: SITE.name, locale: SITE.locale, type: "website", images: [{url: socialImage, alt: fullTitle}]},
    twitter: {card: "summary_large_image", title: fullTitle, description: summary, images: [socialImage]},
    robots: noIndex ? {index: false, follow: false} : {index: true, follow: true, googleBot: {index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1}},
    verification: process.env.GOOGLE_SITE_VERIFICATION ? {google: process.env.GOOGLE_SITE_VERIFICATION} : undefined,
  };
}
export function jsonLdOrganization() {return {
  "@context":"https://schema.org", "@type":"LocalBusiness", "@id":`${SITE.url}/#organization`,
  name:SITE.name, url:SITE.url, description:SITE.description, email:SITE.email,
  logo:`${SITE.url}/branding/ubuntu-location-btp.jpg`,
  telephone:phoneHref(SITE.phones[0]).replace("tel:",""),
  contactPoint:SITE.phones.map(phone => ({"@type":"ContactPoint",telephone:phoneHref(phone).replace("tel:",""),contactType:"customer service",availableLanguage:"French"})),
  address:{"@type":"PostalAddress",streetAddress:"N° 1305, rue Bangou, Plateau des 15 ans",addressLocality:"Brazzaville",addressCountry:"CG"},
  areaServed:{"@type":"City",name:"Brazzaville"},
  openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday"],opens:"08:00",closes:"17:30"},{"@type":"OpeningHoursSpecification",dayOfWeek:"Saturday",opens:"08:00",closes:"13:00"}],
};}
export function jsonLdWebsite() {return {"@context":"https://schema.org", "@type":"WebSite", "@id":`${SITE.url}/#website`, url:SITE.url, name:SITE.name, inLanguage:"fr-CG", publisher:{"@id":`${SITE.url}/#organization`}};}
export function jsonLdBreadcrumb(items: {name:string; path:string}[]) {return {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:items.map((item,index) => ({"@type":"ListItem",position:index+1,name:item.name,item:new URL(item.path,SITE.url).href}))};}
export function jsonLdEquipment(item: Equipment) {
  const image = imageUrl(item.image_path);
  // Rental Service, with no invented price, review, manufacturer, or stock count.
  const offers = [["DAY",item.daily_rate],["WEEK",item.weekly_rate],["MONTH",item.monthly_rate]].filter((entry): entry is [string,number] => entry[1] !== null).map(([unitCode,price])=>({"@type":"Offer",price,priceCurrency:"XAF",unitCode,availability:item.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",url:`${SITE.url}/equipments/${item.slug}`}));
  return {"@context":"https://schema.org","@type":"Service","@id":`${SITE.url}/equipments/${item.slug}#service`,name:`Location : ${item.name}`,description:item.summary,serviceType:`Location d’engins BTP — ${item.category}`,url:`${SITE.url}/equipments/${item.slug}`,provider:{"@id":`${SITE.url}/#organization`},areaServed:{"@type":"City",name:"Brazzaville"},...(image ? {image:new URL(image,SITE.url).href} : {}),...(offers.length ? {offers} : {})};
}
