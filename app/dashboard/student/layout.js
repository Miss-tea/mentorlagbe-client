import { requireUser } from "@/lib/session";
export default async function StudentLayout({
  children
}) {
  await requireUser("student");
  return children;
}
