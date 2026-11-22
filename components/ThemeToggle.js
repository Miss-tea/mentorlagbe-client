"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // the server can't know the theme, so wait until mounted

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="grid h-10 w-10 place-items-center rounded-xl border-2 border-outline bg-surface text-fg transition hover:bg-sun/40"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}