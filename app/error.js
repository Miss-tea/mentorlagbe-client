"use client";

import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-6xl">😵</p>
        <h1 className="mt-4 text-3xl font-extrabold text-fg">Something went wrong</h1>
        <p className="mt-3 text-muted">An unexpected error happened. Please try again.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-ghost">Try again</button>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
