"use client";

import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import { fmtDate } from "@/lib/format";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function ApplicantsPage() {
  const { data, loading, error, reload } = useApi("/api/applications/received");

  async function setStatus(id, status) {
    try {
      await apiFetch(`/api/applications/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast.success(`Application ${status}`);
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Applicants</h1>
        <p className="mt-1 text-muted">Students who applied to your tuitions.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-line" />)}</div>
      ) : data?.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-5xl">📬</p>
          <h3 className="mt-4 text-xl font-bold text-fg">No applicants yet</h3>
          <p className="mt-2 text-muted">Once your tuitions are approved, applications will show up here.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="border-b border-line text-sm text-muted">
              <tr>{["Student", "Contact", "Tuition", "Schedule and note", "Status", "Decision"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a._id} className="border-b border-line align-top last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-bold text-fg">{a.studentName}</p>
                    <p className="text-sm text-muted">{fmtDate(a.appliedAt)}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-fg">
                    <p>{a.studentEmail}</p>
                    <p className="text-muted">{a.studentPhone}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-fg">{a.tuitionTitle}</td>
                  <td className="max-w-[240px] px-5 py-4 text-sm">
                    <p className="font-semibold text-fg">{a.preferredSchedule}</p>
                    <p className="mt-1 line-clamp-2 text-muted" title={a.studentNote}>{a.studentNote || "No note"}</p>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setStatus(a._id, "accepted")} disabled={a.status === "accepted"} className="inline-flex items-center gap-1 rounded-xl bg-mint/40 px-3 py-2 text-sm font-bold text-fg disabled:opacity-40"><Check size={16} /> Accept</button>
                      <button onClick={() => setStatus(a._id, "rejected")} disabled={a.status === "rejected"} className="inline-flex items-center gap-1 rounded-xl bg-coral/15 px-3 py-2 text-sm font-bold text-coral disabled:opacity-40"><X size={16} /> Reject</button>
                    </div>
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
