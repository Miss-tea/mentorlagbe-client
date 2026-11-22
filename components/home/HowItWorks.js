import { UserPlus, Search, Send, Rocket } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const steps = [
  { icon: UserPlus, title: "Create your account", text: "Sign up as a Student or a Tutor in under a minute.", color: "bg-coral text-white" },
  { icon: Search, title: "Find or post a batch", text: "Students search and filter. Tutors publish batches for approval.", color: "bg-mint text-ink" },
  { icon: Send, title: "Apply and connect", text: "Send an application; tutors accept or reject from their dashboard.", color: "bg-sun text-ink" },
  { icon: Rocket, title: "Start learning", text: "Begin your sessions, track progress and grow together.", color: "bg-ink text-white" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-24 bg-surface">
      <div className="container-x">
        <SectionHeading eyebrow="Simple process" title="How MentorLagbe Works" subtitle="Four easy steps, whether you want to learn or to teach." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <div className="card relative h-full p-6">
                <span className="absolute right-5 top-4 font-heading text-5xl font-extrabold text-line">{i + 1}</span>
                <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl border-2 border-outline ${s.color}`}>
                  <s.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-fg">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
