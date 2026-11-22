"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import TuitionForm from "@/components/dashboard/TuitionForm";

export default function EditTuitionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading } = useApi("/api/tuitions/mine");
  const tuition = data?.find((t) => t._id === id);

  async function save(values) {
    await apiFetch(`/api/tuitions/${id}`, { method: "PUT", body: JSON.stringify(values) });
    toast.success("Saved! It will be reviewed again before going public.");
    router.push("/dashboard/tutor/my-tuitions");
  }

  if (loading) return <div className="h-96 animate-pulse rounded-3xl bg-line" />;
  if (!tuition) return <p className="rounded-2xl bg-coral/10 p-4 font-semibold text-coral">Tuition not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-fg">Edit Tuition</h1>
        <p className="mt-1 text-muted">After saving, an admin will review the changes again.</p>
      </div>
      <TuitionForm initial={tuition} submitLabel="Save changes" onSubmit={save} />
    </div>
  );
}
