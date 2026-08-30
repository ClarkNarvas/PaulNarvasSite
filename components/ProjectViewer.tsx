"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { ExpandIcon, ZoomInIcon, ZoomOutIcon } from "./Icons";

type NextProject = Pick<Project, "slug" | "title">;

function ProjectInformation({ project, next, titleId }: { project: Project; next: NextProject; titleId: string }) {
  return (
    <div className="project-information">
      <div>
        <p className="project-information-category">{project.category}</p>
        <h1 id={titleId}>{project.title}</h1>
        <div className="project-information-meta">
          <p>{project.location ?? "Selected archive"}</p>
          <p>{project.year}</p>
        </div>
      </div>

      <div className="project-information-copy">
        <p className="project-information-summary">{project.summary}</p>
        <p>{project.detail}</p>
        <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
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
        {pages.map((source, index) => (
          <figure
            className="project-pdf-page"
            key={source}
            aria-label={`Page ${index + 1} of ${pages.length}`}
          >
            <Image
              src={source}
              alt={`${project.title}, document page ${index + 1}`}
              fill
              preload={index === 0}
              sizes="(max-width: 760px) 100vw, 75vw"
            />
          </figure>
        ))}
      </div>
    );
  }

  const media = project.gallery?.length ? project.gallery : [project.image];

  return (
    <div className="project-media-archive" aria-label={`${project.title} image archive`}>
      {media.map((source, index) => (
        <figure key={source}>
          <Image
            src={source}
            alt={`${project.title} view ${index + 1}`}
            fill
            preload={index === 0}
            sizes="(max-width: 760px) 100vw, 75vw"
          />
        </figure>
      ))}
    </div>
  );
}

export function ProjectViewer({ project, next }: { project: Project; next: NextProject }) {
  const [expanded, setExpanded] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const zoomLevels = [1, 1.25, 1.5, 2];
  const zoom = zoomLevels[zoomIndex];
  const documentStyle = {
    "--document-zoom-width": `${zoom * 100}%`,
    "--document-page-height": `${zoom * 100}svh`
  } as CSSProperties;

  return (
    <article className="project-viewer" data-information-expanded={expanded}>
      <aside className="project-information-desktop" aria-labelledby="project-title-desktop">
        <ProjectInformation project={project} next={next} titleId="project-title-desktop" />
      </aside>

      <section className="project-document-view" aria-label={`${project.title} project document`} style={documentStyle}>
        <ProjectMedia project={project} />
        {project.documentPreview ? (
          <div className="document-zoom-controls" role="group" aria-label="Document zoom">
            <button
              type="button"
              aria-label="Zoom out"
              disabled={zoomIndex === 0}
              onClick={() => setZoomIndex((current) => Math.max(0, current - 1))}
            >
              <ZoomOutIcon />
            </button>
            <output aria-live="polite" aria-label="Current zoom">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              aria-label="Zoom in"
              disabled={zoomIndex === zoomLevels.length - 1}
              onClick={() => setZoomIndex((current) => Math.min(zoomLevels.length - 1, current + 1))}
            >
              <ZoomInIcon />
            </button>
          </div>
        ) : null}
      </section>

      <aside className="project-information-drawer" data-expanded={expanded} aria-labelledby="project-title-mobile">
        <button
          className="project-information-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="mobile-project-information"
          onClick={() => setExpanded((current) => !current)}
        >
          <span>
            <strong>Project information</strong>
          </span>
          <ExpandIcon expanded={expanded} />
        </button>
        <div
          id="mobile-project-information"
          className="project-information-scroll"
          aria-hidden={!expanded}
          inert={!expanded}
        >
          <ProjectInformation project={project} next={next} titleId="project-title-mobile" />
        </div>
      </aside>
    </article>
  );
}
