import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <div className="mb-8 flex justify-center"><Logo /></div>
        <p className="font-heading text-8xl font-extrabold text-coral">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-fg">This page took a day off</h1>
        <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to Home</Link>
      </div>
    </main>
  );
}
