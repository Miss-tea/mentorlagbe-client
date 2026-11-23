"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
function SuccessContent() {
  const router = useRouter();
  const sessionId = useSearchParams().get("session_id");
  const {
    refetch
  } = authClient.useSession();
  const [state, setState] = useState({
    status: "loading"
  });
  useEffect(() => {
    if (!sessionId) {
      setState({
        status: "error",
        message: "No payment session was found."
      });
      return;
    }
    apiFetch(`/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`).then(async result => {
      setState({
        status: "success",
        ...result
      });
      toast.success("Welcome to Pro! 🎉");
      await refetch();
      router.refresh();
    }).catch(err => setState({
      status: "error",
      message: err.message
    }));
  }, [sessionId]);
  return <div className="container-x grid min-h-[60vh] place-items-center py-16">
      <div className="card w-full max-w-lg p-10 text-center">
        {state.status === "loading" && <>
            <Loader2 className="mx-auto animate-spin text-coral" size={48} />
            <h1 className="mt-5 text-2xl font-extrabold text-fg">Confirming your payment...</h1>
            <p className="mt-2 text-muted">Please do not close this page.</p>
          </>}

        {state.status === "success" && <>
            <CheckCircle2 className="mx-auto text-mint" size={64} />
            <h1 className="mt-5 text-3xl font-extrabold text-fg">Payment successful!</h1>
            <p className="mt-3 text-muted">
              You are now on the <b className="text-fg">{state.planName}</b>. We received ${state.amount}.
            </p>
            <Link href="/dashboard" className="btn btn-primary mt-8">Go to my dashboard</Link>
          </>}

        {state.status === "error" && <>
            <XCircle className="mx-auto text-coral" size={64} />
            <h1 className="mt-5 text-2xl font-extrabold text-fg">We could not confirm the payment</h1>
            <p className="mt-3 text-muted">{state.message}</p>
            <p className="mt-2 text-sm text-muted">If money was taken, your plan will upgrade automatically within a minute.</p>
            <Link href="/pricing" className="btn btn-ghost mt-8">Back to pricing</Link>
          </>}
      </div>
    </div>;
}
export default function PaymentSuccessPage() {
  return <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SuccessContent />
    </Suspense>;
}
