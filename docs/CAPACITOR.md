# Applications natives — Capacitor (Android, iOS, Desktop)

Ce projet génère **trois produits** depuis la même base de code Next.js :

| Cible | Commande | Sortie |
| --- | --- | --- |
| Site web (Node.js) | `npm run build && npm start` | Site hébergé, source de vérité des données |
| App Android | `npm run app:aab` / `npm run app:apk` | `.aab` (Play Store) / `.apk` (test) |
| App iOS | ouvert puis archiver dans Xcode | `.ipa` (App Store / TestFlight) |
| Logiciel desktop | `npm run app:desktop:pack` | `.dmg` macOS, `.exe` Windows, `.AppImage/.deb` Linux |

L'app mobile et le logiciel desktop sont des **shells natifs** : la WebView charge
directement le site hébergé (Next.js + `better-sqlite3`). Aucune donnée n'est
dupliquée : comptes, commandes, messagerie et photos proviennent toujours du serveur
Node avec SQLite. Ce choix permet 100 % de compatibilité avec le code existant.

## Configuration centralisée

Tout se règle dans **`apps.config.ts`** (racine du projet) et se propage aux
troix cibles par `npm run app:sync` :

- `appUrl` — URL du site hébergé en HTTPS. **À remplir** avant publication.
- `appId` — identifiant inversé-domaine (`com.ubilocation.btp`), figé à vie une fois
  les apps publiées.
- `appName` — nom affiché sous l'icône.
- `appVersion` — version, à refléter dans Android (`build.gradle`), iOS (Xcode)
  et desktop (`electron/package.json`).

Pour tester depuis votre machine sans toucher `apps.config.ts`, ajoutez dans
`.env.local` (rechargé par `npm run app:sync`) :

```ini
RENTX_APP_URL=http://localhost:3000
```

La clé `cleartext` de `capacitor.config.ts` s'active automatiquement pour un
`http://` local.

## Commandes essentielles

| Commande | Rôle |
| --- | --- |
| `npm run app:sync` | Propage `capacitor.config.ts` + `capacitor-web/` dans les 3 projets |
| `npm run app:run:android` | Lance l'app sur un appareil/émulateur branché |
| `npm run app:run:ios` | Lance l'app sur simulateur/appareil iOS |
| `npm run app:run:desktop` | Ouvre la fenêtre desktop en développement |
| `npm run app:apk` | APK de test (signature debug) |
| `npm run app:aab` | `.aab` signé release (Play Store) |
| `npm run app:desktop:pack` | Installateurs desktop (electron-builder) |
| `npm run app:open:android` | Ouvre le projet dans Android Studio |
| `npm run app:open:ios` | Ouvre le projet dans Xcode |

Après **toute** modification de `apps.config.ts`, `capacitor.config.ts` ou
`capacitor-web/` : relancer `npm run app:sync`.

> Desktop : utiliser toujours le nom complet `@capawesome/capacitor-electron`
> dans les commandes `cap` — la forme courte `electron` désigne le paquet npm
> et ne fait rien.

## Android

Exigences : Android SDK (`ANDROID_HOME`), **JDK 21** (Capacitor 8). Le projet
contient `scripts/android-gradle.sh`, qui trouve JDK 21 automatiquement
(Homebrew `openjdk@21`, sinon `/usr/libexec/java_home -v 21`, sinon la variable
`RENTX_JDK21`) : aucune modification du shell n'est nécessaire.

```bash
brew install openjdk@21       # au besoin
npm run app:apk               # android/app/build/outputs/apk/debug/app-debug.apk
npm run app:aab               # android/app/build/outputs/bundle/release/app-release.aab
```

Avant le Play Store :

1. Créer une clé de signature (une seule fois, conserver hors Git) :
   `keytool -genkey -v -keystore rentx-upload.keystore -alias rentx -keyalg RSA -keysize 2048 -validity 10000`
2. Déclarer les deux variables `keystore.properties` (emplacement du fichier,
   alias, mots de passe) dans `android/app/build.gradle` via `signingConfigs`;
   `keystore.properties` est ignoré par Git.
3. Choisir la signature Play App Signing dans la console.
4. Incrémenter `versionCode` + `versionName` dans `android/app/build.gradle`.

## iOS

Exigences : Xcode (installé ici : 26.6) et une équipe dans l'App Store Connect.

```bash
npm run app:open:ios          # Xcode : Target « App »
```

Dans Xcode : sélectionner le projet App → **Signing & Capabilities** → choisir
l'équipe, régler l'icône, puis **Product → Archive** pour générer l'`.ipa`.
Le bundle identifier vient de `appId` (`com.ubilocation.btp` et iOS dérive
automatiquement un `App` suffixé selon le format du projet).

## Desktop (Windows, macOS, Linux)

```bash
npm run app:run:desktop       # développement
npm run app:desktop:pack      # installateurs dans electron/dist/
```

- Options de fenêtre, raccourcis et splash : `electron/capacitor.electron.config.ts`
- Packaging (cibles dmg/n/nsis/AppImage/deb, signature) : `electron/electron-builder.config.js`
- Version du paquet : `electron/package.json`
- Le dossier `electron/` ne contient que la coque : le moteur s'installe dans
  `electron/node_modules` via le `postinstall` racine (`cd electron && npm ci`).

## Vérification après changement

```bash
npm run typecheck && npm run lint && npm test
npm run app:sync
```

## Structure ajoutée au projet

```
apps.config.ts            ← URL de production, appId, version (UN SEUL ENDROIT)
capacitor.config.ts       ← configuration Capacitor lue par les 3 plateformes
capacitor-web/index.html  ← bundle web minimal (ne sert qu'en cas d'URL manquante)
android/                  ← projet Android (Gradle)
ios/                      ← projet iOS (Xcode)
electron/                 ← projet desktop (Electron, capawesome)
scripts/android-gradle.sh ← lanceur Gradle avec JDK 21
```

## Limites connues (volontaires)

- L'app exige une **connexion réseau** vers le site hébergé : les mêmes règles
  du backend (sessions, SQLite locale au serveur) s'appliquent.
- Les fonctions nécessitant la géolocalisation ou la caméra demandent
  l'ajout de permissions natives (android `AndroidManifest.xml`, iOS `Info.plist`).
- Le microphone utilisé par la description vocale fonctionne dans la WebView
  via les permissions standard du site (HTTPS requis).
