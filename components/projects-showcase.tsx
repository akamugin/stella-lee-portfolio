"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type ProjectItem = {
  slug: string;
  name: string;
  summary: string;
  details: string;
  highlights: string[];
  stack: string[];
  github: string;
  live: string;
  image: string;
};

type ProjectsShowcaseProps = {
  projects: ProjectItem[];
  featuredProjectSlug: string;
};

const FALLBACK_PREVIEW =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23ffd9ea'/%3E%3Cstop offset='1' stop-color='%23dff2ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='128' height='128' fill='url(%23g)'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%235b416f'%3EPreview%3C/text%3E%3C/svg%3E";

export function ProjectsShowcase({ projects, featuredProjectSlug }: ProjectsShowcaseProps) {
  const featuredProject = projects.find((project) => project.slug === featuredProjectSlug) ?? projects[0];
  const orderedProjects = [
    featuredProject,
    ...projects.filter((project) => project.slug !== featuredProject.slug)
  ];

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <>
      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {orderedProjects.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setActiveProject(project)}
            className={`relative rounded-2xl border bg-white/85 p-5 text-left shadow-dreamy transition hover:-translate-y-0.5 ${
              project.slug === featuredProjectSlug ? "border-rose/45 ring-1 ring-rose/25" : "border-white/70"
            }`}
          >
            {project.slug === featuredProjectSlug && (
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-rose">Featured</p>
            )}
            <h3 className="pr-20 text-xl font-bold text-grape">{project.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-grape/80">{project.summary}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Stack</p>
            <div className="mt-2 flex flex-wrap gap-2 pr-20">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-rose/20 bg-gradient-to-r from-petal to-cloud px-2.5 py-1 text-xs font-semibold text-grape"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 h-16 w-16 overflow-hidden rounded-xl border border-rose/20 bg-white shadow">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_PREVIEW;
                }}
              />
            </div>
          </button>
        ))}
      </section>

      {activeProject && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setActiveProject(null)}
          role="presentation"
        >
          <article
            className="w-[min(720px,92vw)] rounded-3xl border border-white/70 bg-white p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Project Details</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">{activeProject.name}</h3>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-grape/85">{activeProject.details}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Highlights</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-grape/85">
              {activeProject.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {activeProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-rose/20 bg-gradient-to-r from-petal to-cloud px-2.5 py-1 text-xs font-semibold text-grape"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-2 text-xs font-semibold">
              <Link href={activeProject.github} className="rounded-full bg-petal px-3 py-1.5 text-grape">
                GitHub
              </Link>
              <Link href={activeProject.live} className="rounded-full bg-cloud px-3 py-1.5 text-grape">
                Live
              </Link>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
