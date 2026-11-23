"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
export default function BookmarkButton({
  tuitionId
}) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    apiFetch("/api/bookmarks/ids").then(r => setSaved(r.ids.includes(tuitionId))).catch(() => {});
  }, [tuitionId]);
  async function toggle() {
    setBusy(true);
    try {
      await apiFetch(`/api/bookmarks/${tuitionId}`, {
        method: saved ? "DELETE" : "POST"
      });
      setSaved(!saved);
      toast.success(saved ? "Removed from saved" : "Saved for later ❤️");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }
  return <button onClick={toggle} disabled={busy} className="btn btn-ghost mt-3 w-full disabled:opacity-60">
      <Heart size={18} className={saved ? "fill-coral text-coral" : ""} />
      {saved ? "Saved" : "Save for later"}
    </button>;
}
