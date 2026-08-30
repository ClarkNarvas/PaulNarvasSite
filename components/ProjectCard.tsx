import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card" data-category={project.category}>
      <Link href={`/work/${project.slug}`} className="project-card-link">
        <div className="project-card-image">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            preload={priority}
            sizes="(max-width: 760px) 100vw, 50vw"
            style={{ objectPosition: project.imagePosition ?? "center" }}
          />
        </div>
        <div className="project-card-copy">
          <div className="project-card-heading">
            <h3>{project.title}</h3>
            <p className="project-card-category">{project.category}</p>
          </div>
          <p className="project-card-summary">{project.summary}</p>
          <p className="project-card-meta">
            {project.location ? <span>{project.location}</span> : null}
            <span>{project.year}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
