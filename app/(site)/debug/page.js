"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

async function probe(path, token) {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const text = await res.text();
    return `${res.status} ${text.slice(0, 160)}`;
  } catch (err) {
    return `FAILED: ${err.message}`;
  }
}

export default function DebugPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await authClient.token();
      const token = data?.token;
      setRows([
        ["API address in this build", String(API)],
        ["Got a JWT from Better Auth?", token ? "yes" : "NO"],
        ["GET /api/tuitions", await probe("/api/tuitions?limit=1")],
        ["GET /api/me (needs login)", await probe("/api/me", token)],
        ["GET /api/stats/student", await probe("/api/stats/student", token)],
      ]);
    })();
  }, []);

  return (
    <div className="container-x py-12">
      <h1 className="text-3xl font-extrabold text-fg">Debug</h1>
      <div className="mt-6 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="card p-4">
            <p className="text-sm font-bold text-muted">{label}</p>
            <p className="mt-1 break-all font-mono text-sm text-fg">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
