import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { loadEnvConfig } from "@next/env";
import { openDatabase } from "../src/lib/server/database";
import { Store } from "../src/lib/server/store";
import { hashPassword } from "../src/lib/server/passwords";
import { emailSchema, passwordSchema, registrationSchema, type Role } from "../src/lib/workflow-schema";

async function main() {
  loadEnvConfig(process.cwd());
  const [command, rawEmail, rawName] = process.argv.slice(2);
  if (!["create-admin", "create-agent", "create-client", "reset"].includes(command) || !rawEmail) throw new Error('Usage : npm run account -- create-admin|create-agent|create-client adresse@email.fr "Nom" ; ou npm run account -- reset adresse@email.fr');
  const email = emailSchema.parse(rawEmail);
  const db = openDatabase(), store = new Store(db);
  try {
    if (command === "reset") {
      const user = store.credentials(email);
      if (!user?.active) throw new Error("Compte actif introuvable.");
      const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const link = new URL("/reinitialiser-mot-de-passe", base);
      link.searchParams.set("token", store.issueReset(user.id));
      console.log("Lien confidentiel valable 30 minutes. Remettez-le uniquement au titulaire après vérification de son identité :\n" + link.href);
      return;
    }
    if (store.credentials(email)) throw new Error("Ce compte existe déjà. Aucun accès n’a été modifié.");
    if (!process.stdin.isTTY) throw new Error("Exécutez cette commande dans un terminal interactif pour saisir le mot de passe sans l’afficher.");
    let muted = false;
    const output = new Writable({ write(chunk, _encoding, done) { if (!muted) process.stdout.write(chunk); done(); } });
    const rl = createInterface({ input: process.stdin, output, terminal: true });
    let password: string;
    try {
      process.stdout.write("Mot de passe (12 caractères minimum, saisie masquée) : "); muted = true;
      password = await rl.question("");
      process.stdout.write("\nConfirmez le mot de passe : ");
      const confirmation = await rl.question("");
      process.stdout.write("\n");
      if (password !== confirmation) throw new Error("Les mots de passe ne correspondent pas.");
    } finally { muted = false; rl.close(); }
    passwordSchema.parse(password);
    const input = registrationSchema.parse({ name: rawName, email, password });
    const role = command.replace("create-", "") as Role;
    const user = store.createUser(input.name, input.email, await hashPassword(input.password), role);
    store.audit(null, `operator.created-${role}`, user.id);
    console.log(`Compte ${role} créé. Connexion disponible sur /connexion.`);
  } finally { db.close(); }
}
main().catch(error => { console.error(error instanceof Error ? error.message : "Échec de l’opération."); process.exitCode = 1; });
