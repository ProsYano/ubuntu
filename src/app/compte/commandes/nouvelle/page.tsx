import Link from "next/link";
import { getPublishedEquipment } from "@/lib/equipment";
import { OrderForm } from "@/components/account/OrderForm";
import { randomUUID } from "node:crypto";
import { today } from "@/lib/workflow-schema";
import { requireAccess } from "@/lib/auth";
export default async function Page({ searchParams }: { searchParams: Promise<{ engin?: string }> }) {
  await requireAccess(["client"]);
  const { engin } = await searchParams;
  const equipment = (await getPublishedEquipment()).filter(item => item.availability !== "unavailable").map(({ id, name, daily_rate }) => ({ id, name, daily_rate }));
  return <section className="section"><div className="wrap workspace-narrow"><Link className="text-link" href="/contact">← Contact</Link><div className="editor-heading"><span className="eyebrow">Votre chantier</span><h1>Demander une location</h1><p>Précisez votre besoin. Notre administration étudiera votre demande.</p></div>{equipment.length ? <OrderForm equipment={equipment} initial={engin} requestKey={randomUUID()} minimumDate={today()}/> : <div className="admin-empty"><h2>Aucun engin disponible pour le moment.</h2><Link href="/contact">Contacter l’administration ↗</Link></div>}</div></section>;
}
