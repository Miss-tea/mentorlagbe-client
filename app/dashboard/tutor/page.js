"use client";

import Link from "next/link";
import { BookOpen, BadgeCheck, Users, Crown, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useApi } from "@/lib/useApi";
import StatCard from "@/components/dashboard/StatCard";

export default function TutorOverview() {
  const { data: session } = authClient.useSession();
  const { data, loading, error } = useApi("/api/stats/tutor");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Hello, {session?.user?.name?.split(" ")[0] || "tutor"} 👋</h1>
        <p className="mt-1 text-muted">Here is how your tuitions are doing.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpen} label="Total Tuitions Posted" value={data?.total} loading={loading} tone="coral" />
        <StatCard icon={BadgeCheck} label="Active / Approved" value={data?.active} loading={loading} tone="mint" />
        <StatCard icon={Users} label="Applicants Received" value={data?.applicants} loading={loading} tone="sun" />
        <StatCard icon={Crown} label="Current Plan" value={data?.plan} loading={loading} tone="ink" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-fg">Reach more students</h2>
          <p className="mt-2 text-muted">Post a new tuition. An admin reviews it before it goes public.</p>
          <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary mt-5"><Plus size={18} /> Post a tuition</Link>
        </div>

        {data?.plan === "free" && (
          <div className="rounded-3xl border-2 border-outline bg-ink p-6 text-white shadow-[6px_6px_0_0_var(--color-coral)]">
            <h2 className="text-xl font-bold">Go Pro for $15</h2>
            <p className="mt-2 text-white/70">Unlimited tuition posts and a verified tutor badge.</p>
            <Link href="/pricing" className="btn btn-primary mt-5">See Pro plan</Link>
          </div>
        )}
      </div>
    </div>
  );
}
