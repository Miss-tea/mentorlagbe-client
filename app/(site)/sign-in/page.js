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

  const input = "w-full rounded-xl border-2 border-line bg-canvas px-4 py-3 text-fg outline-none focus:border-coral";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-3xl border border-line bg-surface p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-fg">Welcome back</h1>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={update} className={input} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={update} className={input} />
        <button disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-sm">
          New here? <Link href="/sign-up" className="font-semibold text-coral">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
