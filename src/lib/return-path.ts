export function returnPath(value: unknown) {
  return typeof value === "string" && /^\/compte\/(commandes\/nouvelle(?:\?engin=[a-f0-9-]{36})?|messages\/nouveau)$/.test(value) ? value : "/compte";
}
