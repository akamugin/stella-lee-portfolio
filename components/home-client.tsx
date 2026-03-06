"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SpotifyPill } from "./spotify-pill";

type Spark = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

type AppIcon = {
  href: string;
  title: string;
  icon: string;
  tone: string;
  subtitle: string;
};

const symbols = ["☁️", "🩷", "✨", "🕵️", "🎻", "🎹", "🪄", "🫧", "🧁", "🪼", "🐬", "🍀", "🌸", "🌹", "🌷", "🪻", "⭐️", "🪐", "🍓", "🍒", "🍩", "🍷"];

function seeded(step: number) {
  const x = Math.sin(step * 999) * 10000;
  return x - Math.floor(x);
}

const apps: AppIcon[] = [
  { href: "/home", title: "Home", icon: "🏠", tone: "from-pink-300 to-rose-200", subtitle: "Main homepage" },
  { href: "/about", title: "About", icon: "📘", tone: "from-sky-300 to-blue-200", subtitle: "My story" },
  { href: "/projects", title: "Projects", icon: "🧪", tone: "from-violet-300 to-fuchsia-200", subtitle: "Build portfolio" },
  { href: "/experience", title: "Experience", icon: "🛠️", tone: "from-orange-300 to-amber-200", subtitle: "Career timeline" },
  { href: "/interests", title: "Interests", icon: "🎀", tone: "from-pink-200 to-fuchsia-200", subtitle: "What I love" },
  { href: "/contact", title: "Contact", icon: "💌", tone: "from-emerald-300 to-teal-200", subtitle: "Reach out" }
];

const stars = Array.from({ length: 44 }, (_, id) => ({
  id,
  top: `${seeded(id + 1) * 90 + 3}%`,
  left: `${seeded(id + 101) * 96 + 2}%`,
  delay: seeded(id + 201) * 2
}));

