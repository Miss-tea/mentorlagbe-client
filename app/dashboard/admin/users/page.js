"use client";

import { toast } from "sonner";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { fmtDate } from "@/lib/format";

export default function AdminUsersPage() {
  const { data: session } = authClient.useSession();
  const { data, loading, error, reload } = useApi("/api/admin/users");

  async function changeRole(id, role) {
    try {
      await apiFetch(`/api/admin/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) });
      toast.success(`Role changed to ${role}`);
      reload();
    } catch (err) {
      toast.error(err.message);
      reload(); // put the dropdown back to the real value
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">User Management</h1>
        <p className="mt-1 text-muted">View everyone on the platform and manage roles.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-line" />)}</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-line text-sm text-muted">
              <tr>{["User", "Email", "Plan", "Joined", "Role"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data?.map((u) => {
                const isMe = u.email === session?.user?.email;
                return (
                  <tr key={u._id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={u.image} alt="" className="h-10 w-10 rounded-full border-2 border-outline object-cover" />
                        ) : (
                          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-outline bg-sun font-bold text-ink">{u.name?.[0]?.toUpperCase()}</span>
                        )}
                        <span className="font-bold text-fg">{u.name}{isMe && <span className="ml-2 text-xs text-muted">(you)</span>}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted">{u.email}</td>
                    <td className="px-5 py-4 font-semibold capitalize text-fg">{u.plan || "free"}</td>
                    <td className="px-5 py-4 text-muted">{fmtDate(u.createdAt)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={u.role}
                        disabled={isMe}
                        onChange={(e) => changeRole(u._id, e.target.value)}
                        className="rounded-xl border-2 border-line bg-canvas px-3 py-2 font-semibold capitalize text-fg disabled:opacity-50"
                      >
                        <option value="student">student</option>
                        <option value="tutor">tutor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
