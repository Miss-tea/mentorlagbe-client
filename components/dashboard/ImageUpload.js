"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export default function ImageUpload({
  value,
  onChange,
  round = false,
  label = "Upload image"
}) {
  const [uploading, setUploading] = useState(false);
  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!TYPES.includes(file.type)) return toast.error("Please choose a JPG, PNG, WEBP or GIF image");
    if (file.size > 4 * 1024 * 1024) return toast.error("Image must be smaller than 4 MB");
    const body = new FormData();
    body.append("image", file);
    setUploading(true);
    try {
      const {
        url
      } = await apiFetch("/api/upload", {
        method: "POST",
        body
      });
      onChange(url);
      toast.success("Image uploaded ✅");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  }
  return <div className="flex flex-wrap items-center gap-4">
      <div className={`grid shrink-0 place-items-center overflow-hidden border-2 border-outline bg-line ${round ? "h-24 w-24 rounded-full" : "h-32 w-52 rounded-2xl"}`}>
        {value ? <img src={value} alt="Preview" className="h-full w-full object-cover" /> : <ImagePlus className="text-muted" size={28} />}
      </div>

      <div>
        {}
        <label className={`btn btn-ghost btn-sm cursor-pointer ${uploading ? "pointer-events-none opacity-60" : ""}`}>
          {uploading ? <><Loader2 className="animate-spin" size={16} /> Uploading...</> : value ? "Change image" : label}
          <input type="file" accept="image/*" hidden onChange={handleFile} />
        </label>
        <p className="mt-2 text-xs text-muted">JPG, PNG, WEBP or GIF, up to 4 MB.</p>
      </div>
    </div>;
}
