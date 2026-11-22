import { requireUser } from "@/lib/session";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }) {
  const user = await requireUser();

  // Send only plain, safe fields to the client component
  const safeUser = {
    name: user.name,
    email: user.email,
    role: user.role,
    plan: user.plan || "free",
    image: user.image || null,
  };

  return <DashboardShell user={safeUser}>{children}</DashboardShell>;
}
