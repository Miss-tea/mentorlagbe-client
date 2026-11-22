"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import TuitionForm from "@/components/dashboard/TuitionForm";

export default function PostTuitionPage() {
  const router = useRouter();
  const { data: stats } = useApi("/api/stats/tutor");
  const isFree = stats?.plan === "free";
  const limitReached = isFree && stats.total >= 2;

  async function create(values) {
    await apiFetch("/api/tuitions", { method: "POST", body: JSON.stringify(values) });
    toast.success("Submitted! An admin will review it soon 🎉");
    router.push("/dashboard/tutor/my-tuitions");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Post a Tuition</h1>
        <p className="mt-1 text-muted">Describe your batch or 1-on-1 mentorship clearly to attract the right students.</p>
      </div>

      {isFree && (
        <p className={`max-w-4xl rounded-2xl p-4 font-semibold ${limitReached ? "bg-coral/10 text-coral" : "bg-sun/30 text-fg"}`}>
          {limitReached ? (
            <>You have used all 2 free posts. <Link href="/pricing" className="underline">Upgrade to Pro</Link> for unlimited posts.</>
          ) : (
            <>Free plan: {stats.total} of 2 posts used.</>
          )}
        </p>
      )}

      <TuitionForm submitLabel="Submit for approval" onSubmit={create} />
    </div>
  );
}
