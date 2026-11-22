"use client";

import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const sortOptions = [
  { value: "", label: "Newest first" },
  { value: "fee-low", label: "Fee: low to high" },
  { value: "fee-high", label: "Fee: high to low" },
];

export default function TuitionFilters({ options, current }) {
  const router = useRouter();

  // Merge the change into the current filters and go to that URL (back to page 1)
  function go(updates) {
    const next = { ...current, ...updates };
    const qs = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value) qs.set(key, value);
    });
    const query = qs.toString();
    router.push(`/tuitions${query ? `?${query}` : ""}`, { scroll: false });
  }

  const hasFilters = Object.values(current).some(Boolean);
  const select = "w-full rounded-2xl border-2 border-outline bg-surface px-4 py-3 font-semibold text-fg outline-none focus:border-coral";

  return (
    <div className="card space-y-4 p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go({ search: e.currentTarget.elements.search.value.trim() });
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input
            key={current.search} // resets the box when filters are cleared
            name="search"
            defaultValue={current.search}
            placeholder="Search by title or subject..."
            className="w-full rounded-2xl border-2 border-outline bg-surface py-3 pl-12 pr-4 text-fg outline-none focus:border-coral"
          />
        </div>
        <button className="btn btn-primary">Search</button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select value={current.subject} onChange={(e) => go({ subject: e.target.value })} className={select}>
          <option value="">All subjects</option>
          {options.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select value={current.classLevel} onChange={(e) => go({ classLevel: e.target.value })} className={select}>
          <option value="">All class levels</option>
          {options.classLevels.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={current.mode} onChange={(e) => go({ mode: e.target.value })} className={select}>
          <option value="">Online and Offline</option>
          {options.modes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={current.sort} onChange={(e) => go({ sort: e.target.value })} className={select}>
          {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {hasFilters && (
        <button onClick={() => router.push("/tuitions", { scroll: false })} className="inline-flex items-center gap-1 text-sm font-bold text-coral">
          <X size={16} /> Clear all filters
        </button>
      )}
    </div>
  );
}
