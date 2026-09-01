import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import "./elementor-kit.css";
import { ClientHeader } from "@/components/layout/ClientHeader";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

/* STYLES.md §2.1 — Familles figées Schibsted Grotesk + Poppins — NE PAS AJOUTER Inter etc */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-schibsted",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

/* SEO extrême — STYLES.md §10 textes canoniques */
export const metadata: Metadata = {
  title: {
    default: "RentX — Empowering Your Projects With Our Premium Machinery",
    template: "%s — RentX",
  },
  description:
    "RentX — The Powerhouse Behind Your Infrastructure Projects. Location d'engins lourds premium : excavatrices, chargeurs, grues. Livraison à l'heure, support expert, disponible 500+ clients VIP.",
  keywords: [
    "location engins",
    "location matériel BTP",
    "excavatrice",
    "chargeur",
    "grue",
    "RentX",
    "machinerie lourde",
    "CAT 320D",
    "ZX350",
    "BTP",
    "infrastructure",
  ],
  authors: [{ name: "RentX", url: SITE.url }],
  creator: "RentX",
  publisher: "RentX",
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "/",
    languages: { "fr-FR": "/", "en-US": "/en" },
  },
  openGraph: {
    title: "RentX — Premium Machinery Rental",
    description: "Powerful Machines. Built For Thought Projects. Location fiable, rapide, premium.",
    url: SITE.url,
    siteName: "RentX",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RentX Premium Machinery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RentX — Premium Machinery Rental",
    description: "Powerful Machines. Built For Thought Projects.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Business",
  formatDetection: { email: false, address: false, telephone: false },
  verification: {
    // google: "verification-token",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF8414", // STYLES.md §1.1 accent
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RentX",
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description: SITE.description,
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-234-567-890",
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: ["French", "English"],
      },
    ],
  };

  return (
    <html lang="fr" className={`${schibsted.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect perf */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* JSON-LD SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="antialiased bg-white text-[var(--e-global-color-text)]">
        {/* ENGAGEMENT RULES.md: J’ai lu STYLES.md + RULES.md + AGENTS.md intégralement. Tokens vérifiés: #FF8414 (accent), Schibsted Grotesk 68px 800 (959a6ef), radius 50px pill. */}
        <a href="#main" className="elementor-screen-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[1000] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-[6px]">
          Aller au contenu
        </a>
        <ClientHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
