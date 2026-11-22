"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SUBJECTS, CLASS_LEVELS } from "@/lib/constants";

const EMPTY = {
  title: "", subject: "", classLevel: "", mode: "Online", location: "",
  monthlyFee: "", daysPerWeek: "3", bannerImage: "", description: "",
};

export default function TuitionForm({ initial, submitLabel, onSubmit }) {
  // Keep only the fields the form knows about (an edited tuition also carries _id, dates, etc.)
  const start = Object.fromEntries(Object.keys(EMPTY).map((k) => [k, initial?.[k] ?? EMPTY[k]]));
  const [form, setForm] = useState(start);
  const [saving, setSaving] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const fee = Number(form.monthlyFee);

    if (form.title.trim().length < 5) return toast.error("Title must be at least 5 characters");
    if (!form.subject) return toast.error("Please choose a subject");
    if (!form.classLevel) return toast.error("Please choose a class level");
    if (form.location.trim().length < 2) return toast.error("Please enter a location or platform");
    if (!fee || fee < 100) return toast.error("Monthly fee must be at least 100");
    if (!/^https?:\/\/\S+$/i.test(form.bannerImage.trim())) return toast.error("Banner image must be a valid link starting with http");
    if (form.description.trim().length < 20) return toast.error("Description must be at least 20 characters");

    setSaving(true);
    try {
      await onSubmit({ ...form, monthlyFee: fee, daysPerWeek: Number(form.daysPerWeek) });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  const field = "w-full rounded-xl border-2 border-line bg-canvas px-4 py-3 text-fg outline-none focus:border-coral";
  const label = "mb-1 block text-sm font-bold text-fg";

  return (
    <form onSubmit={submit} className="card max-w-4xl space-y-5 p-6 sm:p-8">
      <div>
        <label className={label}>Title</label>
        <input name="title" value={form.title} onChange={update} placeholder="e.g. HSC Physics Crash Batch" className={field} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Subject</label>
          <select name="subject" value={form.subject} onChange={update} className={field}>
            <option value="">Choose a subject</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Class level</label>
          <select name="classLevel" value={form.classLevel} onChange={update} className={field}>
            <option value="">Choose a level</option>
            {CLASS_LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Mode</label>
          <select name="mode" value={form.mode} onChange={update} className={field}>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>
        <div>
          <label className={label}>{form.mode === "Online" ? "Platform (Zoom, Meet...)" : "Location (area, city)"}</label>
          <input name="location" value={form.location} onChange={update} placeholder={form.mode === "Online" ? "Zoom" : "Dhanmondi, Dhaka"} className={field} />
        </div>
        <div>
          <label className={label}>Monthly fee (৳)</label>
          <input name="monthlyFee" type="number" min="100" value={form.monthlyFee} onChange={update} placeholder="2500" className={field} />
        </div>
        <div>
          <label className={label}>Days per week</label>
          <select name="daysPerWeek" value={form.daysPerWeek} onChange={update} className={field}>
            {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Banner image link</label>
        <input name="bannerImage" value={form.bannerImage} onChange={update} placeholder="https://picsum.photos/seed/mytuition/800/500" className={field} />
        <p className="mt-1 text-xs text-muted">Paste an image link for now. In Phase 8 this becomes a real file upload.</p>
        {/^https?:\/\/\S+$/i.test(form.bannerImage.trim()) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.bannerImage} alt="Banner preview" className="mt-3 h-40 w-full max-w-sm rounded-2xl border-2 border-outline object-cover" />
        )}
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea name="description" value={form.description} onChange={update} rows={5} maxLength={1500} placeholder="What will students learn? How do your sessions work?" className={field} />
      </div>

      <button disabled={saving} className="btn btn-primary disabled:opacity-60">
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
