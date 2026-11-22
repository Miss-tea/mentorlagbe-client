"use client";

import { useApi } from "@/lib/useApi";
import { fmtDate } from "@/lib/format";

export default function TransactionsPage() {
  const { data, loading, error } = useApi("/api/admin/transactions");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Transactions</h1>
        <p className="mt-1 text-muted">Every Pro subscription payment received through Stripe.</p>
      </div>

      {error && <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-2xl bg-line" />)}</div>
      ) : data?.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-5xl">💳</p>
          <h3 className="mt-4 text-xl font-bold text-fg">No payments yet</h3>
          <p className="mt-2 text-muted">Pro purchases will appear here once Stripe is connected.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-line text-sm text-muted">
              <tr>{["User", "Email", "Role", "Plan", "Amount", "Transaction ID", "Date"].map((h) => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 font-bold text-fg">{p.userName}</td>
                  <td className="px-5 py-4 text-muted">{p.userEmail}</td>
                  <td className="px-5 py-4 capitalize text-fg">{p.userRole}</td>
                  <td className="px-5 py-4 text-fg">{p.planName}</td>
                  <td className="px-5 py-4 font-bold text-fg">${p.amount}</td>
                  <td className="px-5 py-4 font-mono text-xs text-muted">{p.transactionId}</td>
                  <td className="px-5 py-4 text-muted">{fmtDate(p.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
