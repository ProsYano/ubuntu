import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getPublishedEquipment } from "@/lib/equipment";
export const revalidate = 300;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const equipment = await getPublishedEquipment();
  return [
    ...["/", "/about", "/services", "/equipments", "/faq", "/contact"].map(path=>({url:`${SITE.url}${path}`})),
    ...equipment.map(item=>({url:`${SITE.url}/equipments/${item.slug}`,lastModified:new Date(item.updated_at)})),
  ];
}
