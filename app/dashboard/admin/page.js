"use client";

import { Users, GraduationCap, Clock, BadgeCheck, DollarSign } from "lucide-react";
import { useApi } from "@/lib/useApi";
import StatCard from "@/components/dashboard/StatCard";

export default function AdminOverview() {
  const { data, loading, error } = useApi("/api/admin/stats");

  const total = (data?.pending || 0) + (data?.approved || 0);
  const approvedPct = total ? Math.round((data.approved / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Admin Overview</h1>
        <p className="mt-1 text-muted">Platform statistics at a glance.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={Users} label="Total Users" value={data?.totalUsers} loading={loading} tone="coral" />
        <StatCard icon={GraduationCap} label="Total Tutors" value={data?.totalTutors} loading={loading} tone="mint" />
        <StatCard icon={DollarSign} label="Total Stripe Revenue" value={`$${data?.revenue ?? 0}`} loading={loading} tone="ink" />
        <StatCard icon={Clock} label="Pending Tuitions" value={data?.pending} loading={loading} tone="sun" />
        <StatCard icon={BadgeCheck} label="Approved Tuitions" value={data?.approved} loading={loading} tone="mint" />
      </div>

      <div className="card max-w-2xl p-6">
        <h2 className="text-xl font-bold text-fg">Pending vs Approved</h2>
        <div className="mt-4 h-4 overflow-hidden rounded-full bg-sun/50">
          <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${approvedPct}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-sm font-semibold text-muted">
          <span>{data?.approved ?? 0} approved ({approvedPct}%)</span>
          <span>{data?.pending ?? 0} pending</span>
        </div>
      </div>
    </div>
  );
}
