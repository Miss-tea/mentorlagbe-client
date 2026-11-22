import Link from "next/link";
import { Wifi, MapPin, User } from "lucide-react";

export default function TuitionCard({ tuition: t }) {
  const online = t.mode === "Online";
  return (
    <article className="card flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 w-full bg-line">
        {t.bannerImage && (
          // Plain <img> on purpose: tutors can paste image URLs from ANY website
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.bannerImage} alt={t.title} loading="lazy" className="h-full w-full object-cover" />
        )}
        <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-ink ${online ? "bg-mint" : "bg-sun"}`}>
          {online ? <Wifi size={12} /> : <MapPin size={12} />} {t.mode}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-coral/15 px-3 py-1 text-coral">{t.subject}</span>
          <span className="rounded-full bg-line px-3 py-1 text-fg">{t.classLevel}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-14 text-lg font-bold text-fg">{t.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted"><User size={14} /> {t.tutorName}</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-heading text-xl font-extrabold text-fg">
            ৳{t.monthlyFee?.toLocaleString("en-US")}<span className="text-sm font-medium text-muted">/mo</span>
          </p>
          <Link href={`/tuitions/${t._id}`} className="btn btn-primary btn-sm">View Details</Link>
        </div>
      </div>
    </article>
  );
}
