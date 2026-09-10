import { JsonLd } from "@/components/JsonLd";
import type { Viewport } from "next";
import { Schibsted_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import "./ubuntu.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactDock } from "@/components/contact/ContactDock";
import { buildMetadata, jsonLdOrganization, jsonLdWebsite } from "@/lib/seo";
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

export const metadata = {
  ...buildMetadata(),
  icons: {
    icon: { url: "/branding/ubuntu-location-btp.jpg", type: "image/jpeg" },
    apple: { url: "/branding/ubuntu-location-btp.jpg", type: "image/jpeg" },
  },
};
export const viewport: Viewport = {themeColor: "#e9ad16", width: "device-width", initialScale: 1};
export default function RootLayout({children}: {children: React.ReactNode}){return <html lang="fr" className={`${schibsted.variable} ${poppins.variable}`}><body><JsonLd data={jsonLdWebsite()}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLdOrganization()).replace(/</g,"\\u003c")}}/><a className="skip-link" href="#main">Aller au contenu</a><Header/><main id="main">{children}</main><Footer/><ContactDock/></body></html>;}
