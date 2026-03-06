import { BackgroundBlobs } from "@/components/background-blobs";
import { TopNav } from "@/components/top-nav";

export default function ContactPage() {
  return (
    <>
      <BackgroundBlobs />
      <TopNav />
      <main className="relative z-10 mx-auto w-[min(980px,94vw)] py-10">
        <section className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-dreamy">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape/70">Contact</p>
          <h1 className="mt-2 text-4xl font-black text-grape">Let&apos;s Connect!</h1>
          <p className="mt-3 text-grape/80">Open to software engineering, product, and creative technology opportunities.</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <a
              className="rounded-full bg-petal px-4 py-2 text-grape hover:shadow-dreamy"
              href="mailto:chaewon.lee.stella@gmail.com"
            >
              chaewon.lee.stella@gmail.com
            </a>
            <a
              className="rounded-full bg-cloud px-4 py-2 text-grape hover:shadow-dreamy"
              href="https://github.com/akamugin"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="rounded-full bg-white px-4 py-2 text-grape ring-1 ring-rose/30 hover:shadow-dreamy"
              href="https://www.linkedin.com/in/stella-lee8/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
