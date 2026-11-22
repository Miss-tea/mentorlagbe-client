"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ImageUpload from "./ImageUpload";

export default function ProfileForm({ user }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    bio: user.bio || "",
    image: user.image || "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Name must be at least 2 characters");
    if (form.phone && !/^(\+?88)?01[3-9]\d{8}$/.test(form.phone.trim())) return toast.error("Enter a valid phone number");
    if (form.image && !/^https?:\/\/.+/i.test(form.image.trim())) return toast.error("Image must be a valid http(s) link");

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: form.name.trim(),
      phone: form.phone.trim(),
      bio: form.bio.trim(),
      image: form.image.trim(),
    });
    setSaving(false);

    if (error) return toast.error(error.message || "Could not update profile");
    toast.success("Profile updated ✨");
    router.refresh(); // re-render server components so the sidebar and navbar show the new data
  }

  const field = "w-full rounded-xl border-2 border-line bg-canvas px-4 py-3 text-fg outline-none focus:border-coral";
  const label = "mb-1 block text-sm font-bold text-fg";

  return (
    <form onSubmit={submit} className="card max-w-3xl space-y-5 p-6 sm:p-8">
      <div className="flex items-center gap-5">
        {form.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image} alt="Preview" className="h-20 w-20 rounded-full border-2 border-outline object-cover" />
        ) : (
          <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-outline bg-coral font-heading text-3xl font-extrabold text-white">
            {form.name?.[0]?.toUpperCase() || "?"}
          </span>
        )}
        <div>
          <p className="text-xl font-bold text-fg">{user.name}</p>
          <p className="text-sm capitalize text-muted">{user.role} • {user.plan} plan</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Full name</label>
          <input name="name" value={form.name} onChange={update} className={field} />
        </div>
        <div>
          <label className={label}>Email (cannot be changed)</label>
          <input value={user.email} disabled className={`${field} opacity-60`} />
        </div>
        <div>
          <label className={label}>Phone</label>
          <input name="phone" value={form.phone} onChange={update} placeholder="01712345678" className={field} />
        </div>
      </div>

      <div>
        <label className={label}>Profile picture</label>
        <ImageUpload round value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} label="Upload photo" />
      </div>

      <div>
        <label className={label}>Bio</label>
        <textarea name="bio" value={form.bio} onChange={update} rows={4} maxLength={300} placeholder="Tell others a little about yourself..." className={field} />
      </div>

      <button disabled={saving} className="btn btn-primary disabled:opacity-60">
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
