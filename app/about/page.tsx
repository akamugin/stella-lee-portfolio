import { BackgroundBlobs } from "@/components/background-blobs";
import { TopNav } from "@/components/top-nav";

export default function AboutPage() {
  return (
    <>
      <BackgroundBlobs />
      <TopNav />
      <main className="mx-auto w-[min(980px,94vw)] py-10">
        <section className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-dreamy">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">About</p>
          <h1 className="mt-2 text-4xl font-black text-grape">Stella Lee</h1>
          <p className="mt-2 text-lg font-semibold text-grape/85">SWE @ Meta / Vanderbilt CO&apos;26</p>
          <p className="mt-5 leading-relaxed text-grape/85">
            I&apos;m an <strong>Honors Human and Organizational Development (HOD)</strong> major with a minor in{" "}
            <strong>Computer Science (CS)</strong> at Vanderbilt University. I like turning ideas into real products
            people can actually use. I care a lot about thoughtful details, clean structure, and building experiences
            that feel personal and intuitive.
          </p>
          <p className="mt-4 leading-relaxed text-grape/85">
            That interest pulled me toward <strong>software engineering</strong>. I&apos;m especially drawn to{" "}
            <strong>iOS development</strong> because I enjoy crafting polished mobile experiences that people interact
            with every day. During my internship at <strong>Meta</strong> on the{" "}
            <strong>Instagram Fundraising team</strong>, I got to see what it&apos;s like to build and ship products at
            scale. I really fell in love with iOS development through my first project, <strong>Gong Bu</strong>. It
            started when my Korean professor asked if I could help students learn Korean more easily. One challenge was
            that Korean on paper often feels different from Korean on phones, especially with typography and text
            rendering. Building Gong Bu showed me how thoughtful mobile design can make a real difference in how people
            learn.
          </p>
          <p className="mt-4 leading-relaxed text-grape/85">
            I&apos;m also passionate about <strong>web development</strong>, where I can rapidly prototype, experiment with{" "}
            <strong>interaction design</strong>, and ship ideas that feel both expressive and functional. I&apos;ve helped
            many people improve website design experiences, from <strong>local businesses</strong> in Hawaii to larger
            organizations like <strong>Bank of New York (BNY)</strong>, and I built this website from scratch. Across
            both mobile and web, I just like building things that are useful, intentional, and genuinely enjoyable to
            use.
          </p>
        </section>
      </main>
    </>
  );
}
