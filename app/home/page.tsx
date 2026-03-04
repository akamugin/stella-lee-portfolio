"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackgroundBlobs } from "@/components/background-blobs";
import { TopNav } from "@/components/top-nav";

type Spark = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

const symbols = ["☁️", "🩷", "✨", "🕵️", "🎻", "🎹", "🪄", "🫧", "🧁"];

export default function MainHomePage() {
  const [sparks, setSparks] = useState<Spark[]>([]);

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
            className="mx-auto w-[300px] rounded-[40px] border border-black/40 bg-[#111115] p-3 shadow-[0_20px_45px_rgba(33,15,35,0.45)] lg:ml-auto lg:mr-0 lg:justify-self-end"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-b from-[#ffd9ec] to-[#dff3ff] p-4">
              <div className="mb-3 rounded-2xl bg-white/65 px-3 py-2 text-xs font-semibold text-grape/80">Home Quick Access</div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/about" className="rounded-xl bg-white/75 px-3 py-3 text-center text-xs font-semibold text-grape">
                  About
                </Link>
                <Link href="/projects" className="rounded-xl bg-white/75 px-3 py-3 text-center text-xs font-semibold text-grape">
                  Projects
                </Link>
                <Link href="/experience" className="rounded-xl bg-white/75 px-3 py-3 text-center text-xs font-semibold text-grape">
                  Experience
                </Link>
                <Link href="/interests" className="rounded-xl bg-white/75 px-3 py-3 text-center text-xs font-semibold text-grape">
                  Interests
                </Link>
              </div>
              <Link href="/contact" className="mt-3 block rounded-xl bg-[#111115] px-3 py-3 text-center text-xs font-semibold text-white">
                Contact
              </Link>
            </div>
          </motion.aside>
        </section>
      </main>
    </>
  );
}
