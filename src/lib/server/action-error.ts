import { z } from "zod";
import { BusinessError } from "./store";
import type { ActionState } from "../equipment-schema";
export function actionError(error: unknown): ActionState {
  if (error instanceof BusinessError) return { error: error.message };
  if (error instanceof z.ZodError) return { error: "Vérifiez les champs du formulaire.", fields: error.flatten().fieldErrors };
  console.error("Échec d’une opération de stockage", error instanceof Error ? error.name : "UnknownError");
  return { error: "L’opération n’a pas pu être enregistrée. Réessayez dans quelques instants." };
}
