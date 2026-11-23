import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
function pageList(page, total) {
  const keep = [...new Set([1, total, page - 1, page, page + 1])].filter(p => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  keep.forEach((p, i) => {
    if (i > 0 && p - keep[i - 1] > 1) out.push("...");
    out.push(p);
  });
  return out;
}
export default function Pagination({
  page,
  totalPages,
  current
}) {
  if (totalPages <= 1) return null;
  const href = p => {
    const qs = new URLSearchParams();
    Object.entries(current).forEach(([k, v]) => v && qs.set(k, v));
    if (p > 1) qs.set("page", String(p));
    const query = qs.toString();
    return `/tuitions${query ? `?${query}` : ""}`;
  };
  const base = "grid h-11 min-w-11 place-items-center rounded-xl border-2 border-outline px-3 font-bold";
  return <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? <Link href={href(page - 1)} className={`${base} bg-surface text-fg hover:bg-sun/40`}><ChevronLeft size={18} /> </Link> : <span className={`${base} opacity-40`}><ChevronLeft size={18} /></span>}

      {pageList(page, totalPages).map((p, i) => p === "..." ? <span key={`dots-${i}`} className="px-1 text-muted">…</span> : <Link key={p} href={href(p)} className={`${base} ${p === page ? "bg-coral text-white" : "bg-surface text-fg hover:bg-sun/40"}`}>
            {p}
          </Link>)}

      {page < totalPages ? <Link href={href(page + 1)} className={`${base} bg-surface text-fg hover:bg-sun/40`}><ChevronRight size={18} /></Link> : <span className={`${base} opacity-40`}><ChevronRight size={18} /></span>}
    </nav>;
}
