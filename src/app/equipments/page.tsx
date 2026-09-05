import { PageIntro, ContactCTA } from "@/components/UbuntuSections";
import { buildMetadata } from "@/lib/seo";
import { getPublishedEquipment, getPublishedEquipmentPage } from "@/lib/equipment";
import { InfiniteEquipmentGrid } from "@/components/sections/InfiniteEquipmentGrid";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
export const metadata = buildMetadata({title: "Engins BTP en location à Brazzaville", path: "/equipments"});
export const revalidate = 300;
export default async function Page(){
  const items = await getPublishedEquipment();
  const firstPage = await getPublishedEquipmentPage(0,3);
  return <><JsonLd data={{"@context":"https://schema.org","@type":"ItemList",name:"Engins BTP en location à Brazzaville",numberOfItems:items.length,itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,url:`${SITE.url}/equipments/${item.slug}`}))}}/><PageIntro label="Nos engins" title="Des engins pour vos chantiers." description="Terrassement, chargement, compactage, transport et nivellement : cliquez sur un engin pour consulter ses capacités, ses caractéristiques et les informations financières disponibles."/><section className="section section-cream"><div className="wrap"><InfiniteEquipmentGrid initialItems={firstPage.items} total={firstPage.total}/><p className="section-note">D’autres équipements peuvent répondre à vos besoins. Les modèles, caractéristiques, disponibilités et tarifs sont à confirmer auprès de notre équipe. Les photographies sont présentées à titre illustratif.</p></div></section><ContactCTA/></>;
}
