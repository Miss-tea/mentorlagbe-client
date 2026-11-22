import { requireUser } from "@/lib/session";
import ProfileForm from "@/components/dashboard/ProfileForm";

export const metadata = { title: "Update Profile" };

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Update Profile</h1>
        <p className="mt-1 text-muted">Keep your details fresh so tutors and students can trust you.</p>
      </div>
      <ProfileForm
        user={{
          name: user.name,
          email: user.email,
          role: user.role,
          plan: user.plan || "free",
          image: user.image || "",
          phone: user.phone || "",
          bio: user.bio || "",
        }}
      />
    </div>
  );
}
