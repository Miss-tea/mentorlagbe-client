import { requireUser } from "@/lib/session";

export default async function TutorLayout({ children }) {
  await requireUser("tutor");
  return children;
}
