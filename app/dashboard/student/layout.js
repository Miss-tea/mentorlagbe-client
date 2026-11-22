import { requireUser } from "@/lib/session";

export default async function StudentLayout({ children }) {
  await requireUser("student"); // anyone who is not a student is redirected away
  return children;
}
