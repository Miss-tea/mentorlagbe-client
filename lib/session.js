import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

// Returns the logged-in user, or redirects. Pass a role to also enforce it.
export async function requireUser(role) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  if (role && session.user.role !== role) redirect("/dashboard");
  return session.user;
}
