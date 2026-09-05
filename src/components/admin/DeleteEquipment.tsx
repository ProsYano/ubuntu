"use client";
import { useActionState, useState } from "react";
import { trashEquipment, restoreEquipment } from "@/app/gestion/engins/actions";
import type { ActionState } from "@/lib/equipment-schema";
export function DeleteEquipment({ id, name, version, deleted = false }: {id: string; name: string; version: string; deleted?: boolean}) {
  const [confirm, setConfirm] = useState(false);
  const [state, action, pending] = useActionState<ActionState, FormData>(deleted ? restoreEquipment : trashEquipment, {});
  return <div className="delete-control">{deleted || confirm ? <form action={action}><input type="hidden" name="id" value={id}/><input type="hidden" name="version" value={version}/>{!deleted && <p>Retirer « {name} » du site ? La fiche restera récupérable dans la corbeille.</p>}<div className="actions"><button className={deleted ? "button button-neutral" : "button button-danger"} disabled={pending}>{pending ? "Veuillez patienter…" : deleted ? "Restaurer en brouillon" : "Confirmer la suppression"}</button>{!deleted && <button type="button" className="button button-neutral" disabled={pending} onClick={() => setConfirm(false)}>Annuler</button>}</div>{state.error && <p role="alert" className="form-error">{state.error}</p>}</form> : <button className="delete-link" type="button" onClick={() => setConfirm(true)}>Supprimer</button>}</div>;
}
