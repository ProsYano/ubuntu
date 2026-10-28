import type { CapacitorConfig } from "@capacitor/cli";

import { appName, appId, resolveAppUrl } from "./apps.config";

const appUrl = resolveAppUrl(process.env.RENTX_APP_URL);

/**
 * Architecture "shell natif vers site hébergé" :
 * la Webview ne sert pas de fichiers locaux mais charge directement
 * le site Next.js hébergé (Node.js + better-sqlite3), source de vérité.
 *
 * @see apps.config.ts pour l'URL, l'identifiant et la version.
 */
const config: CapacitorConfig = {
  appId,
  appName,
  webDir: "capacitor-web",
  android: {
    // Les photos/mémos envoyés au site doivent rester visibles.
    allowMixedContent: false,
  },
  ios: {
    contentInset: "always",
  },
  server: {
    // Charge le site hébergé au démarrage, sur toutes les plateformes.
    url: appUrl,
    // Requis uniquement quand l'URL est un http:// local (tests sans reverse proxy).
    cleartext: appUrl.startsWith("http://"),
    // Blocking webview navigation outside of allowed hosts is guarded by AndroidScheme below
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#0f172a",
      showSpinner: false,
    },
  },
};

export default config;
