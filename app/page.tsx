import { HomeIntro } from "@/components/HomeIntro";
import { ProjectFilter } from "@/components/ProjectFilter";

export default function HomePage() {
  return (
    <>
      <HomeIntro />

      <section id="work" className="home-work page-shell" aria-labelledby="work-title">
        <h2 id="work-title">Selected work</h2>
        <ProjectFilter />
      </section>
    </>
  );
}
