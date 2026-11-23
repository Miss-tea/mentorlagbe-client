import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, GraduationCap, CalendarDays, MapPin, Wifi, BadgeCheck } from "lucide-react";
import ApplyBox from "@/components/ApplyBox";

async function getTuition(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/${id}`, { cache: "no-store" });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export default async function TuitionDetailsPage({ params }) {
  const { id } = await params; // params is a Promise in current Next.js
  const t = await getTuition(id);
  if (!t) notFound();

  const tutor = t.tutor ?? {
    name: t.tutorName,
    email: t.tutorEmail,
    image: t.tutorImage,
    bio: t.tutorBio,
    verified: t.tutorVerified,
  };

  const online = t.mode === "Online";
  const facts = [
    { icon: BookOpen, label: "Subject", value: t.subject },
    { icon: GraduationCap, label: "Class level", value: t.classLevel },
    { icon: CalendarDays, label: "Schedule", value: `${t.daysPerWeek} days / week` },
    { icon: online ? Wifi : MapPin, label: online ? "Mode" : "Location", value: online ? `Online (${t.location})` : `Offline (${t.location})` },
  ];

  return (
    <section className="section">
      <div className="container-x">
        <Link href="/tuitions" className="mb-6 inline-flex items-center gap-2 font-semibold text-muted hover:text-coral">
          <ArrowLeft size={18} /> Back to all tuitions
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border-2 border-outline shadow-[6px_6px_0_0_var(--outline)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.bannerImage} alt={t.title} className="h-64 w-full object-cover sm:h-96" />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-fg sm:text-4xl">{t.title}</h1>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="card flex items-center gap-4 p-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral/15 text-coral"><f.icon size={22} /></span>
                    <div>
                      <p className="text-sm text-muted">{f.label}</p>
                      <p className="font-bold text-fg">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-10 text-2xl font-extrabold text-fg">About this tuition</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{t.description}</p>
            </div>

            {/* Tutor summary */}
            <div className="card flex items-center gap-5 p-6">
              {tutor?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tutor.image} alt={tutor.name || "Tutor"} className="h-16 w-16 rounded-full border-2 border-outline object-cover" />
              ) : (
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-outline bg-sun font-heading text-2xl font-extrabold text-ink">
                  {tutor?.name?.[0] || "T"}
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-muted">Your tutor</p>
                <p className="flex items-center gap-2 text-xl font-bold text-fg">
                  {tutor?.name || "Tutor"}
                  {tutor?.verified && <BadgeCheck className="text-mint" size={20} title="Verified tutor" />}
                </p>
                {tutor?.bio && <p className="mt-1 text-muted">{tutor.bio}</p>}
              </div>
            </div>
          </div>

          <aside>
            <ApplyBox tuition={t} />
          </aside>
        </div>
      </div>
    </section>
  );
}
