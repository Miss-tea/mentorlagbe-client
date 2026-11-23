import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import Logo from "./Logo";
const quick = [{
  href: "/",
  label: "Home"
}, {
  href: "/tuitions",
  label: "Browse Tuitions"
}, {
  href: "/pricing",
  label: "Pricing"
}, {
  href: "/#how-it-works",
  label: "How It Works"
}, {
  href: "/sign-up",
  label: "Become a Tutor"
}];
const socials = [{
  icon: FaXTwitter,
  label: "X",
  href: "https://x.com"
}, {
  icon: FaFacebookF,
  label: "Facebook",
  href: "https://facebook.com"
}, {
  icon: FaLinkedinIn,
  label: "LinkedIn",
  href: "https://linkedin.com"
}, {
  icon: FaInstagram,
  label: "Instagram",
  href: "https://instagram.com"
}];
export default function Footer() {
  return <footer className="mt-20 bg-ink text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-white/70">
            Smart tuition and mentorship for every learner. Find verified tutors by subject, level and budget.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({
            icon: Icon,
            label,
            href
          }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-coral">
                <Icon size={16} />
              </a>)}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-white/70">
            {quick.map(l => <li key={l.label}><Link href={l.href} className="transition hover:text-sun">{l.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Contact</h4>
          <ul className="mt-4 space-y-3 text-white/70">
            <li className="flex items-center gap-3"><Mail size={16} className="text-sun" /> hello@mentorlagbe.com</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-sun" /> +880 1700-000000</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-sun" /> Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} MentorLagbe. All rights reserved.
      </div>
    </footer>;
}
