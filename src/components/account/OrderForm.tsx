"use client";
import { useState } from "react";
import { createOrder } from "@/app/compte/actions";
import { RentalDates } from "./RentalDates";
import { ActionForm } from "./ActionForm";
import { formatRate } from "@/lib/equipment-schema";
export function OrderForm({ equipment, initial = "", requestKey, minimumDate }: { equipment: { id: string; name: string; daily_rate: number | null }[]; initial?: string; requestKey: string; minimumDate: string }) {
  const [selected, setSelected] = useState(equipment.some(item => item.id === initial) ? initial : "");
  const item = equipment.find(item => item.id === selected);
  return <ActionForm action={createOrder} label="Envoyer ma demande de location ↗"><input type="hidden" name="request_key" value={requestKey}/><label>Engin souhaité *<select name="equipment_id" required value={selected} onChange={event => setSelected(event.target.value)}><option value="">Choisir un engin</option>{equipment.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>{item && <p className="form-notice">Tarif journalier indicatif : {formatRate(item.daily_rate) ?? "Sur devis"}. Le montant final et les prestations seront confirmés par l’administration.</p>}<div className="form-grid"><RentalDates minimumDate={minimumDate}/><label>Téléphone *<input name="phone" type="tel" autoComplete="tel" required minLength={6} maxLength={40}/></label><label>Entreprise<input name="company" autoComplete="organization" maxLength={160}/></label></div><label>Lieu du chantier *<input name="location" required minLength={3} maxLength={300}/></label><label>Décrivez votre besoin *<textarea name="notes" required minLength={10} maxLength={3000} rows={5} placeholder="Nature des travaux, contraintes d’accès, transport ou opérateur souhaité…"/></label><p>Votre demande reste en attente jusqu’à son acceptation par l’administration. Les dates de début et de fin sont incluses dans la période demandée.</p></ActionForm>;
}
