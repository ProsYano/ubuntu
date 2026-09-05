import sharp from "sharp";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export async function prepareEquipmentImage(bytes: Uint8Array, mime: string) {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error("L’image doit peser au maximum 5 Mo.");
  if (!["image/jpeg", "image/png", "image/webp"].includes(mime)) throw new Error("Utilisez une image JPG, PNG ou WebP.");
  try {
    const image = sharp(bytes, { limitInputPixels: 40_000_000, animated: false });
    const info = await image.metadata();
    const formats = { "image/jpeg": "jpeg", "image/png": "png", "image/webp": "webp" };
    if (info.format !== formats[mime as keyof typeof formats] || (info.pages ?? 1) !== 1) throw new Error("invalid");
    return await image.rotate().resize({ width: 1920, height: 1440, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  } catch { throw new Error("Cette image est illisible ou trop volumineuse. Choisissez un autre fichier JPG, PNG ou WebP."); }
}
