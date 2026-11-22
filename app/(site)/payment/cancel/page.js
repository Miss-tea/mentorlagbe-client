import Link from "next/link";
import { Undo2 } from "lucide-react";

export const metadata = { title: "Payment cancelled" };

export default function PaymentCancelPage() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-16">
      <div className="card w-full max-w-lg p-10 text-center">
        <Undo2 className="mx-auto text-sun" size={56} />
        <h1 className="mt-5 text-3xl font-extrabold text-fg">Payment cancelled</h1>
        <p className="mt-3 text-muted">No worries, you were not charged. You can upgrade whenever you are ready.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/pricing" className="btn btn-primary">Back to pricing</Link>
          <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}