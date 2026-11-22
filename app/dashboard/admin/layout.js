import { requireUser } from "@/lib/session";

export default async function AdminLayout({ children }) {
  await requireUser("admin");
  return children;
}
