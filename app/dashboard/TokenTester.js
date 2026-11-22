"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TokenTester() {
  const router = useRouter();
  const [result, setResult] = useState(null);

  // 1) ask Better Auth for a JWT  2) send it to Express as a Bearer token
  async function callApi(path) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) return toast.error("Could not get a JWT");
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    setResult({ status: res.status, body: await res.json() });
  }

  async function tryToBecomeAdmin() {
    const { error } = await authClient.updateUser({ role: "admin" });
    if (error) toast.success("Blocked ✅ " + error.message);
    else toast.error("⚠️ That worked. It should not have! Tell me.");
  }

  async function signOut() {
    await authClient.signOut();
    toast.success("Signed out");
    router.push("/sign-in");
    router.refresh();
  }

  const btn = "rounded-xl px-4 py-2 font-semibold text-white";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button onClick={() => callApi("/api/me")} className={`${btn} bg-[#1B1642]`}>Test API: who am I?</button>
        <button onClick={() => callApi("/api/me/admin-only")} className={`${btn} bg-[#1B1642]`}>Test API: admin only</button>
        <button onClick={tryToBecomeAdmin} className={`${btn} bg-[#FF6B4A]`}>Try to make myself admin</button>
        <button onClick={signOut} className={`${btn} bg-gray-500`}>Sign out</button>
      </div>
      {result && (
        <pre className="overflow-auto rounded-xl bg-gray-100 p-4 text-sm">
          {result.status} {JSON.stringify(result.body, null, 2)}
        </pre>
      )}
    </div>
  );
}
