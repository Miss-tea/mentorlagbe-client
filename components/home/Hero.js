"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, GraduationCap, Star, BadgeCheck, BookOpen } from "lucide-react";

const chips = ["Math", "Physics", "Programming", "IELTS"];

// Gentle up-and-down floating motion
const float = (delay = 0) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient-mesh background: three blurred color blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-coral/25 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-mint/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sun/30 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">🎓 Smart tuition & mentorship platform</span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Find Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Ideal Tutor</span>
              {/* hand-drawn underline */}
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none">
                <path d="M3 9 C 60 2, 120 14, 180 6 S 270 4, 297 9" stroke="#FFC857" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>{" "}
            or Mentorship Batch Today
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted">
            Compare verified tutors by subject, class level, mode and monthly budget, then apply in under a minute.
          </p>

          {/* A normal HTML form: submitting goes to /tuitions?search=... */}
          <form action="/tuitions" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                name="search"
                placeholder="Try “Python” or “IELTS”"
                className="w-full rounded-2xl border-2 border-outline bg-surface py-3 pl-12 pr-4 text-fg outline-none focus:border-coral"
              />
            </div>
            <button className="btn btn-primary">Find Tutors</button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted">Popular:</span>
            {chips.map((c) => (
              <Link key={c} href={`/tuitions?subject=${c}`} className="rounded-full border border-line bg-surface px-3 py-1 font-semibold text-fg transition hover:border-coral hover:text-coral">
                {c}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Illustration made from floating cards (no image files needed) */}
        <div className="relative mx-auto hidden h-[440px] w-full max-w-md lg:block">
          <motion.div {...float(0)} className="absolute left-6 top-8 w-72 rounded-3xl border-2 border-outline bg-surface p-6 shadow-[6px_6px_0_0_var(--outline)]">
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-coral text-white">
              <GraduationCap size={28} />
            </div>
            <p className="font-heading text-xl font-bold text-fg">HSC Higher Math 1-on-1</p>
            <p className="mt-1 text-sm text-muted">Tanvir Hasan • Dhanmondi</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-coral">৳4,000/mo</span>
              <span className="rounded-full bg-mint/40 px-3 py-1 text-xs font-bold text-fg">Offline</span>
            </div>
          </motion.div>

          <motion.div {...float(1)} className="absolute right-0 top-0 flex items-center gap-2 rounded-2xl border-2 border-outline bg-sun px-4 py-3 font-bold text-ink shadow-[4px_4px_0_0_var(--outline)]">
            <Star size={18} fill="currentColor" /> 4.9 average rating
          </motion.div>

          <motion.div {...float(2)} className="absolute bottom-24 right-0 flex items-center gap-2 rounded-2xl border-2 border-outline bg-mint px-4 py-3 font-bold text-ink shadow-[4px_4px_0_0_var(--outline)]">
            <BadgeCheck size={18} /> Verified tutors
          </motion.div>

          <motion.div {...float(0.5)} className="absolute bottom-6 left-0 flex items-center gap-2 rounded-2xl border-2 border-outline bg-surface px-4 py-3 font-bold text-fg shadow-[4px_4px_0_0_var(--outline)]">
            <BookOpen size={18} className="text-coral" /> 12+ subjects
          </motion.div>
        </div>
      </div>
    </section>
  );
}
