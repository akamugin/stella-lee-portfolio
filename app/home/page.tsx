"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackgroundBlobs } from "@/components/background-blobs";
import type { ProjectItem } from "@/components/projects-showcase";
import { featuredProjectSlug, portfolioProjects } from "@/data/projects";
import { TopNav } from "@/components/top-nav";

type Spark = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

const symbols = ["☁️", "🩷", "✨", "🕵️", "🎻", "🎹", "🪄", "🫧", "🧁", "🪼", "🐬", "🍀", "🌸", "🌹", "🌷", "🪻", "⭐️", "🪐", "🍓", "🍒", "🍩", "🍷"];

const widgets = [
  { label: "Mood", value: "Playful + focused on clean UI polish" },
  { label: "Currently Learning", value: "Animation timing and tactile micro-interactions" }
];

const loreItems = [
  "Detective Conan fan since age 5.",
  "I like learning instruments by ear.",
  "Language learning is one of my favorite hobbies."
];

const philosophyItems = [
  "If onboarding takes too long, simplify it first.",
  "Ship quickly, then polish what users touch most.",
  "Great product feels obvious, not noisy."
];

export default function MainHomePage() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const featuredProject = portfolioProjects.find((project) => project.slug === featuredProjectSlug) ?? portfolioProjects[0];

  useEffect(() => {
    const onPageClick = (event: MouseEvent) => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const id = Date.now() + Math.floor(Math.random() * 10000);
      setSparks((current) => [...current, { id, x: event.clientX, y: event.clientY, symbol }]);
      window.setTimeout(() => {
        setSparks((current) => current.filter((spark) => spark.id !== id));
      }, 760);
    };

    document.addEventListener("click", onPageClick);
    return () => document.removeEventListener("click", onPageClick);
  }, []);

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
      <BackgroundBlobs />
      <TopNav />
      <main className="relative mx-auto w-[min(1080px,94vw)] py-10">
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            className="pointer-events-none fixed z-30 text-2xl"
            style={{ left: spark.x, top: spark.y }}
            initial={{ opacity: 0, scale: 0.5, y: 6, x: -8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.15, 1], y: -35, rotate: 16 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            {spark.symbol}
          </motion.span>
        ))}

        <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-dreamy">
            <p className="inline-flex rounded-full bg-petal px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-grape">
              Home
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-grape sm:text-5xl">Hi, I&apos;m Stella</h1>
            <p className="mt-3 text-lg font-semibold text-grape/90">SWE @ Meta</p>
            <p className="mt-4 text-sm leading-relaxed text-grape/85">
              I&apos;m a software engineer who loves building products that feel both thoughtful and playful. My focus is on
              iOS app development because I enjoy creating mobile experiences that are polished, intuitive, and personal
              in the way people use them every day. I&apos;m especially excited by ideas that turn complex problems into
              simple, beautiful interactions. This site is a little window into how I think, how I build, and what I&apos;m
              passionate about creating next 🌸
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              <Link href="/projects" className="rounded-full bg-rose px-4 py-2 text-white transition hover:-translate-y-0.5">
                View Projects
              </Link>
              <Link href="/experience" className="rounded-full bg-cloud px-4 py-2 text-grape transition hover:-translate-y-0.5">
                Experience
              </Link>
              <Link href="/contact" className="rounded-full bg-white px-4 py-2 text-grape ring-1 ring-rose/30 transition hover:-translate-y-0.5">
                Contact
              </Link>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-[min(92vw,350px)] rounded-[42px] border border-black/40 bg-[#111115] p-3 shadow-[0_20px_45px_rgba(33,15,35,0.45)] lg:ml-auto lg:mr-0 lg:justify-self-end"
          >
            <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-b from-[#ffd9ec] to-[#dff3ff] p-3">
              <div className="pointer-events-none absolute left-1/2 top-0 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-black/80" />

              <div className="relative z-10 h-full overflow-y-auto rounded-[24px] border border-white/35 bg-white/20 p-3 backdrop-blur">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/70">Fav Playlist</p>
                <div className="mb-3 overflow-hidden rounded-2xl border border-white/45 bg-white/70 p-1">
                  <iframe
                    title="Stella Spotify Playlist"
                    data-testid="embed-iframe"
                    style={{ borderRadius: 12 }}
                    src="https://open.spotify.com/embed/playlist/5AOPhD45lOpYpt2WDHPXvI?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <section className="mt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/70">Today</p>
                  <div className="mt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => setActiveProject(featuredProject)}
                      className="w-full rounded-2xl border border-white/45 bg-white/70 p-3 text-left transition hover:-translate-y-0.5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-grape/65">Current Build</p>
                      <p className="mt-1 text-sm font-semibold text-grape">{featuredProject.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-grape/75">{featuredProject.summary}</p>
                    </button>

                    {widgets.map((item) => (
                      <article key={item.label} className="rounded-2xl border border-white/45 bg-white/70 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-grape/65">{item.label}</p>
                        <p className="mt-1 text-sm font-semibold text-grape">{item.value}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/70">Lore Panel</p>
                  <div className="mt-2 rounded-2xl border border-white/45 bg-white/70 p-3">
                    <ul className="space-y-2 text-sm text-grape/85">
                      {loreItems.map((item) => (
                        <li key={item} className="rounded-xl bg-white/70 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="mt-4 pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/70">Build Philosophy</p>
                  <div className="mt-2 space-y-2">
                    {philosophyItems.map((item) => (
                      <article key={item} className="rounded-2xl border border-white/45 bg-gradient-to-r from-white/75 to-white/60 p-3">
                        <p className="text-sm font-semibold leading-relaxed text-grape">{item}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.aside>
        </section>
      </main>

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
