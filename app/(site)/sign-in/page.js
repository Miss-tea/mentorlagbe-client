"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Please enter a valid email");
    if (!form.password) return toast.error("Please enter your password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: form.email, password: form.password });
    setLoading(false);

    if (error) return toast.error(error.message || "Invalid email or password");
    toast.success("Welcome back!");
    router.push("/dashboard");
    router.refresh();
  }

  const input = "w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 outline-none focus:border-[#FF6B4A]";

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FFF8F0] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-[#1B1642]">Welcome back</h1>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={update} className={input} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={update} className={input} />
        <button disabled={loading} className="w-full rounded-xl bg-[#FF6B4A] py-3 font-bold text-white disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-sm">
          New here? <Link href="/sign-up" className="font-semibold text-[#FF6B4A]">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
