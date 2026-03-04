import { BackgroundBlobs } from "@/components/background-blobs";
import { TopNav } from "@/components/top-nav";

const entries = [
  {
    role: "Incoming Software Engineer",
    company: "Meta",
    dates: "Starting May 2026",
    points: ["Full-time SWE role begins in May 2026."]
  },
  {
    role: "Software Engineer Intern",
    company: "Meta",
    dates: "May 2025 - August 2025",
    points: [
      "Worked on the Instagram Fundraising team.",
      "Rewrote a core wrapper layer to improve reliability and maintainability.",
      "Contributed production iOS code in a large-scale codebase and cross-functional workflow."
    ]
  },
  {
    role: "Operations Analyst",
    company: "Bank of New York",
    dates: "June 2024 - August 2024",
    points: [
      "Supported both the NPL and Margin teams on operational and process-improvement work.",
      "Used an internal UI toolkit to simplify a key payment workflow for faster, easier execution.",
      "Wrote Excel automation scripts for email workflows across 100+ customers, reducing manual workload by 140%.",
      "Revamped the team website to showcase more features and improve internal visibility."
    ]
  }
];

export default function ExperiencePage() {
  return (
    <>
      <BackgroundBlobs />
      <TopNav />
      <main className="mx-auto w-[min(900px,94vw)] py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">Experience</p>
          <h1 className="mt-2 text-4xl font-black text-grape">Career Timeline</h1>
          <p className="mt-3 text-grape/80">My SWE journey & irrelevant experiences</p>
        </div>

        <section className="mt-6 space-y-4">
          {entries.map((entry) => (
            <article key={`${entry.role}-${entry.company}`} className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-dreamy">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-grape/70">{entry.dates}</p>
              <h2 className="mt-1 text-2xl font-bold text-grape">{entry.role}</h2>
              <p className="text-grape/80">{entry.company}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-grape/85">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <hr className="my-8 border-white/70" />

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">Additional Experience</p>
          <div className="mt-4 space-y-3">
            <article className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-dreamy">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-grape/70">August 2024 - Present</p>
              <h3 className="mt-1 text-xl font-bold text-grape">Campus Leader</h3>
              <p className="text-grape/80">Notion</p>
            </article>

            <article className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-dreamy">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-grape/70">May 2023 - August 2023</p>
              <h3 className="mt-1 text-xl font-bold text-grape">Medical Interpreter / Nurse Experience</h3>
              <p className="text-grape/80">Glaucoma Center of Hawaii</p>
            </article>

            <article className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-dreamy">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-grape/70">May 2023 - August 2023</p>
              <h3 className="mt-1 text-xl font-bold text-grape">Sales</h3>
              <p className="text-grape/80">Hilton Gift Shop</p>
            </article>

            <article className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-dreamy">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-grape/70">May 2021 - May 2022</p>
              <h3 className="mt-1 text-xl font-bold text-grape">Head Teacher</h3>
              <p className="text-grape/80">Kumon</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
