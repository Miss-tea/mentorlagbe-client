import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";

export default async function DashboardIndex() {
  const user = await requireUser();
  const role = ["student", "tutor", "admin"].includes(user.role) ? user.role : "student";
  redirect(`/dashboard/${role}`);
}
