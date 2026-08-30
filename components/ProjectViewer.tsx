import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectViewerShell } from "./ProjectViewerShell";

type NextProject = Pick<Project, "slug" | "title">;

function ProjectInformation({ project, next }: { project: Project; next: NextProject }) {
  const overviewTitleId = `${project.slug}-overview-title`;
  const capabilitiesTitleId = `${project.slug}-capabilities-title`;

  return (
    <div className="project-information">
      <div>
        <p className="project-information-category">{project.category}</p>
        <h1 id="project-title">{project.title}</h1>
        <div className="project-information-meta">
          <p>{project.location ?? "Selected archive"}</p>
          <p>{project.year}</p>
        </div>
      </div>

      <div className="project-information-copy">
        <section aria-labelledby={overviewTitleId}>
          <h2 id={overviewTitleId}>Project overview</h2>
          <p className="project-information-summary">{project.summary}</p>
          <p>{project.detail}</p>
        </section>
        <section aria-labelledby={capabilitiesTitleId}>
          <h2 id={capabilitiesTitleId}>Scope and capabilities</h2>
          <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
        </section>
      </div>

      <Link className="project-information-next" href={`/work/${next.slug}`}>
        <span>Next project</span>
        <strong>{next.title}</strong>
      </Link>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.documentPreview) {
    const { pageCount, path } = project.documentPreview;
    const pages = Array.from(
      { length: pageCount },
      (_, index) => `${path}/page-${String(index + 1).padStart(2, "0")}.jpg`
    );

    return (
      <div className="project-pdf-pages" role="document" aria-label={`${project.title} project PDF`}>
        {pages.map((source, index) => {
          const pageNumber = index + 1;
          const alt = project.documentPreview?.pageLabels?.[pageNumber]
            ?? `${project.title} architectural drawing sheet ${pageNumber}`;

          return (
          <figure
            className="project-pdf-page"
            key={source}
            aria-label={`Page ${index + 1} of ${pages.length}`}
          >
            <Image
              src={source}
              alt={alt}
              fill
              preload={index === 0}
              fetchPriority={index === 0 ? "high" : undefined}
              sizes="(max-width: 760px) 100vw, 75vw"
            />
            <figcaption className="sr-only">{alt}</figcaption>
          </figure>
          );
        })}
      </div>
    );
  }

  const media = project.gallery?.length ? project.gallery : [project.image];

  return (
    <div className="project-media-archive" aria-label={`${project.title} image archive`}>
      {media.map((item, index) => (
        <figure key={item.src}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            preload={index === 0}
            fetchPriority={index === 0 ? "high" : undefined}
            sizes="(max-width: 760px) 100vw, 75vw"
          />
          {item.caption ? <figcaption className="project-media-caption">{item.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export function ProjectViewer({ project, next }: { project: Project; next: NextProject }) {
  return (
    <ProjectViewerShell
      title={project.title}
      hasDocument={Boolean(project.documentPreview)}
      information={<ProjectInformation project={project} next={next} />}
      media={<ProjectMedia project={project} />}
    />
  );
}
