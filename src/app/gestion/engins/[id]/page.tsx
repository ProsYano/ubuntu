import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { store } from "@/lib/server";
import { requireEditor } from "@/lib/auth";
import type { Equipment } from "@/lib/equipment-schema";
import { EquipmentForm } from "@/components/admin/EquipmentForm";
export default async function Page({params}: {params: Promise<{id:string}>}) {
  const {user} = await requireEditor();
  const {id} = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const data = store().equipment(user.id, id);
  if (!data) notFound();
  return <section className="section"><div className="wrap"><Link className="text-link" href="/gestion/engins">← Retour au catalogue</Link><div className="editor-heading"><span className="eyebrow">Modifier une fiche</span><h1>{data.name}</h1><p>Actualisez les informations, la photographie et les conditions de disponibilité.</p></div><EquipmentForm equipment={data as Equipment}/></div></section>;
}
