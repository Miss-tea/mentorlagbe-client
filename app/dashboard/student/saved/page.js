"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import TuitionCard from "@/components/TuitionCard";

export default function SavedTuitionsPage() {
  const { data, loading, error, reload } = useApi("/api/bookmarks");

  async function remove(id) {
    try {
      await apiFetch(`/api/bookmarks/${id}`, { method: "DELETE" });
      toast.success("Removed from saved");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Saved Tuitions</h1>
        <p className="mt-1 text-muted">
          {data?.limit ? `${data.tuitions.length} of ${data.limit} saved on the Free plan.` : "Your favourite tuitions in one place."}
          {data?.limit && <> <Link href="/pricing" className="font-bold text-coral">Go Pro</Link> for unlimited.</>}
        </p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-line" />)}
        </div>
      ) : data?.tuitions.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-5xl">🤍</p>
          <h3 className="mt-4 text-xl font-bold text-fg">Nothing saved yet</h3>
          <p className="mt-2 text-muted">Tap “Save for later” on any tuition to keep it here.</p>
          <Link href="/tuitions" className="btn btn-primary mt-6">Browse tuitions</Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.tuitions.map((t) => (
            <div key={t._id} className="flex flex-col gap-3">
              <div className="flex-1"><TuitionCard tuition={t} /></div>
              <button onClick={() => remove(t._id)} className="btn btn-ghost btn-sm">
                <Heart size={16} className="fill-coral text-coral" /> Remove from saved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}