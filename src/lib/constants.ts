/* STYLES.md §1.1 — Tokens canoniques — NE PAS MODIFIER */
export const COLORS = {
  primary: "#FF0000",
  secondary: "#000811",
  text: "#181818",
  accent: "#FF8414",
  cream: "#FFF5ED",
  petrol: "#025466",
  white: "#FFFFFF",
  black: "#000000",
  peach: "#FFEFE1",
  borderAlpha: "#FFFFFF1F", // rgba(255,255,255,0.12)
  transparent: "#FFFFFF00",
} as const;

export const SHADOWS = {
  submenu: "0px 0px 30px 0px rgba(0,0,0,0.05)",
  card: "0px 0px 30px 0px rgba(0,0,0,0.15)",
  cardSoft: "9.899px 9.899px 30px 0 rgba(0,0,0,0.1)",
} as const;

export const RADIUS = {
  pill: "50px",
  card: "15px",
  submenu: "6px",
} as const;

export const TYPO = {
  h1: { size: "68px", weight: 800, lh: "1.1em", family: "Schibsted Grotesk" },
  h2: { size: "46px", weight: 700, lh: "1.1em" },
  h4: { size: "24px", weight: 600, lh: "1.3em" },
  body: { size: "16px", weight: 400, lh: "1.5em", family: "Poppins" },
  accent: { size: "16px", weight: 500, lh: "1.5em" },
} as const;

export const LAYOUT = {
  containerMax: "1280px",
  heroPaddingTop: "180px",
  footerPadding: "50px 20px",
  btnPadding: "13px 26px",
  zHeader: 999,
} as const;

export const ANIM = {
  fadeInUp: "fadeInUp 1.25s both",
  delay200: "200ms",
  ease: "ease",
  transition: "all 0.4s ease",
} as const;

export const SITE = {
  name: "Ubuntu Location BTP",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntulocationbtp.com",
  description: "Location d’engins et d’équipements pour les travaux publics, le bâtiment, les mines et l’industrie à Brazzaville. Ubuntu Location BTP : solidarité, fiabilité, performance.",
  locale: "fr_CG",
  lang: "fr",
  email: "contact@ubuntulocationbtp.com",
  phones: ["066 962 397", "044 790 405", "068 086 081"],
  address: "N° 1305, rue Bangou, Plateau des 15 ans, Brazzaville",
  hours: "Lun–Ven : 08h00–17h30 / Sam : 08h00–13h00",
  emergencies: "Selon besoins opérationnels des chantiers",
} as const;
export const phoneHref = (phone: string) => `tel:+242${phone.replaceAll(" ", "")}`;
export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
