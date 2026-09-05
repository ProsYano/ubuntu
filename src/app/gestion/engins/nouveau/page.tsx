import Link from "next/link";
import { requireEditor } from "@/lib/auth";
import { EquipmentForm } from "@/components/admin/EquipmentForm";
export default async function Page() { await requireEditor(); return <section className="section"><div className="wrap"><Link className="text-link" href="/gestion/engins">← Retour au catalogue</Link><div className="editor-heading"><span className="eyebrow">Nouvelle fiche</span><h1>Ajouter un engin</h1><p>Présentez votre équipement, ajoutez sa photo et choisissez quand le publier.</p></div><EquipmentForm/></div></section>; }
