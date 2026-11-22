import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import TokenTester from "./TokenTester";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  const { user } = session;

  return (
    <main className="min-h-screen bg-[#FFF8F0] p-8">
      <div className="mx-auto max-w-2xl space-y-6 rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-[#1B1642]">Hello, {user.name} 👋</h1>
        <p>Email: {user.email}</p>
        <p>Role: <b className="capitalize">{user.role}</b> &nbsp;|&nbsp; Plan: <b className="capitalize">{user.plan}</b></p>
        <TokenTester />
      </div>
    </main>
  );
}
