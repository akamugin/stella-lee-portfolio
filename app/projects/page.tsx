import { BackgroundBlobs } from "@/components/background-blobs";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { featuredProjectSlug, portfolioProjects } from "@/data/projects";
import { TopNav } from "@/components/top-nav";

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
        <ProjectsShowcase projects={portfolioProjects} featuredProjectSlug={featuredProjectSlug} />
      </main>
    </>
  );
}
