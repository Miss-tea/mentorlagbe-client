import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TuitionCard from "../TuitionCard";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

async function getLatest() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions?limit=6`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.tuitions || [];
  } catch {
    return [];
  }
}

export default async function FeaturedTuitions() {
  const tuitions = await getLatest();

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Fresh listings" title="Latest Tuitions & Mentorship Batches" subtitle="Hand-picked, admin-approved listings from tutors who are ready to teach." />

        {tuitions.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line p-10 text-center text-muted">
            No tuitions to show right now. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((t, i) => (
              <Reveal key={t._id} delay={i * 0.06} className="h-full">
                <TuitionCard tuition={t} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/tuitions" className="btn btn-dark">Browse all tuitions <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
