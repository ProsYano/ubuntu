import Link from "next/link";
import { getPublishedEquipment } from "@/lib/equipment";
import type { Equipment } from "@/lib/equipment-schema";
import { EquipmentCard } from "./EquipmentCard";
export async function DynamicEquipmentGrid({items}: {items?: Equipment[]}) {
  const equipment = items ?? await getPublishedEquipment();
  if (!equipment.length) return <div className="admin-empty"><h3>Notre catalogue est en cours de mise à jour.</h3><p>Contactez notre équipe pour connaître les équipements disponibles.</p><Link className="button" href="/contact">Nous contacter ↗</Link></div>;
  return <div className="equipment-grid">{equipment.map((item,index)=><EquipmentCard key={item.id} item={item} index={index}/>)}</div>;
}
