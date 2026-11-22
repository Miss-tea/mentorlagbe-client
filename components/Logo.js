import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-outline bg-coral text-white shadow-[2px_2px_0_0_var(--outline)]">
        <GraduationCap size={22} />
      </span>
      <span className={`font-heading text-2xl font-extrabold tracking-tight ${light ? "text-white" : "text-fg"}`}>
        Mentor<span className="text-coral">Lagbe</span>
      </span>
    </Link>
  );
}
