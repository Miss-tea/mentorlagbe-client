"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import { taka, fmtDate } from "@/lib/format";
import StatusBadge from "@/components/dashboard/StatusBadge";

const tabs = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminTuitionsPage() {
  const [tab, setTab] = useState("pending");
  const { data, loading, error, reload } = useApi(`/api/admin/tuitions${tab ? `?status=${tab}` : ""}`);

  async function decide(id, approvalStatus) {
    try {
      await apiFetch(`/api/admin/tuitions/${id}/approval`, { method: "PATCH", body: JSON.stringify({ approvalStatus }) });
      toast.success(`Tuition ${approvalStatus}`);
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Tuition Approvals</h1>
        <p className="mt-1 text-muted">Only approved tuitions appear on the public site.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.label} onClick={() => setTab(t.value)}
            className={`rounded-full border-2 border-outline px-5 py-2 font-bold ${tab === t.value ? "bg-coral text-white" : "bg-surface text-fg"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-line" />)}</div>
      ) : data?.length === 0 ? (
        <div className="card p-12 text-center text-muted">Nothing here. 🎉</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-line text-sm text-muted">
              <tr>{["Tuition", "Tutor", "Fee", "Posted", "Status", "Decision"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t._id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.bannerImage} alt="" className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-fg">{t.title}</p>
                        <p className="text-sm text-muted">{t.subject} • {t.classLevel} • {t.mode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm"><p className="font-semibold text-fg">{t.tutorName}</p><p className="text-muted">{t.tutorEmail}</p></td>
                  <td className="px-5 py-4 font-bold text-fg">{taka(t.monthlyFee)}</td>
                  <td className="px-5 py-4 text-muted">{fmtDate(t.createdAt)}</td>
                  <td className="px-5 py-4"><StatusBadge status={t.approvalStatus} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => decide(t._id, "approved")} disabled={t.approvalStatus === "approved"} className="inline-flex items-center gap-1 rounded-xl bg-mint/40 px-3 py-2 text-sm font-bold text-fg disabled:opacity-40"><Check size={16} /> Approve</button>
                      <button onClick={() => decide(t._id, "rejected")} disabled={t.approvalStatus === "rejected"} className="inline-flex items-center gap-1 rounded-xl bg-coral/15 px-3 py-2 text-sm font-bold text-coral disabled:opacity-40"><X size={16} /> Reject</button>
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
