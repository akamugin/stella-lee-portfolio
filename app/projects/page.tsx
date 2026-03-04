import Link from "next/link";
import { BackgroundBlobs } from "@/components/background-blobs";
import { ProjectsShowcase, type ProjectItem } from "@/components/projects-showcase";
import { TopNav } from "@/components/top-nav";

const projects: ProjectItem[] = [
  {
    slug: "yippu",
    name: "Yippu",
    summary: "Placeholder summary. Add what Yippu solves, your role, and measurable impact.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/yippu.png"
  },
  {
    slug: "dailyos",
    name: "DailyOS",
    summary: "Placeholder summary. Add key product decisions, architecture, and outcomes.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/dailyos.png"
  },
  {
    slug: "steady",
    name: "Steady",
    summary: "Placeholder summary. Add user problem, implementation details, and final results.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/steady.png"
  },
  {
    slug: "work-in",
    name: "Work-in",
    summary: "Placeholder summary. Add core features and what makes this project unique.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/work-in.png"
  },
  {
    slug: "my-bookie",
    name: "my Bookie",
    summary: "Placeholder summary. Add timeline, technical challenges, and what you learned.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/my-bookie.png"
  },
  {
    slug: "outfitella",
    name: "Outfitella",
    summary: "Placeholder summary. Add design goals, implementation choices, and impact.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/outfitella.png"
  },
  {
    slug: "girl-math",
    name: "Girl Math",
    summary: "Placeholder summary. Add project concept, execution, and outcomes.",
    details: "Add an expanded case study here with scope, architecture decisions, and measurable impact.",
    highlights: ["Placeholder highlight", "Placeholder highlight", "Placeholder highlight"],
    stack: ["TBD", "TBD"],
    github: "#",
    live: "#",
    image: "/project-previews/girl-math.png"
  }
];

// Change this one slug to switch which project gets featured at the top.
const FEATURED_PROJECT_SLUG = "yippu";

export default function ProjectsPage() {
  return (
    <>
      <BackgroundBlobs />
      <TopNav />
      <main className="mx-auto w-[min(1080px,94vw)] py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">Projects</p>
          <h1 className="mt-2 text-4xl font-black text-grape">Personal Projects</h1>
          <p className="mt-3 max-w-2xl text-grape/80">
            Projects where I turn ideas into real products and experiment with thoughtful design!
          </p>
        </div>
        <ProjectsShowcase projects={projects} featuredProjectSlug={FEATURED_PROJECT_SLUG} />
      </main>
    </>
  );
}
