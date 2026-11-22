"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, Lock, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function ApplyBox({ tuition }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isStudent = user?.role === "student";

  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ phone: "", preferredSchedule: "", studentNote: "" });

  // When a student is logged in, ask the API whether they already applied
  useEffect(() => {
    if (!isStudent) return;
    apiFetch(`/api/applications/status/${tuition._id}`)
      .then((r) => setApplied(r.applied))
      .catch(() => {});
  }, [isStudent, tuition._id]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(form.phone.trim())) return toast.error("Enter a valid Bangladeshi phone number");
    if (form.preferredSchedule.trim().length < 3) return toast.error("Tell us your preferred schedule");

    setSaving(true);
    try {
      await apiFetch("/api/applications", {
        method: "POST",
        body: JSON.stringify({ tuitionId: tuition._id, ...form }),
      });
      toast.success("Application sent! The tutor will review it 🎉");
      setApplied(true);
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  const field = "w-full rounded-xl border-2 border-line bg-canvas px-4 py-3 text-fg outline-none focus:border-coral";

  return (
    <>
      <div className="card p-6 lg:sticky lg:top-28">
        <p className="text-sm font-semibold text-muted">Monthly fee</p>
        <p className="font-heading text-4xl font-extrabold text-fg">৳{tuition.monthlyFee?.toLocaleString("en-US")}</p>
        <p className="mt-1 text-sm text-muted">{tuition.daysPerWeek} days per week</p>

        <div className="mt-6">
          {isPending ? (
            <div className="h-12 animate-pulse rounded-2xl bg-line" />
          ) : !user ? (
            <>
              <Link href="/sign-in" className="btn btn-primary w-full">Sign in to apply</Link>
              <p className="mt-3 text-center text-sm text-muted">Only students can apply for tuitions.</p>
            </>
          ) : !isStudent ? (
            <>
              <button disabled className="btn btn-ghost w-full cursor-not-allowed opacity-50"><Lock size={16} /> Apply Now</button>
              <p className="mt-3 rounded-xl bg-sun/30 p-3 text-center text-sm font-semibold text-fg">
                You are signed in as a {user.role}. Only students can apply.
              </p>
            </>
          ) : applied ? (
            <p className="flex items-center justify-center gap-2 rounded-2xl bg-mint/30 p-4 font-bold text-fg">
              <CheckCircle2 size={20} /> You have applied
            </p>
          ) : (
            <button onClick={() => setOpen(true)} className="btn btn-primary w-full">Apply for Tuition</button>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 p-4" onClick={() => setOpen(false)}>
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg space-y-4 rounded-3xl border-2 border-outline bg-surface p-6 shadow-[6px_6px_0_0_var(--outline)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-fg">Apply for this tuition</h3>
                <p className="text-sm text-muted">{tuition.title}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1 text-muted hover:bg-line"><X /></button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input disabled value={user?.name || ""} className={`${field} opacity-60`} />
              <input disabled value={user?.email || ""} className={`${field} opacity-60`} />
            </div>
            <input name="phone" value={form.phone} onChange={update} placeholder="Phone (e.g. 01712345678)" className={field} />
            <input name="preferredSchedule" value={form.preferredSchedule} onChange={update} placeholder="Preferred schedule (e.g. Sat, Mon, Wed 7 PM)" className={field} />
            <textarea name="studentNote" value={form.studentNote} onChange={update} rows={3} maxLength={500} placeholder="Learning note: what do you want to improve?" className={field} />

            <button disabled={saving} className="btn btn-primary w-full disabled:opacity-60">
              {saving ? "Sending..." : "Submit Application"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
