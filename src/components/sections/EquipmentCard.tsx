import Image from "next/image";
import Link from "next/link";
import { availabilityLabels, formatRate, imageUrl, type Equipment } from "@/lib/equipment-schema";

export function EquipmentCard({item, index}: {item: Equipment; index: number}) {
  const source = imageUrl(item.image_path);
  const rate = formatRate(item.daily_rate);
  return <article className="equipment-card">
    <Link href={`/equipments/${item.slug}`} className="equipment-card-link" aria-label={`Découvrir ${item.name}, ses capacités et ses tarifs`}>
      <div className="equipment-picture">
        <span className="equipment-number">{String(index + 1).padStart(2,"0")}</span>
        {source ? <Image unoptimized={source.startsWith("/api/media/")} src={source} alt={item.image_alt || item.name} width={460} height={290} sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 33vw"/> : <div className="equipment-type">{item.category}</div>}
      </div>
      <div className="equipment-copy">
        <h3>{item.name}</h3>
        <p>{item.summary}</p>
        <div className="equipment-meta"><span>{availabilityLabels[item.availability]}</span><strong>{rate ? `${rate} / jour` : "Tarif sur devis"}</strong></div>
        <span className="equipment-view-link">Voir capacités et tarifs</span>
      </div>
    </Link>
  </article>;
}
