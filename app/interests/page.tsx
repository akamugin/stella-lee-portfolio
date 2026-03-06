"use client";

import { BackgroundBlobs } from "@/components/background-blobs";
import { TopNav } from "@/components/top-nav";
import { interests, type InterestItem } from "@/data/interests";
import { useEffect, useState } from "react";

export default function InterestsPage() {
  const [activeInterest, setActiveInterest] = useState<InterestItem | null>(null);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveInterest(null);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <>
      <BackgroundBlobs />
      <TopNav />
      <main className="relative z-10 mx-auto w-[min(980px,94vw)] py-10">
        <section className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-dreamy">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">Interests</p>
          <h1 className="mt-2 text-4xl font-black text-grape">Creative and Technical Interests</h1>
          <p className="mt-3 text-grape/80">
            Click any interest to open its own modal and add your detailed write-up.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest.name}
                type="button"
                onClick={() => setActiveInterest(interest)}
                className="rounded-full border border-rose/20 bg-gradient-to-r from-petal to-cloud px-4 py-2 text-sm font-semibold text-grape"
              >
                {interest.name}
              </button>
            ))}
          </div>
        </section>
      </main>

      {activeInterest && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setActiveInterest(null)}
          role="presentation"
        >
          <article
            className="w-[min(700px,92vw)] rounded-3xl border border-white/70 bg-white p-6 shadow-[0_22px_45px_rgba(29,14,39,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape/70">Interest Details</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h2 className="text-3xl font-black text-grape">{activeInterest.name}</h2>
              <button
                type="button"
                onClick={() => setActiveInterest(null)}
                className="rounded-full bg-petal px-3 py-1 text-xs font-semibold text-grape"
              >
                Close
              </button>
            </div>
            <div className="mt-4 text-sm leading-relaxed text-grape/85">{activeInterest.details}</div>
          </article>
        </div>
      )}
    </>
  );
}
