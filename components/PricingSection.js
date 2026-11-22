"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";

const plans = {
  student: {
    price: 10,
    free: ["Browse and apply to unlimited tuitions", "Track application status", "Save up to 5 bookmarks"],
    pro: ["Everything in Free", "Unlimited bookmarks", "Priority booking with tutors", "Pro badge on your profile"],
  },
  tutor: {
    price: 15,
    free: ["Post up to 2 tuitions", "Manage student applicants", "Dashboard statistics"],
    pro: ["Everything in Free", "Unlimited tuition posts", "Verified tutor badge", "Higher visibility in search"],
  },
};

function Feature({ children }) {
  return (
    <li className="flex items-start gap-3 text-fg">
      <Check size={18} className="mt-0.5 shrink-0 text-mint" /> {children}
    </li>
  );
}

export default function PricingSection() {
  const [who, setWho] = useState("student");
  const p = plans[who];

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Pricing" title="Simple, honest plans" subtitle="Start free. Upgrade to Pro whenever you need more." />

        {/* Student / Tutor switch */}
        <div className="mx-auto mb-10 flex w-fit rounded-2xl border-2 border-outline bg-surface p-1">
          {["student", "tutor"].map((r) => (
            <button key={r} onClick={() => setWho(r)}
              className={`rounded-xl px-6 py-2 font-bold capitalize transition ${who === r ? "bg-coral text-white" : "text-muted"}`}>
              For {r}s
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="card flex h-full flex-col p-8">
            <h3 className="text-2xl font-bold text-fg">Free</h3>
            <p className="mt-2 font-heading text-5xl font-extrabold text-fg">$0<span className="text-base font-medium text-muted"> / forever</span></p>
            <ul className="mt-6 flex-1 space-y-3">{p.free.map((f) => <Feature key={f}>{f}</Feature>)}</ul>
            <Link href="/sign-up" className="btn btn-ghost mt-8">Get Started</Link>
          </div>

          <div className="relative flex h-full flex-col rounded-3xl border-2 border-outline bg-ink p-8 text-white shadow-[6px_6px_0_0_var(--color-coral)]">
            <span className="absolute -top-4 right-6 rounded-full bg-sun px-4 py-1 text-sm font-bold text-ink">Most popular</span>
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="mt-2 font-heading text-5xl font-extrabold">${p.price}<span className="text-base font-medium text-white/70"> / one-time</span></p>
            <ul className="mt-6 flex-1 space-y-3 [&_li]:text-white">{p.pro.map((f) => <Feature key={f}>{f}</Feature>)}</ul>
            {/* Phase 7 will turn this into a real Stripe checkout */}
            <Link href="/sign-up" className="btn btn-primary mt-8">Subscribe with Stripe</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
