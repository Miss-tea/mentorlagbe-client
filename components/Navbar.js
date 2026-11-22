"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X as CloseIcon, LayoutDashboard, UserCog, LogOut } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Browse Tuitions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
];

const roleStyle = {
  student: "bg-mint/30 text-fg",
  tutor: "bg-sun/50 text-fg",
  admin: "bg-coral/20 text-coral",
};

function Avatar({ user, size = 40 }) {
  const style = { width: size, height: size };
  return user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={user.image} alt={user.name} style={style} className="rounded-full border-2 border-outline object-cover" />
  ) : (
    <span style={style} className="grid place-items-center rounded-full border-2 border-outline bg-coral font-bold text-white">
      {user.name?.[0]?.toUpperCase() || "?"}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the avatar dropdown when clicking anywhere outside it
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleSignOut() {
    setMenuOpen(false);
    setMobileOpen(false);
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  const closeAll = () => { setMobileOpen(false); setMenuOpen(false); };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-lg">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-sun/30 ${pathname === l.href ? "bg-sun/40 text-fg" : "text-muted"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-line" />
          ) : !user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/sign-in" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link href="/sign-up" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          ) : (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-3 rounded-full p-1 pr-3 transition hover:bg-line">
                <Avatar user={user} />
                <span className="hidden text-left md:block">
                  <span className="block text-sm font-bold leading-tight text-fg">{user.name}</span>
                  <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${roleStyle[user.role] || roleStyle.student}`}>
                    {user.role}
                  </span>
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl border-2 border-outline bg-surface p-2 shadow-[4px_4px_0_0_var(--outline)]">
                  <div className="border-b border-line px-3 py-2">
                    <p className="font-bold text-fg">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${roleStyle[user.role] || roleStyle.student}`}>
                      {user.role}
                    </span>
                  </div>
                  <Link href="/dashboard" onClick={closeAll} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-fg hover:bg-line">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link href="/dashboard/profile" onClick={closeAll} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-fg hover:bg-line">
                    <UserCog size={16} /> Update Profile
                  </Link>
                  <button onClick={handleSignOut} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-coral hover:bg-coral/10">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl border-2 border-outline p-2 text-fg lg:hidden" aria-label="Toggle menu">
            {mobileOpen ? <CloseIcon size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-line bg-canvas px-4 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={closeAll} className="rounded-xl px-4 py-3 font-semibold text-fg hover:bg-line">
                {l.label}
              </Link>
            ))}
          </nav>
          {!isPending && !user && (
            <div className="mt-4 flex gap-3">
              <Link href="/sign-in" onClick={closeAll} className="btn btn-ghost btn-sm flex-1">Sign In</Link>
              <Link href="/sign-up" onClick={closeAll} className="btn btn-primary btn-sm flex-1">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
