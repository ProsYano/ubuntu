// Intitulés vérifiés sur gouvernement.cg, composition du 24 avril 2026.
// Cette liste institutionnelle ne constitue pas une liste de clients confirmés.
const ministries = [
  { name: "de la Construction, de l’Urbanisme et de l’Habitat", field: "Construction & habitat" },
  { name: "de l’Énergie et de l’Hydraulique", field: "Énergie & hydraulique" },
  { name: "des Affaires foncières et du Domaine public", field: "Foncier & domaine public" },
  { name: "des Transports, de l’Aviation civile et de la Marine marchande", field: "Transports & mobilité" },
  { name: "des Industries minières et de la Géologie", field: "Mines & géologie" },
  { name: "de l’Assainissement urbain, du Développement local et de l’Entretien routier", field: "Développement local & routes" },
];

function TrustIcon({ privateClient = false }: { privateClient?: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {privateClient ? (
        <><path d="M12 3 4 6v5c0 5 8 10 8 10s8-5 8-10V6l-8-3Z" /><path d="m8.5 11.5 2.5 2.5 4.5-5" /></>
      ) : (
        <><path d="m3 8 9-5 9 5H3ZM3 21h18M5 18V11m7 7v-7m7 7v-7M3 18h18" /></>
      )}
    </svg>
  );
}

export function TrustSection() {
  return (
    <section className="section trust-section" aria-labelledby="trust-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Secteur public & clients privés</span>
            <h2 id="trust-title">La confiance se construit.<br />La discrétion se cultive.</h2>
          </div>
          <p>Projets publics ou travaux privés : nous accordons la même attention à chaque chantier et à la confidentialité de nos échanges.</p>
        </div>
        <div className="ministries-heading">
          <h3>Les ministères de la République du Congo</h3>
          <p>Une sélection d’institutions dans les domaines de la construction, des équipements et de l’aménagement.</p>
        </div>
        <ul className="ministries-grid" aria-label="Ministères de la République du Congo">
          {ministries.map((ministry) => (
            <li key={ministry.name} className="ministry-card">
              <div className="ministry-card-top">
                <span className="trust-icon"><TrustIcon /></span>
                <span className="ministry-country"><span className="congo-flag" aria-hidden="true" />République du Congo</span>
              </div>
              <h4><span>Ministère</span>{ministry.name}</h4>
              <div className="ministry-field">{ministry.field}</div>
            </li>
          ))}
        </ul>
        <p className="ministries-source">Présentation institutionnelle ; ces organismes ne sont pas présentés comme des clients ou partenaires confirmés. <a href="https://gouvernement.cg/liste-de-la-nouvelle-equipe-gouvernementale-publiee-le-24-avril-2026/" target="_blank" rel="noopener noreferrer">Source : Gouvernement du Congo</a></p>
        <div className="private-trust-block">
          <article className="trust-card trust-card-private">
            <div className="trust-card-top"><span className="trust-icon"><TrustIcon privateClient /></span><span className="trust-label">Secteur privé</span></div>
            <h3>Clients privés, identité préservée</h3>
            <p>Entreprises et particuliers nous confient leurs travaux. Pour respecter leur confidentialité, nous ne publions ni leur identité ni les informations relatives à leurs chantiers sans leur accord.</p>
            <span className="trust-card-note">Travaux privés · Références confidentielles</span>
          </article>
        </div>
        <p className="trust-confidentiality"><TrustIcon privateClient /><span><strong>Votre confiance mérite notre discrétion.</strong> Les noms, logos et détails des projets de nos clients ne sont publiés qu’avec leur autorisation.</span></p>
      </div>
    </section>
  );
}
