"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/constants";
export function QuoteForm({equipment}: {equipment: {name:string}[]}){
 const params = useSearchParams();
 const requested = params.get("engin") || "";
 const initial = equipment.some(e => e.name === requested) ? requested : "";
 const [selection, setEngin] = useState<string | null>(null);
 const engin = selection ?? initial;
 const [prepared, setPrepared] = useState(false);
 return <form id="devis" className="quote-form" onSubmit={e => {e.preventDefault(); const data=new FormData(e.currentTarget); const body=`Nom : ${data.get("nom")}\nEntreprise : ${data.get("entreprise")}\nTéléphone : ${data.get("telephone")}\nE-mail : ${data.get("email")}\nEngin : ${engin || "À définir"}\nLieu du chantier : ${data.get("lieu")}\n\n${data.get("message")}`; window.location.href=`mailto:${SITE.email}?subject=${encodeURIComponent("Demande de devis — " + (engin || "Projet BTP"))}&body=${encodeURIComponent(body)}`;setPrepared(true);}}><span className="eyebrow">Votre projet</span><h2>Préparer une demande de devis</h2><p>Ce formulaire ouvre votre messagerie avec une demande préremplie. Vous pourrez la relire avant de l’envoyer.</p><div className="form-grid"><label>Nom et prénom *<input name="nom" required autoComplete="name" maxLength={120}/></label><label>Entreprise<input name="entreprise" autoComplete="organization" maxLength={160}/></label><label>Téléphone *<input name="telephone" type="tel" required autoComplete="tel" maxLength={40}/></label><label>Adresse e-mail *<input name="email" type="email" required autoComplete="email" maxLength={200}/></label></div><label>Équipement recherché<select value={engin} onChange={e=>setEngin(e.target.value)}><option value="">À définir avec votre équipe</option>{equipment.map(e=><option key={e.name}>{e.name}</option>)}<option>Autre équipement</option></select></label><label>Lieu du chantier *<input name="lieu" required maxLength={300}/></label><label>Décrivez votre besoin *<textarea name="message" required rows={5} maxLength={3000} placeholder="Nature des travaux, dates souhaitées, durée de location et contraintes d’accès…"/></label><button type="submit" className="button">Ouvrir ma messagerie ↗</button>{prepared && <p role="status">Votre demande est prête à être ouverte dans votre messagerie. Aucun message n’a été envoyé par le site. Si rien ne s’ouvre, écrivez directement à {SITE.email}.</p>}</form>;
}
