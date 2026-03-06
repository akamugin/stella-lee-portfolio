"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BackgroundBlobs } from "@/components/background-blobs";
import type { ProjectItem } from "@/components/projects-showcase";
import { interests } from "@/data/interests";
import { featuredProjectSlug, portfolioProjects } from "@/data/projects";
import { TopNav } from "@/components/top-nav";

type Spark = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

const symbols = ["☁️", "🩷", "✨", "🕵️", "🎻", "🎹", "🪄", "🫧", "🧁", "🪼", "🐬", "🍀", "🌸", "🌹", "🌷", "🪻", "⭐️", "🪐", "🍓", "🍒", "🍩", "🍷"];

const weeklyCravings = [
  { day: "Sunday", item: "Protein Matcha Latte", icon: "🍵", image: "/images/food/matcha.jpg" },
  { day: "Monday", item: "Acai Bowl", icon: "🫐", image: "/images/food/acai-bowl.jpg" },
  { day: "Tuesday", item: "Tteokbokki", icon: "🌶️", image: "/images/food/tteokbokki.jpg" },
  { day: "Wednesday", item: "Poke", icon: "🐟", image: "/images/food/poke.jpg" },
  { day: "Thursday", item: "Buldak", icon: "🔥", image: "/images/food/buldak.jpg" },
  { day: "Friday", item: "KBBQ", icon: "🥩", image: "/images/food/kbbq.jpg" },
  { day: "Saturday", item: "Malatang (Hot Pot)", icon: "🍲", image: "/images/food/malatang.jpg" }
];

const learningBackgroundImages = [
  "/images/conan/conan-1.jpg",
  "/images/conan/conan-2.jpg",
  "/images/conan/conan-3.jpg",
  "/images/conan/conan-4.jpg",
  "/images/conan/conan-5.jpg",
  "/images/conan/conan-6.jpg"
];

const learningEmojis = ["⭐️", "🌸", "🌷", "🌹", "🍀", "🪼", "🐬", "🐾", "🍓", "🍏", "🍋", "🍒", "🍫", "🎀", "🩵", "❣️", "💕", "🤍", "♥️"];
const heroFloatingEmojis = ["⭐️", "🌸", "🌷", "🐬", "🍓", "🎀", "🩵", "💕"];
const backgroundFloatingEmojis = ["🌸", "⭐️", "🍓", "🪼", "🐬", "🎀", "💕", "🩵", "🌷", "🍒", "🍋", "🤍"];
const backgroundEmojiSpots = [
  { left: "1%", top: "74%" },
  { left: "14%", top: "78%" },
  { left: "24%", top: "72%" },
  { left: "34%", top: "80%" },
  { left: "44%", top: "69%" },
  { left: "54%", top: "82%" },
  { left: "7%", top: "88%" },
  { left: "18%", top: "92%" },
  { left: "29%", top: "86%" },
  { left: "40%", top: "90%" },
  { left: "51%", top: "94%" },
  { left: "60%", top: "88%" }
];

const livedCountryPins = [
  { key: "korea", label: "Korea", left: "88%", top: "36.5%" },
  { key: "japan", label: "Japan", left: "90%", top: "39%" },
  { key: "philippines", label: "Philippines", left: "87%", top: "49%" },
  { key: "hawaii", label: "Hawaii (USA)", left: "10%", top: "47%" },
  { key: "nashville", label: "Nashville (USA)", left: "27%", top: "43%" },
  { key: "california", label: "California (USA)", left: "14%", top: "40%" }
];

const traveledCountries = ["Morocco", "England", "Paris", "Madrid", "Singapore", "Thailand"];

const whitePianoKeys = [
  { note: "C3", freq: 130.81 },
  { note: "D3", freq: 146.83 },
  { note: "E3", freq: 164.81 },
  { note: "F3", freq: 174.61 },
  { note: "G3", freq: 196.0 },
  { note: "A3", freq: 220.0 },
  { note: "B3", freq: 246.94 },
  { note: "C4", freq: 261.63 }
];

const blackPianoKeys = [
  { note: "C#3", freq: 138.59, left: "11%" },
  { note: "D#3", freq: 155.56, left: "23.5%" },
  { note: "F#3", freq: 185.0, left: "48.5%" },
  { note: "G#3", freq: 207.65, left: "61%" },
  { note: "A#3", freq: 233.08, left: "73.5%" }
];

