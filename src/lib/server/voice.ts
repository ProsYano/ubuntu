import { BusinessError } from "./store";

export async function readVoice(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || !value.size) return undefined;
  if (value.size > 4 * 1024 * 1024) throw new BusinessError("Le message vocal doit peser moins de 4 Mo.");
  const type = value.type.split(";")[0];
  const bytes = Buffer.from(await value.arrayBuffer());
  const valid = (type === "audio/webm" && bytes.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])))
    || (type === "audio/ogg" && bytes.subarray(0, 4).toString() === "OggS")
    || (type === "audio/mp4" && bytes.subarray(4, 8).toString() === "ftyp");
  if (!valid) throw new BusinessError("Format du message vocal invalide. Merci de réenregistrer votre message.");
  return { bytes, type };
}
