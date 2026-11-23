"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2, Power } from "lucide-react";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import { taka } from "@/lib/format";
import StatusBadge from "@/components/dashboard/StatusBadge";
export default function MyTuitionsPage() {
  const {
    data,
    loading,
    error,
    reload
  } = useApi("/api/tuitions/mine");
  async function toggle(id) {
    try {
      await apiFetch(`/api/tuitions/${id}/toggle`, {
        method: "PATCH"
      });
      toast.success("Status updated");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  }
  async function remove(id) {
    if (!window.confirm("Delete this tuition and all its applications? This cannot be undone.")) return;
    try {
      await apiFetch(`/api/tuitions/${id}`, {
        method: "DELETE"
      });
      toast.success("Tuition deleted");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  }
  return <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-fg">My Tuitions</h1>
          <p className="mt-1 text-muted">Edit, close or delete the tuitions you have posted.</p>
        </div>
        <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary btn-sm">+ New tuition</Link>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? <div className="space-y-3">{Array.from({
        length: 3
      }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-line" />)}</div> : data?.length === 0 ? <div className="card p-12 text-center">
          <p className="text-5xl">📚</p>
          <h3 className="mt-4 text-xl font-bold text-fg">You have not posted anything yet</h3>
          <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary mt-6">Post your first tuition</Link>
        </div> : <div className="card overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead className="border-b border-line text-sm text-muted">
              <tr>{["Tuition", "Fee", "Approval", "Status", "Actions"].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map(t => <tr key={t._id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {}
                      <img src={t.bannerImage} alt="" className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-fg">{t.title}</p>
                        <p className="text-sm text-muted">{t.subject} • {t.classLevel} • {t.mode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-fg">{taka(t.monthlyFee)}</td>
                  <td className="px-5 py-4"><StatusBadge status={t.approvalStatus} /></td>
                  <td className="px-5 py-4"><StatusBadge status={t.isActive ? "active" : "closed"} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => toggle(t._id)} title={t.isActive ? "Close this tuition" : "Reopen this tuition"} className="rounded-xl p-2 text-fg hover:bg-line"><Power size={18} /></button>
                      <Link href={`/dashboard/tutor/my-tuitions/${t._id}/edit`} title="Edit" className="rounded-xl p-2 text-fg hover:bg-line"><Pencil size={18} /></Link>
                      <button onClick={() => remove(t._id)} title="Delete" className="rounded-xl p-2 text-coral hover:bg-coral/10"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>;
}
