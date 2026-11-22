"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard, FileText, UserCog, LogOut, PanelLeftClose, PanelLeftOpen, Menu, X,
  Plus, BookOpen, Users, ClipboardCheck, Receipt, Crown, ArrowLeft, GraduationCap, Heart,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

// Each role sees different sidebar links
const nav = {
  student: [
    { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/student/my-applications", label: "My Applications", icon: FileText },
    { href: "/dashboard/student/saved", label: "Saved Tuitions", icon: Heart },
  ],
  tutor: [
    { href: "/dashboard/tutor", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/tutor/post-tuition", label: "Post a Tuition", icon: Plus },
    { href: "/dashboard/tutor/my-tuitions", label: "My Tuitions", icon: BookOpen },
    { href: "/dashboard/tutor/applicants", label: "Applicants", icon: Users },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/tuitions", label: "Tuition Approvals", icon: ClipboardCheck },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
  ],
};

const roleStyle = {
  student: "bg-mint/30 text-fg",
  tutor: "bg-sun/50 text-fg",
  admin: "bg-coral/20 text-coral",
};

export default function DashboardShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false); // desktop: icons only
  const [mobileOpen, setMobileOpen] = useState(false); // mobile: slide-in drawer

  const links = [
    ...(nav[user.role] || nav.student),
    { href: "/dashboard/profile", label: "Update Profile", icon: UserCog },
  ];

  // "Overview"-style links must match exactly; others match any deeper path
  const isActive = (href) => (href.split("/").length === 3 ? pathname === href : pathname.startsWith(href));

  async function signOut() {
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Dark overlay behind the mobile drawer */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface transition-all duration-200 lg:sticky lg:top-0 lg:h-screen ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <div className={collapsed ? "lg:hidden" : ""}><Logo /></div>
          {collapsed && (
            <Link href="/" className="mx-auto hidden h-10 w-10 place-items-center rounded-xl border-2 border-outline bg-coral text-white lg:grid">
              <GraduationCap size={22} />
            </Link>
          )}
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-muted lg:hidden" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              title={l.label}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 font-semibold transition ${collapsed ? "lg:justify-center" : ""} ${
                isActive(l.href) ? "bg-coral text-white" : "text-muted hover:bg-line hover:text-fg"
              }`}
            >
              <l.icon size={20} className="shrink-0" />
              <span className={collapsed ? "lg:hidden" : ""}>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-line p-3">
          <Link href="/" title="Back to site" className={`flex items-center gap-3 rounded-2xl px-3 py-3 font-semibold text-muted hover:bg-line hover:text-fg ${collapsed ? "lg:justify-center" : ""}`}>
            <ArrowLeft size={20} className="shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>Back to site</span>
          </Link>
          <button onClick={signOut} title="Sign out" className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 font-semibold text-coral hover:bg-coral/10 ${collapsed ? "lg:justify-center" : ""}`}>
            <LogOut size={20} className="shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-canvas/80 px-4 backdrop-blur-lg sm:px-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileOpen(true)} className="rounded-xl border-2 border-outline p-2 text-fg lg:hidden" aria-label="Open menu">
              <Menu size={20} />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded-xl border-2 border-outline p-2 text-fg lg:block" aria-label="Toggle sidebar">
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
          </div>

          {/* User profile summary */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-fg">{user.name}</p>
              <div className="mt-0.5 flex justify-end gap-1">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${roleStyle[user.role] || roleStyle.student}`}>{user.role}</span>
                {user.plan === "pro" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sun px-2 py-0.5 text-[11px] font-bold text-ink"><Crown size={11} /> Pro</span>
                )}
              </div>
            </div>
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full border-2 border-outline object-cover" />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-outline bg-coral font-bold text-white">
                {user.name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
        </header>

        {/* Full-width content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
