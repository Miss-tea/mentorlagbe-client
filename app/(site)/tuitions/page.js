import TuitionCard from "@/components/TuitionCard";
import TuitionFilters from "@/components/TuitionFilters";
import Pagination from "@/components/Pagination";
import SectionHeading from "@/components/SectionHeading";
export const metadata = {
  title: "Browse Tuitions"
};
const API = process.env.NEXT_PUBLIC_API_URL;
const EMPTY = {
  tuitions: [],
  total: 0,
  page: 1,
  totalPages: 0
};
async function getTuitions(qs) {
  try {
    const res = await fetch(`${API}/api/tuitions?${qs}`, {
      cache: "no-store"
    });
    return res.ok ? await res.json() : EMPTY;
  } catch {
    return EMPTY;
  }
}
async function getOptions() {
  try {
    const res = await fetch(`${API}/api/tuitions/filters/options`, {
      cache: "no-store"
    });
    if (res.ok) return await res.json();
  } catch {}
  return {
    subjects: [],
    classLevels: [],
    modes: ["Online", "Offline"]
  };
}
const pick = v => (Array.isArray(v) ? v[0] : v) || "";
export default async function TuitionsPage({
  searchParams
}) {
  const sp = await searchParams;
  const current = {
    search: pick(sp.search),
    subject: pick(sp.subject),
    classLevel: pick(sp.classLevel),
    mode: pick(sp.mode),
    sort: pick(sp.sort)
  };
  const page = Math.max(parseInt(pick(sp.page)) || 1, 1);
  const qs = new URLSearchParams({
    limit: "9",
    page: String(page)
  });
  Object.entries(current).forEach(([k, v]) => v && qs.set(k, v));
  const [data, options] = await Promise.all([getTuitions(qs), getOptions()]);
  return <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Find your match" title="Browse Tuitions" subtitle="Search by title or subject, then narrow down by level, mode and budget." />

        <TuitionFilters options={options} current={current} />

        <p className="mb-6 mt-8 font-semibold text-muted">
          {data.total} {data.total === 1 ? "tuition" : "tuitions"} found
        </p>

        {data.tuitions.length === 0 ? <div className="card p-12 text-center">
            <p className="text-5xl">🔍</p>
            <h3 className="mt-4 text-xl font-bold text-fg">No tuitions match your filters</h3>
            <p className="mt-2 text-muted">Try a different keyword or clear some filters.</p>
          </div> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.tuitions.map(t => <TuitionCard key={t._id} tuition={t} />)}
          </div>}

        <Pagination page={data.page} totalPages={data.totalPages} current={current} />
      </div>
    </section>;
}