export function HomeClient() {
  const router = useRouter();
  const lockContentRef = useRef<HTMLDivElement | null>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [lockCenterX, setLockCenterX] = useState(0);

  const createSpark = (x: number, y: number) => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const id = Date.now() + Math.floor(Math.random() * 10000);
    setSparks((current) => [...current, { id, x, y, symbol }]);
    window.setTimeout(() => {
      setSparks((current) => current.filter((spark) => spark.id !== id));
    }, 760);
  };

  useEffect(() => {
    const onPageClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-no-spark='true']")) {
        return;
      }
      createSpark(event.clientX, event.clientY);
    };

    document.addEventListener("click", onPageClick);
    return () => document.removeEventListener("click", onPageClick);
  }, []);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const node = lockContentRef.current;
    if (!node) {
      return;
    }

    const updateCenter = () => {
      setLockCenterX(node.clientWidth / 2);
    };

    updateCenter();
    const observer = new ResizeObserver(updateCenter);
    observer.observe(node);
    return () => observer.disconnect();
  }, [unlocked]);

  const lockDate =
    now?.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    }) ?? "Loading date...";

  const lockTime =
    (() => {
      if (!now) {
        return "--:--";
      }
      const formatter = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      const parts = formatter.formatToParts(now);
      return parts
        .filter((part) => part.type !== "dayPeriod")
        .map((part) => part.value)
        .join("")
        .trim();
    })();

  const openApp = (app: AppIcon) => {
    window.setTimeout(() => router.push(app.href), 120);
  };

  return (
    <main className="relative z-10 isolate mx-auto flex min-h-[100svh] w-screen flex-col items-center justify-center px-3 py-3">
      <p className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-petal/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/85 sm:text-xs">
        Click Around The Website
      </p>
      <p className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-petal/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-grape/85 sm:text-xs">
        Click Around The Website
      </p>

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

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute h-2 w-2 rounded-full bg-rose/50"
            style={{ top: star.top, left: star.left }}
            animate={{ y: [0, -8, 0], opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        data-no-spark="true"
        className="relative z-10 w-[min(96vw,calc((100svh-1.5rem)*393/852),378px)] aspect-[393/852] rounded-[52px] border border-black/40 bg-[#0f0f12] p-3 shadow-[0_24px_50px_rgba(36,16,40,0.5)]"
      >
        <div className="absolute left-1/2 top-2 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-black/90" />

        <div className="relative h-full overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-[#ffd7ea] via-[#fcecff] to-[#dff2ff] p-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.4),transparent_32%),radial-gradient(circle_at_30%_90%,rgba(255,255,255,0.35),transparent_38%)]" />

          {!unlocked ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={lockContentRef}
              role="button"
              tabIndex={0}
              onClick={() => setUnlocked(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setUnlocked(true);
                }
              }}
              className="relative z-10 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[30px] border border-white/35 bg-white/15 text-grape backdrop-blur"
              aria-label="Unlock phone"
            >
              <div
                className="relative grid h-full w-full grid-rows-[0.8fr_auto_auto_auto_1fr_auto_auto_0.8fr] text-center"
                style={{ ["--lock-center-x" as string]: `${lockCenterX}px` }}
              >
                <div className="absolute inset-x-0 top-[10%] w-full">
                  <p className="relative left-[var(--lock-center-x)] w-[min(92%,260px)] -translate-x-1/2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">
                    {lockDate}
                  </p>
                  <h2 className="relative left-[var(--lock-center-x)] mt-[3%] w-[min(94%,300px)] -translate-x-1/2 whitespace-nowrap text-center text-[clamp(2.4rem,14vw,4.6rem)] font-black leading-none">
                    {lockTime}
                  </h2>
                </div>
                <div className="absolute inset-x-0 top-[40%] w-full -translate-y-1/2">
                  <h1 className="relative left-[var(--lock-center-x)] w-[min(92%,280px)] -translate-x-1/2 text-center text-[clamp(1.55rem,7vw,2.7rem)] font-black leading-[0.96] tracking-[-0.02em] text-grape">
                    Stella&apos;s Portfolio
                  </h1>
                </div>
                <div className="absolute inset-x-0 top-[60%] -translate-y-1/2">
                  <p className="relative left-[var(--lock-center-x)] flex w-[min(82%,260px)] -translate-x-1/2 items-center justify-center rounded-full bg-white/65 px-7 py-2 text-sm font-semibold">
                    <span className="text-center">Tap To Unlock</span>
                    <span className="absolute right-5 top-1/2 -translate-y-1/2">✨</span>
                  </p>
                </div>
                <div className="absolute inset-x-0 top-[75%] -translate-y-1/2 w-full">
                  <p className="relative left-[var(--lock-center-x)] w-[min(92%,250px)] -translate-x-1/2 whitespace-pre-line text-center text-xs text-grape/80">
                    {"Welcome to my phone!\nPlease feel free to click through different pages to learn more about me!"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex h-full flex-col pt-16"
            >
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-white/55 px-3 py-2 text-xs font-semibold text-grape/80 backdrop-blur">
                <span>Profile</span>
                <span>Stella Lee</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {apps.map((app) => (
                  <button
                    key={app.href}
                    type="button"
                    onClick={() => openApp(app)}
                    className="group rounded-2xl border border-white/45 bg-white/45 p-2 text-center backdrop-blur transition hover:-translate-y-0.5"
                  >
                    <span
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${app.tone} text-xl shadow`}
                    >
                      {app.icon}
                    </span>
                    <span className="mt-1 block text-[11px] font-semibold text-grape">{app.title}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/45 bg-white/45 p-3 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-grape/70">Profile</p>
                <p className="mt-1 text-lg font-bold text-grape">Stella Lee</p>
                <p className="text-xs text-grape/80">SWE @ Meta</p>
                <img
                  src="/images/profile/kaito.png"
                  alt="Stella Lee profile"
                  className="mt-3 h-24 w-full rounded-xl object-cover object-center"
                />
              </div>

              <button
                type="button"
                onClick={() => setUnlocked(false)}
                className="mt-auto self-center rounded-full bg-black/75 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white"
              >
                Lock Screen
              </button>
            </motion.div>
          )}

          <div
            className={`absolute left-1/2 z-20 w-[75%] max-w-[260px] -translate-x-1/2 ${
               unlocked ? "top-6" : "top-[88%] -translate-y-1/2"
            }`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <SpotifyPill />
          </div>
        </div>
      </motion.section>
    </main>
  );
}
