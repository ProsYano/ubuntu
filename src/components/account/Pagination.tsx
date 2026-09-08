import Link from "next/link";
export function Pagination({ page, total, base, size = 20 }: { page: number; total: number; base: string; size?: number }) {
  const pages = Math.max(1, Math.ceil(total / size));
  const href = (value: number) => `${base}${base.includes("?") ? "&" : "?"}page=${value}`;
  return pages > 1 || page > 1 ? <nav className="pagination" aria-label="Pagination">{page > 1 && <Link href={href(page - 1)}>← Précédent</Link>}<span>Page {page} · {total} résultat{total === 1 ? "" : "s"}</span>{page < pages && <Link href={href(page + 1)}>Suivant →</Link>}</nav> : null;
}
