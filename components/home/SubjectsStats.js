import Link from "next/link";
import { Calculator, Atom, Code, Languages, FlaskConical, BookOpen, Quote } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import Counter from "../Counter";
const subjects = [{
  name: "Math",
  icon: Calculator,
  color: "bg-coral/15 text-coral"
}, {
  name: "Physics",
  icon: Atom,
  color: "bg-mint/25 text-fg"
}, {
  name: "Programming",
  icon: Code,
  color: "bg-sun/40 text-fg"
}, {
  name: "IELTS",
  icon: Languages,
  color: "bg-coral/15 text-coral"
}, {
  name: "Chemistry",
  icon: FlaskConical,
  color: "bg-mint/25 text-fg"
}, {
  name: "English",
  icon: BookOpen,
  color: "bg-sun/40 text-fg"
}];
const stats = [{
  to: 2500,
  suffix: "+",
  label: "Happy students"
}, {
  to: 400,
  suffix: "+",
  label: "Verified tutors"
}, {
  to: 12,
  suffix: "+",
  label: "Subjects"
}, {
  to: 98,
  suffix: "%",
  label: "Satisfaction"
}];
const reviews = [{
  name: "Arif Hossain",
  role: "SSC Student",
  text: "I found a physics tutor in one evening. My mock test scores jumped within a month."
}, {
  name: "Nusrat Jahan",
  role: "Programming Tutor",
  text: "Posting my batch was easy, and applicants arrive with clear schedules and goals."
}, {
  name: "Mim Akter",
  role: "IELTS Student",
  text: "The filters saved so much time. Online, under my budget, and starting this week."
}];
export default function SubjectsStats() {
  return <>
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Explore" title="Popular Subjects" subtitle="Jump straight into the topics learners search for most." />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {subjects.map((s, i) => <Reveal key={s.name} delay={i * 0.05} className="h-full">
                <Link href={`/tuitions?subject=${s.name}`} className="card flex h-full flex-col items-center gap-3 p-6 text-center transition hover:-translate-y-1 hover:border-coral">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl ${s.color}`}><s.icon size={26} /></span>
                  <span className="font-bold text-fg">{s.name}</span>
                </Link>
              </Reveal>)}
          </div>
        </div>
      </section>

      {}
      <section className="bg-ink py-14 text-white">
        <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map(s => <div key={s.label}>
              <p className="font-heading text-4xl font-extrabold text-sun sm:text-5xl"><Counter to={s.to} suffix={s.suffix} /></p>
              <p className="mt-1 text-white/70">{s.label}</p>
            </div>)}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Love from learners" title="What Our Community Says" />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => <Reveal key={r.name} delay={i * 0.08} className="h-full">
                <div className="card flex h-full flex-col p-6">
                  <Quote className="text-coral" size={28} />
                  <p className="mt-4 flex-1 text-fg">{r.text}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-sun font-bold text-ink">{r.name[0]}</span>
                    <div>
                      <p className="font-bold text-fg">{r.name}</p>
                      <p className="text-sm text-muted">{r.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>)}
          </div>
        </div>
      </section>
    </>;
}
