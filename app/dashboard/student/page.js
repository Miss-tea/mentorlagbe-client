"use client";

import Link from "next/link";
import { FileText, CheckCircle2, Clock, Crown, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useApi } from "@/lib/useApi";
import StatCard from "@/components/dashboard/StatCard";

export default function StudentOverview() {
  const { data: session } = authClient.useSession();
  const { data, loading, error } = useApi("/api/stats/student");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Welcome back, {session?.user?.name?.split(" ")[0] || "there"} 👋</h1>
        <p className="mt-1 text-muted">Here is a quick look at your learning journey.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FileText} label="Total Applied Tuitions" value={data?.total} loading={loading} tone="coral" />
        <StatCard icon={CheckCircle2} label="Accepted Applications" value={data?.accepted} loading={loading} tone="mint" />
        <StatCard icon={Clock} label="Pending Applications" value={data?.pending} loading={loading} tone="sun" />
        <StatCard icon={Crown} label="Current Plan" value={data?.plan} loading={loading} tone="ink" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-fg">Find your next tutor</h2>
          <p className="mt-2 text-muted">Search hundreds of approved tuitions by subject, level and budget.</p>
          <Link href="/tuitions" className="btn btn-primary mt-5">Browse tuitions <ArrowRight size={18} /></Link>
        </div>

        {data?.plan === "free" && (
          <div className="rounded-3xl border-2 border-outline bg-ink p-6 text-white shadow-[6px_6px_0_0_var(--color-coral)]">
            <h2 className="text-xl font-bold">Upgrade to Pro</h2>
            <p className="mt-2 text-white/70">Unlimited bookmarks and priority booking with tutors for just $10.</p>
            <Link href="/pricing" className="btn btn-primary mt-5">See Pro plan</Link>
          </div>
        )}
      </div>
    </div>
  );
}
