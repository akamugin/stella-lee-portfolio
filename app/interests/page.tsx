"use client";

import { BackgroundBlobs } from "@/components/background-blobs";
import { TopNav } from "@/components/top-nav";
import { useEffect, useState } from "react";

type InterestItem = {
  name: string;
  details: React.ReactNode;
};

const interests: InterestItem[] = [
  { name: "iOS App Development", details: "Check out my Personal Projects page! A lot of my projects are related to iOS App Development." },
  { name: "Web Development", details: "Check out my Personal Projects page! I have some projects related to Web Dev." },
  { name: "Data Analysis", details: "Thank you Kaggle." },
  { name: "Cloud Computing", details: "I got interested in cloud computing after taking a class on it." },
  { name: "Language Learning", details: "Favorite hobby!" },
  { name: "Creative Writing", details: "I love writing mystery novels, but they are cringe"},
  { name: "Astronomy", details: "It used to be my minor" },
  { name: "Fitness", details: "I love 15 lbs!" },
  { name: "Bouldering", details: "I don't have a bouldering gym pass yet" },
  {
    name: "Musical Instruments",
    details: (
      <div className="space-y-3">
        <p><strong>Piano, Violin, Viola, Guitar, Flute, Ukulele, Harp</strong></p>
        <p>
          <strong>Piano:</strong> I started playing the piano when I was 5. Piano has always been something deeply
          personal to me and one of my most consistent creative outlets.
        </p>
        <p>
          <strong>Violin:</strong> I started when I was in 4th grade. At that point, I was so sick of piano that I
          wanted to try something new and picked up a violin.
        </p>
        <p>
          <strong>Viola:</strong> I only started playing the viola because my violin teacher needed some extra cash,
          but then I became a viola principal in our school orchestra during my sophomore year in high school.
        </p>
        <p>
          <strong>Guitar:</strong> I started self-teaching myself guitar in 6th grade because that&apos;s what my dad
          did when he was in 6th grade too. He kind of just handed me a guitar and told me to teach myself. I realized
          how much I enjoy teaching myself things, and it gave me confidence that I can learn almost anything quickly if
          I really lock in. Later, my worship leader at church taught me more basics, and I joined my middle school
          guitar club to practice weekly. Not a lot of people know I play guitar, but I&apos;d say I reached a level
          where I can hear most songs and probably play them on guitar (with a capo!).
        </p>
        <p>
          <strong>Flute:</strong> I taught myself flute when my family bought a guitar bundle and it came with a flute.
          I didn&apos;t want to waste it, so I learned on YouTube and then kind of forgot about it until college. My
          friend was a flute major and took me to her music pedagogy class, and her classmates taught me flute there. It
          was so fun that I started picking it back up.
        </p>
        <p>
          <strong>Ukulele:</strong> I enjoy ukulele for casual playing, quick melody ideas, and just having fun with
          music.
        </p>
        <p>
          <strong>Harp:</strong> I got lessons from actual college harp professors. It&apos;s fun.
        </p>
      </div>
    )
  },
  { name: "Reading", details: "Incline walk while reading - love = 0. Check out my app called My Bookie!" },
  { name: "Sketching", details: "I don't actually consider this my hobby" },
  { name: "Detective Conan", details: "Something I liked since I was 5." },
  { name: "Cinnamoroll", details: "Aren't they so cute" },
  { name: "Harry Potter", details: "I read the entire series" },
  { name: "Figure Skating", details: "I started in college!" }
];

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
      <main className="mx-auto w-[min(980px,94vw)] py-10">
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
