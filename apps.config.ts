/**
 * Configuration centralisée des applications natives (Capacitor).
 *
 * Modifiée UNE FOIS pour les trois cibles : Android, iOS et Desktop (Electron).
 * C'est ici que vous définissez l'URL du site hébergé vers laquelle
 * l'app mobile et le logiciel pointent (architecture "shell natif").
 *
 * Priorité de résolution de l'URL :
 *   1. `RENTX_APP_URL` dans `.env.local` ou l'environnement (test local par exemple)
 *   2. `appUrl` ci-dessous (URL de production)
 */

export const appName = "Ubuntu Location BTP";

/** Identifiant applicatif, en inverse de domaine sans tirets (imposé par Apple/Google). */
export const appId = "com.ubilocation.btp";

/**
 * URL du site hébergé (Node.js + SQLite) vers laquelle
 * l'app Android, l'app iOS et le logiciel desktop chargent l'application.
 * À remplir avec votre domaine en HTTPS une fois le site déployé.
 */
export const appUrl = "https://VOTRE-DOMAINE-PROD.com";

/**
 * Version applicative, à refléter dans :
 *   - Android : `android/app/build.gradle` → `versionCode` + `versionName`
 *   - iOS : Xcode → Target App → General → Identity
 *   - Desktop : `electron/package.json` → `version`
 */
export const appVersion = "1.0.0";

/** Vrai uniquement pour tester l'app sur votre machine avec `npm run dev`. */
export function resolveAppUrl(envUrl?: string): string {
  return envUrl && envUrl.trim() !== "" ? envUrl.trim() : appUrl;
}
