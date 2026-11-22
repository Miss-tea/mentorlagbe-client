"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation (the assignment requires these three checks)
    if (form.name.trim().length < 2) return toast.error("Please enter your full name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Please enter a valid email");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      role: form.role,
    });
    setLoading(false);

    if (error) return toast.error(error.message || "Sign up failed");
    toast.success("Account created! Welcome to MentorLagbe 🎉");
    router.push("/dashboard");
    router.refresh();
  }

  const input = "w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 outline-none focus:border-[#FF6B4A]";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-[#1B1642]">Create your account</h1>

        <input name="name" placeholder="Full name" value={form.name} onChange={update} className={input} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={update} className={input} />
        <input name="password" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={update} className={input} />

        <div className="grid grid-cols-2 gap-3">
          {["student", "tutor"].map((r) => (
            <label key={r} className={`cursor-pointer rounded-xl border-2 p-3 text-center font-semibold capitalize ${form.role === r ? "border-[#FF6B4A] bg-[#FF6B4A]/10" : "border-indigo-100"}`}>
              <input type="radio" name="role" value={r} checked={form.role === r} onChange={update} className="hidden" />
              I am a {r}
            </label>
          ))}
        </div>

        <button disabled={loading} className="w-full rounded-xl bg-[#FF6B4A] py-3 font-bold text-white disabled:opacity-60">
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <p className="text-center text-sm">
          Already have an account? <Link href="/sign-in" className="font-semibold text-[#FF6B4A]">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
