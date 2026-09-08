import Link from "next/link";
import { updatePublicQuote } from "@/app/compte/actions";
import { displayDate, orderLabels, transitions, type OrderEvent, type PublicQuoteRequest } from "@/lib/workflow-schema";
import { ActionForm } from "./ActionForm";

export function PublicQuoteDetail({ quote, events }: { quote: PublicQuoteRequest; events: OrderEvent[] }) {
  const options = transitions[quote.status];
  return <section className="section"><div className="wrap">
    <Link className="text-link" href="/gestion/commandes">← Toutes les demandes</Link>
    <div className="editor-heading">
      <span className="eyebrow">Demande {quote.id.slice(0, 8).toUpperCase()} · Sans compte</span>
      <h1>{quote.equipment_name}</h1>
      <span className={`status-badge order-${quote.status}`}>{orderLabels[quote.status]}</span>
      <p>Reçue le {displayDate(quote.created_at)}</p>
    </div>
    <div className="workspace-detail"><div>
      <article className="editor-panel">
        <h2>Contact et entreprise</h2>
        <dl className="workspace-facts">
          <div><dt>Nom du contact</dt><dd>{quote.name}</dd></div>
          <div><dt>Entreprise déclarée</dt><dd>{quote.company || "Non renseignée"}</dd></div>
          <div><dt>Adresse e-mail</dt><dd><a href={`mailto:${encodeURIComponent(quote.email)}`}>{quote.email}</a></dd></div>
          <div><dt>Téléphone déclaré</dt><dd>{quote.phone}</dd></div>
        </dl>
        <p>Coordonnées renseignées par le demandeur, sans compte client. Contactez-le pour confirmer son besoin et les conditions.</p>
      </article>
      <article className="editor-panel">
        <h2>La location demandée</h2>
        <dl className="workspace-facts">
          <div><dt>Produit</dt><dd><Link href={`/gestion/engins/${quote.equipment_id}`}>{quote.equipment_name} — Voir la fiche ↗</Link></dd></div>
          <div><dt>Début de location</dt><dd>{displayDate(quote.start_date)}</dd></div>
          <div><dt>Fin de location</dt><dd>{displayDate(quote.end_date)}</dd></div>
          <div><dt>Lieu du chantier</dt><dd>{quote.location}</dd></div>
        </dl>
        <h3>Besoin exprimé</h3><p className="preserve-lines">{quote.notes}</p>
      </article>
      <article className="editor-panel"><h2>Historique de la demande</h2>
        <ol className="order-history">{events.map(event => <li key={event.id}>
          <strong>{orderLabels[event.status]}</strong><span>{displayDate(event.created_at)} · {event.actor_name}</span>
          {event.note && <p className="preserve-lines">{event.note}</p>}
        </li>)}</ol>
      </article>
    </div><aside><section className="editor-panel">
      <h2>Traiter la demande</h2>
      <p>Statut actuel : <strong>{orderLabels[quote.status]}</strong></p>
      {quote.admin_note && <><h3>Dernière note interne</h3><p className="preserve-lines">{quote.admin_note}</p></>}
      {options.length ? <>
        <p>Acceptez ou refusez une demande en attente. Une location acceptée peut ensuite être terminée ou annulée.</p>
        <ActionForm key={quote.version} action={updatePublicQuote} label="Enregistrer le statut">
          <input type="hidden" name="id" value={quote.id}/><input type="hidden" name="version" value={quote.version}/>
          <label>Nouveau statut<select name="status">{options.map(status => <option key={status} value={status}>{orderLabels[status]}</option>)}</select></label>
          <label>Note interne / motif<textarea name="note" maxLength={2000} rows={4}/><small>Motif obligatoire pour un refus ou une annulation.</small></label>
        </ActionForm>
      </> : <p>Cette demande est clôturée. Son historique reste consultable.</p>}
      <p>Le changement de statut n’envoie pas de notification. Prévenez le demandeur par e-mail ou téléphone.</p>
    </section></aside></div>
  </div></section>;
}