const conanFavorites = [
  {
    name: "Akai Shuichi",
    subtitle: "Calm strategist with insane precision",
    about: "I like Akai because he is quiet, sharp, and always a few steps ahead.",
    image: "/images/conan/favorites/akai.jpg"
  },
  {
    name: "Amuro Tooru",
    subtitle: "Triple-role genius",
    about: "Amuro is one of the most layered characters in the series.",
    image: "/images/conan/favorites/amuro.jpg"
  },
  {
    name: "Gin",
    subtitle: "Cold and iconic villain energy",
    about: "Gin raises the stakes every time he appears.",
    image: "/images/conan/favorites/gin.jpg"
  },
  {
    name: "Kaito Kid",
    subtitle: "Magician thief with style",
    about: "Kaito Kid scenes are always fun, clever, and dramatic.",
    image: "/images/conan/favorites/kaito-kid.jpg"
  },
  {
    name: "Conan (Shinichi)",
    subtitle: "Relentless detective mind",
    about: "Conan is the core reason the story stays so exciting.",
    image: "/images/conan/favorites/conan.jpg"
  }
];

const philosophyItems = [
  "If onboarding takes too long, simplify it first.",
  "Ship quickly, then polish what users touch most.",
  "Great product feels obvious, not noisy."
];

export default function MainHomePage() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isCravingModalOpen, setIsCravingModalOpen] = useState(false);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [isCodingLoreModalOpen, setIsCodingLoreModalOpen] = useState(false);
  const [isPerfectPitchModalOpen, setIsPerfectPitchModalOpen] = useState(false);
  const [isConanModalOpen, setIsConanModalOpen] = useState(false);
  const [isCountriesModalOpen, setIsCountriesModalOpen] = useState(false);
  const [litCountries, setLitCountries] = useState<string[]>([]);
  const [otherTravelCountry, setOtherTravelCountry] = useState("");
  const [extraTravelCountries, setExtraTravelCountries] = useState<string[]>([]);
  const [travelTagPositions, setTravelTagPositions] = useState<Record<string, { left: number; top: number }>>({});
  const [activeConanCharacter, setActiveConanCharacter] = useState(0);
  const pianoContextRef = useRef<AudioContext | null>(null);
  const featuredProject = portfolioProjects.find((project) => project.slug === featuredProjectSlug) ?? portfolioProjects[0];
  const todayCraving = weeklyCravings[new Date().getDay()];
  const [selectedCraving, setSelectedCraving] = useState(todayCraving);
  // Add "currently-learning" to any interest tag in data/interests.tsx to include it in this modal.
  const currentLearningInterests = interests.filter((interest) => interest.tags?.includes("currently-learning"));
  const allTravelCountries = [...traveledCountries, ...extraTravelCountries];
  const [learningEmojiRow, setLearningEmojiRow] = useState<string[]>([]);

  useEffect(() => {
    const pickEight = () => {
      const shuffled = [...learningEmojis].sort(() => Math.random() - 0.5);
      setLearningEmojiRow(shuffled.slice(0, 8));
    };

    pickEight();
    const timer = window.setInterval(pickEight, 2600);
    return () => window.clearInterval(timer);
  }, []);

  const addOtherTravelCountry = () => {
    const trimmed = otherTravelCountry.trim();
    if (!trimmed) {
      return;
    }

    const alreadyExists = allTravelCountries.some((country) => country.toLowerCase() === trimmed.toLowerCase());
    if (alreadyExists) {
      setOtherTravelCountry("");
      return;
    }

    setExtraTravelCountries((current) => [...current, trimmed]);
    setOtherTravelCountry("");
  };

  const playPianoNote = async (frequency: number) => {
    if (!pianoContextRef.current) {
      pianoContextRef.current = new window.AudioContext();
    }

    const context = pianoContextRef.current;
    await context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.9);
  };

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
        setIsCravingModalOpen(false);
        setIsLearningModalOpen(false);
        setIsCodingLoreModalOpen(false);
        setIsPerfectPitchModalOpen(false);
        setIsConanModalOpen(false);
        setIsCountriesModalOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    return () => {
      if (pianoContextRef.current) {
        pianoContextRef.current.close();
        pianoContextRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <BackgroundBlobs />
      <TopNav />
      <main className="relative z-10 mx-auto flex min-h-[calc(100svh-88px)] w-[min(1080px,94vw)] items-start py-4 sm:py-6 lg:py-8">
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

        <section className="relative grid w-full items-start gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {backgroundFloatingEmojis.map((emoji, index) => (
              <motion.span
                key={`bg-emoji-${emoji}-${index}`}
                className="absolute text-[30px] opacity-80"
                style={{
                  left: backgroundEmojiSpots[index % backgroundEmojiSpots.length]?.left ?? "10%",
                  top: backgroundEmojiSpots[index % backgroundEmojiSpots.length]?.top ?? "70%"
                }}
                animate={{ y: [0, -10, 0], rotate: [0, index % 2 ? 8 : -8, 0], opacity: [0.65, 0.95, 0.65] }}
                transition={{ duration: 3 + (index % 4) * 0.5, repeat: Infinity, delay: index * 0.15 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-dreamy sm:p-6 lg:p-8">
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
              <Link
                href="/interests"
                className="rounded-full bg-violet-200 px-4 py-2 text-grape transition hover:-translate-y-0.5"
              >
                Interests
              </Link>
              <Link href="/contact" className="rounded-full bg-white px-4 py-2 text-grape ring-1 ring-rose/30 transition hover:-translate-y-0.5">
                Contact
              </Link>
            </div>

            <div className="relative mt-5 h-16 overflow-hidden rounded-2xl bg-white/45">
              {heroFloatingEmojis.map((emoji, index) => (
                <motion.span
                  key={`${emoji}-${index}`}
                  className="absolute text-xl"
                  style={{ left: `${8 + index * 11}%`, top: `${10 + (index % 3) * 20}%` }}
                  animate={{ y: [0, -8, 0], rotate: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.4 + (index % 4) * 0.4, repeat: Infinity, delay: index * 0.12 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mx-auto aspect-[9/19.5] w-[min(92vw,350px,calc((100svh-9rem)*9/19.5))] sm:min-w-[360px] rounded-[42px] border border-black/40 bg-[#111115] p-3 shadow-[0_20px_45px_rgba(33,15,35,0.45)] lg:ml-auto lg:mr-0 lg:justify-self-end"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-b from-[#ffd9ec] to-[#dff3ff] p-3">
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
                      onClick={() => {
                        setSelectedCraving(todayCraving);
                        setIsCravingModalOpen(true);
                      }}
                      className="w-full rounded-2xl border border-white/45 bg-white/70 p-3 text-left transition hover:-translate-y-0.5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-grape/65">Current Craving</p>
                      <p className="mt-1 text-sm font-semibold text-grape">
                        {todayCraving.icon} {todayCraving.item}
                      </p>
                      <p className="mt-1 text-xs text-grape/75">{todayCraving.day} special</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveProject(featuredProject)}
                      className="w-full rounded-2xl border border-white/45 bg-white/70 p-3 text-left transition hover:-translate-y-0.5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-grape/65">Current Build</p>
                      <p className="mt-1 text-sm font-semibold text-grape">{featuredProject.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-grape/75">{featuredProject.summary}</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsLearningModalOpen(true)}
                      className="w-full rounded-2xl border border-white/45 bg-white/70 p-3 text-left transition hover:-translate-y-0.5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-grape/65">Current Learning</p>
                      <p className="mt-1 text-sm leading-none">{learningEmojiRow.join(" ")}</p>
                      <p className="mt-1 text-xs text-grape/75">Tap to see full list</p>
                    </button>
                  </div>
                </section>

                <section className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/70">Lore Panel</p>
                  <div className="mt-2 space-y-2 text-sm text-grape/85">
                    <button
                      type="button"
                      onClick={() => setIsCodingLoreModalOpen(true)}
                      className="w-full rounded-xl border border-white/50 bg-white/75 px-3 py-2 text-left transition hover:-translate-y-0.5"
                    >
                      I started my professional coding experience in college
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCountriesModalOpen(true)}
                      className="w-full rounded-xl border border-white/50 bg-white/75 px-3 py-2 text-left transition hover:-translate-y-0.5"
                    >
                      I've lived in 4 different countries (guess which ones!).
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPerfectPitchModalOpen(true)}
                      className="w-full rounded-xl border border-white/50 bg-white/75 px-3 py-2 text-left transition hover:-translate-y-0.5"
                    >
                      I have perfect pitch.
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsConanModalOpen(true)}
                      className="w-full rounded-xl border border-white/50 bg-white/75 px-3 py-2 text-left transition hover:-translate-y-0.5"
                    >
                      I&apos;ve been watching Detective Conan since I was 5.
                    </button>
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
              <div className="flex items-center gap-2">
                {activeProject.live !== "#" && (
                  <Link href={activeProject.live} className="rounded-full bg-cloud px-3 py-1 text-xs font-semibold text-grape">
                    Live
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
                >
                  Close
                </button>
              </div>
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
            </div>
          </article>
        </div>
      )}

      {isCravingModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsCravingModalOpen(false)}
          role="presentation"
        >
          <article
            className="w-[min(680px,92vw)] rounded-3xl border border-white/70 bg-gradient-to-b from-[#fff4fb] via-white to-[#eef8ff] p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Current Craving</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">
                {selectedCraving.icon} {selectedCraving.item}
              </h3>
              <button
                type="button"
                onClick={() => setIsCravingModalOpen(false)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>

            <p className="mt-2 text-sm font-semibold text-grape/80">{selectedCraving.day} pick</p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-rose/20 bg-white/80 p-2">
              <img
                src={selectedCraving.image}
                alt={`${selectedCraving.item} photo`}
                onError={(event) => {
                  event.currentTarget.src = "/images/food/matcha.jpg";
                }}
                className="h-[min(52vh,430px)] w-full rounded-xl bg-white object-contain"
              />
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Weekly Menu</p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {weeklyCravings.map((craving) => (
                <button
                  key={craving.day}
                  type="button"
                  onClick={() => setSelectedCraving(craving)}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    craving.day === selectedCraving.day
                      ? "border-rose/40 bg-gradient-to-r from-petal to-cloud font-semibold text-grape"
                      : "border-white/70 bg-white/75 text-grape/85 hover:bg-white"
                  }`}
                >
                  <span>{craving.icon}</span> {craving.day}: {craving.item}
                </button>
              ))}
            </div>
          </article>
        </div>
      )}

      {isLearningModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsLearningModalOpen(false)}
          role="presentation"
        >
          <article
            className="w-[min(680px,92vw)] rounded-3xl border border-white/70 bg-white p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Current Learning</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">Learning Focus Tags</h3>
              <button
                type="button"
                onClick={() => setIsLearningModalOpen(false)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white p-4">
              <div className="flex flex-wrap gap-2">
                {currentLearningInterests.length > 0 ? (
                  currentLearningInterests.map((interest) => (
                    <span
                      key={interest.name}
                      className="rounded-full border border-rose/20 bg-gradient-to-r from-petal to-cloud px-3 py-1.5 text-sm font-semibold text-grape"
                    >
                      {interest.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-grape/80">No tagged interests yet.</p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {learningBackgroundImages.map((src, index) => (
                <div key={src} className="relative overflow-hidden rounded-xl border border-white/70 bg-white/80">
                  <img
                    src={src}
                    alt={`Detective Conan collage ${index + 1}`}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className={`h-28 w-full object-cover ${index % 2 === 0 ? "rotate-1 scale-110" : "-rotate-1 scale-110"}`}
                  />
                </div>
              ))}
            </div>
          </article>
        </div>
      )}

      {isCountriesModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsCountriesModalOpen(false)}
          role="presentation"
        >
          <article
            className="w-[min(760px,94vw)] rounded-3xl border border-white/70 bg-gradient-to-b from-white to-[#f3f9ff] p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Lore Map</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">Countries I Lived In</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLitCountries([]);
                    setTravelTagPositions({});
                    setExtraTravelCountries([]);
                    setOtherTravelCountry("");
                  }}
                  className="rounded-full bg-cloud px-3 py-1 text-xs font-semibold text-grape transition hover:-translate-y-0.5"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsCountriesModalOpen(false)}
                  className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
                >
                  Close
                </button>
              </div>
            </div>

            <p className="mt-2 text-sm text-grape/85">Click each pin to light it up.</p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-2">
              <div
                className="relative"
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const country = event.dataTransfer.getData("text/plain");
                  if (!country) {
                    return;
                  }
                  const rect = event.currentTarget.getBoundingClientRect();
                  const left = ((event.clientX - rect.left) / rect.width) * 100;
                  const top = ((event.clientY - rect.top) / rect.height) * 100;
                  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

                  setTravelTagPositions((current) => ({
                    ...current,
                    [country]: { left: clamp(left, 4, 96), top: clamp(top, 6, 94) }
                  }));
                }}
              >
                <img
                  src="/images/lore/colored-map.png"
                  alt="World map with lived, traveled, and visited countries"
                  className="h-auto w-full rounded-xl object-cover"
                />
                {livedCountryPins.map((pin) => {
                  const isLit = litCountries.includes(pin.key);
                  return (
                    <button
                      key={pin.key}
                      type="button"
                      onClick={() => {
                        setLitCountries((current) =>
                          current.includes(pin.key) ? current.filter((item) => item !== pin.key) : [...current, pin.key]
                        );
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[11px] font-semibold transition ${
                        pin.key === "korea" ? "z-20" : "z-10"
                      } ${
                        isLit
                          ? "border-amber-200 bg-amber-300 text-amber-900 shadow-[0_0_24px_rgba(251,191,36,0.95)]"
                          : "border-white/80 bg-white/80 text-grape/80 hover:bg-white"
                      }`}
                      style={{ left: pin.left, top: pin.top }}
                    >
                      {pin.label}
                    </button>
                  );
                })}

                {Object.entries(travelTagPositions).map(([country, position]) => (
                  <button
                    key={country}
                    type="button"
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData("text/plain", country);
                      event.dataTransfer.effectAllowed = "move";
                    }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border border-rose/30 bg-white/95 px-2 py-1 text-[11px] font-semibold text-grape shadow-sm active:cursor-grabbing"
                    style={{ left: `${position.left}%`, top: `${position.top}%` }}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 text-sm font-semibold text-grape/85">
              Progress: {litCountries.length} / {livedCountryPins.length} lit
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Countries I Traveled</p>
            <p className="mt-1 text-xs text-grape/75">Drag any button onto the map to place it.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {allTravelCountries.map((country) => (
                <button
                  key={country}
                  type="button"
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/plain", country);
                    event.dataTransfer.effectAllowed = "move";
                  }}
                  className="cursor-grab rounded-full border border-rose/20 bg-gradient-to-r from-petal to-cloud px-3 py-1.5 text-sm font-semibold text-grape active:cursor-grabbing"
                >
                  {country}
                </button>
              ))}
            </div>

            <form
              className="mt-3 flex flex-wrap items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                addOtherTravelCountry();
              }}
            >
              <label htmlFor="other-country" className="text-xs font-semibold uppercase tracking-[0.14em] text-grape/70">
                Others
              </label>
              <input
                id="other-country"
                type="text"
                value={otherTravelCountry}
                onChange={(event) => setOtherTravelCountry(event.target.value)}
                placeholder="Type a country..."
                className="min-w-[180px] rounded-full border border-white/70 bg-white px-3 py-1.5 text-sm text-grape outline-none ring-rose/30 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-full bg-cloud px-3 py-1.5 text-sm font-semibold text-grape transition hover:-translate-y-0.5"
              >
                Add
              </button>
            </form>
          </article>
        </div>
      )}

      {isPerfectPitchModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsPerfectPitchModalOpen(false)}
          role="presentation"
        >
          <article
            className="w-[min(760px,94vw)] rounded-3xl border border-white/70 bg-gradient-to-b from-white to-[#f7fbff] p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Lore Detail</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">Perfect Pitch Keyboard</h3>
              <button
                type="button"
                onClick={() => setIsPerfectPitchModalOpen(false)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>

            <p className="mt-2 text-sm text-grape/85">Tap keys from low C to high C.</p>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/70 bg-white p-3">
              <div className="relative mx-auto min-w-[560px] max-w-[680px]">
                <div className="grid grid-cols-8 gap-1">
                  {whitePianoKeys.map((key) => (
                    <button
                      key={key.note}
                      type="button"
                      onClick={() => void playPianoNote(key.freq)}
                      className="h-40 rounded-b-xl border border-slate-300 bg-white text-xs font-semibold text-grape shadow-[inset_0_-6px_0_rgba(0,0,0,0.06)] transition hover:bg-slate-50 active:translate-y-[1px]"
                    >
                      <span className="mt-28 inline-block">{key.note}</span>
                    </button>
                  ))}
                </div>

                {blackPianoKeys.map((key) => (
                  <button
                    key={key.note}
                    type="button"
                    onClick={() => void playPianoNote(key.freq)}
                    className="absolute top-0 z-20 h-24 w-[9%] -translate-x-1/2 rounded-b-lg border border-slate-700 bg-slate-900 text-[10px] font-semibold text-white shadow-lg transition hover:bg-black active:translate-y-[1px]"
                    style={{ left: key.left }}
                  >
                    {key.note}
                  </button>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}

      {isConanModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsConanModalOpen(false)}
          role="presentation"
        >
          <article
            className="w-[min(1080px,96vw)] rounded-3xl border border-white/70 bg-gradient-to-b from-white to-[#f5f9ff] p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Lore Detail</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">Detective Conan</h3>
              <button
                type="button"
                onClick={() => setIsConanModalOpen(false)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
              <section className="rounded-2xl border border-white/70 bg-white p-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-grape/75">why i love conan</h4>
                <p className="mt-2 text-sm leading-relaxed text-grape/85">
                  Detective Conan has mystery, strategy, emotional arcs, and characters with very different motivations.
                  I love how every case feels different while still connecting to a bigger story.
                </p>

                <h4 className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-grape/75">who do i like in conan</h4>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-grape/85">
                  <li>akai shuichi</li>
                  <li>amuro tooru</li>
                  <li>gin</li>
                  <li>kaito kid</li>
                  <li>conan (shinichi)</li>
                </ol>

                <h4 className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-grape/75">
                  who do i think is the smartest in conan
                </h4>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-grape/85">
                  <li>kudo yusaku</li>
                  <li>haneda shukichi</li>
                  <li>conan</li>
                  <li>akai</li>
                  <li>amuro</li>
                  <li>kaito kid</li>
                  <li>everyone else</li>
                  <li>that one stupid inspector</li>
                </ol>
              </section>

              <section className="rounded-2xl border border-white/70 bg-white p-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-grape/75">favorite characters</h4>
                <p className="mt-1 text-xs text-grape/70">Hover a name to learn more. Use arrows to slide through 5 people.</p>

                <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/70">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeConanCharacter * 100}%)` }}
                  >
                    {conanFavorites.map((character, index) => (
                      <img
                        key={character.name}
                        src={character.image}
                        alt={character.name}
                        className="h-56 w-full flex-shrink-0 object-cover"
                        onError={(event) => {
                          event.currentTarget.alt = `Character ${index + 1}`;
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveConanCharacter((current) => (current === 0 ? conanFavorites.length - 1 : current - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-2 py-1 text-xs font-semibold text-grape"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConanCharacter((current) => (current + 1) % conanFavorites.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-2 py-1 text-xs font-semibold text-grape"
                  >
                    ▶
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {conanFavorites.map((character, index) => (
                    <button
                      key={character.name}
                      type="button"
                      onMouseEnter={() => setActiveConanCharacter(index)}
                      onFocus={() => setActiveConanCharacter(index)}
                      onClick={() => setActiveConanCharacter(index)}
                      className={`rounded-xl border px-3 py-2 text-left transition ${
                        activeConanCharacter === index
                          ? "border-rose/30 bg-gradient-to-r from-petal to-cloud"
                          : "border-white/70 bg-white hover:bg-petal/35"
                      }`}
                    >
                      <p className="text-sm font-semibold text-grape">{character.name}</p>
                      <p className="mt-0.5 text-xs text-grape/75">{character.subtitle}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-white/70 bg-white/80 p-3">
                  <p className="text-sm font-semibold text-grape">{conanFavorites[activeConanCharacter].name}</p>
                  <p className="mt-1 text-sm text-grape/85">{conanFavorites[activeConanCharacter].about}</p>
                </div>
              </section>
            </div>
          </article>
        </div>
      )}

      {isCodingLoreModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsCodingLoreModalOpen(false)}
          role="presentation"
        >
          <article
            className="w-[min(680px,92vw)] rounded-3xl border border-white/70 bg-gradient-to-b from-white to-[#fdf4ff] p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Lore Detail</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h3 className="text-3xl font-black text-grape">How I Learned To Code</h3>
              <button
                type="button"
                onClick={() => setIsCodingLoreModalOpen(false)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>

            <p className="mt-3 text-sm text-grape/85">
              I took AP CS in high school and learned to code that way but Vanderbilt University was where I truly
              learned how to code. Thanks to Prof. Roth &amp; Prof. Hemingway!
            </p>

            <div className="mt-4 text-center">
              <a
                href="https://hsproject2016.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-petal px-4 py-2 text-sm font-semibold text-grape transition hover:-translate-y-0.5"
              >
                Visit my high school project
              </a>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
