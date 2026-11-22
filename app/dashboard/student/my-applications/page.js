"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function MyApplicationsPage() {
  const { data, loading, error, reload } = useApi("/api/applications/my");

  async function cancel(id) {
    if (!window.confirm("Cancel this application?")) return;
    try {
      await apiFetch(`/api/applications/${id}`, { method: "DELETE" });
      toast.success("Application cancelled");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  }

  const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">My Applications</h1>
        <p className="mt-1 text-muted">Track every tuition you have applied to.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-line" />)}
        </div>
      ) : data?.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-5xl">📭</p>
          <h3 className="mt-4 text-xl font-bold text-fg">No applications yet</h3>
          <p className="mt-2 text-muted">Find a tuition you like and apply in under a minute.</p>
          <Link href="/tuitions" className="btn btn-primary mt-6">Browse tuitions</Link>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-line text-sm text-muted">
              <tr>
                {["Tuition", "Tutor", "Monthly fee", "Applied", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((a) => (
                <tr key={a._id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <Link href={`/tuitions/${a.tuitionId}`} className="font-bold text-fg hover:text-coral">{a.tuitionTitle}</Link>
                    <p className="text-sm text-muted">{a.subject}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-fg">{a.tutorName}</p>
                    <p className="text-sm text-muted">{a.tutorEmail}</p>
                  </td>
                  <td className="px-5 py-4 font-bold text-fg">৳{a.monthlyFee?.toLocaleString("en-US")}</td>
                  <td className="px-5 py-4 text-muted">{fmt(a.appliedAt)}</td>
                  <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                  <td className="px-5 py-4 text-right">
                    {a.status === "pending" && (
                      <button onClick={() => cancel(a._id)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-coral hover:bg-coral/10">
                        <Trash2 size={16} /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
