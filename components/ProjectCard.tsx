import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card">
      <Link href={`/work/${project.slug}`} className="project-card-link" aria-label={`View ${project.title}`}>
        <div className="project-card-image">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            preload={priority}
            sizes="(max-width: 760px) 100vw, 50vw"
            style={{ objectPosition: project.imagePosition ?? "center" }}
          />
        </div>
        <div className="project-card-copy">
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
      </Link>
    </article>
  );
}
