"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RentalDates } from "./account/RentalDates";
import { ActionForm } from "./account/ActionForm";
import { createPublicQuote } from "@/app/compte/actions";
import { VoiceDescription } from "./VoiceDescription";
export function QuoteForm({ equipment }: { equipment: { id: string; name: string }[] }) {
  const [audio, setAudio] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  async function submit(state: Parameters<typeof createPublicQuote>[0], form: FormData) {
    if (audio) form.set("voice", audio);
    return createPublicQuote(state, form);
  }
  const params = useSearchParams();
  const initial = equipment.find(item => item.name === params.get("engin") || item.id === params.get("engin"))?.id ?? "";
  const [selection, setSelection] = useState<string | null>(null);
  const selected = selection ?? initial;
  const [requestKey] = useState(() => crypto.randomUUID());
  if (params.get("demande") === "envoyee") return <div id="devis" className="quote-form" role="status"><h2>Votre demande a bien été envoyée.</h2><p>Notre administration a reçu votre demande avec le produit sélectionné et vous recontactera par e-mail ou téléphone.</p><Link className="button" href="/contact#devis">Faire une autre demande</Link></div>;
  return <div id="devis" className="quote-form"><span className="eyebrow">Votre projet</span><h2>Demander une location</h2><p>Déposez votre demande, même sans compte. Notre administration vous recontactera par e-mail ou téléphone.</p><ActionForm action={submit} submitDisabled={recording} label="Envoyer ma demande"><input type="hidden" name="request_key" value={requestKey}/><label>Nom et prénom *<input name="name" required minLength={2} maxLength={120}/></label><label>Adresse e-mail *<input type="email" name="email" required maxLength={254}/></label><label>Équipement recherché *<select name="equipment_id" required value={selected} onChange={event => setSelection(event.target.value)}><option value="">Choisir un engin</option>{equipment.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className="form-grid"><RentalDates/><label>Téléphone *<input name="phone" type="tel" required minLength={6} maxLength={40}/></label><label>Entreprise<input name="company" maxLength={160}/></label></div><label>Lieu du chantier *<input name="location" required minLength={3} maxLength={300}/></label><div className="project-description"><label htmlFor="project-notes">Décrivez votre besoin {audio ? "(facultatif avec un vocal)" : "*"}</label><p id="project-notes-help">Précisez les travaux prévus, les contraintes d’accès et vos attentes.</p><textarea id="project-notes" aria-describedby="project-notes-help" name="notes" required={!audio} minLength={10} maxLength={3000} rows={5} placeholder="Décrivez votre chantier et l’utilisation prévue de l’engin…"/><VoiceDescription onAudioChange={setAudio} onBusyChange={setRecording}/></div></ActionForm><Link className="text-link" href="/connexion">Déjà client ? Accéder à mon espace</Link></div>;
}
