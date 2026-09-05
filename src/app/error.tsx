"use client";
import Link from "next/link";
export default function ErrorPage({reset}: {reset: () => void}) {return <section className="section"><div className="wrap prose"><span className="eyebrow">Une interruption temporaire</span><h1>Cette page n’est pas disponible pour le moment.</h1><p>Veuillez réessayer. Notre équipe reste joignable pour vous accompagner.</p><div className="actions"><button className="button" onClick={reset}>Réessayer</button><Link href="/contact" className="button button-neutral">Nous contacter</Link></div></div></section>;}
