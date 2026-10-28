import Link from "next/link";
export default function NotFound(){return <section className="section"><div className="wrap prose"><span className="eyebrow">Erreur 404</span><h1>Page introuvable</h1><p>La page recherchée n’existe pas ou a été déplacée.</p><Link className="button" href="/">Retour à l’accueil</Link></div></section>;}
