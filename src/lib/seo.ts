import type { Metadata } from "next";
import { SITE } from "./constants";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  image = "/og-image.jpg",
  noIndex = false,
  keywords = [
    "location engins",
    "BTP",
    "machinerie lourde",
    "RentX",
    "excavatrice",
    "chargeur",
    "location matériel",
  ],
}: SeoProps): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — Premium Machinery Rental`;
  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    category: "Business",
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description: SITE.description,
    sameAs: [],
  };
}

export function jsonLdBreadcrumb(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}
