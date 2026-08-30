"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ExpandIcon, ZoomInIcon, ZoomOutIcon } from "./Icons";

const zoomLevels = [1, 1.25, 1.5, 2];

export function ProjectViewerShell({
  hasDocument,
  information,
  media,
  title
}: {
  hasDocument: boolean;
  information: ReactNode;
  media: ReactNode;
  title: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const toggleButton = useRef<HTMLButtonElement>(null);
  const zoom = zoomLevels[zoomIndex];
  const documentStyle = {
    "--document-zoom-width": `${zoom * 100}%`,
    "--document-page-height": `${zoom * 100}svh`
  } as CSSProperties;

  useEffect(() => {
    if (!expanded) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setExpanded(false);
      toggleButton.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [expanded]);

  return (
    <article className="project-viewer" data-information-expanded={expanded}>
      <aside className="project-information-panel" data-expanded={expanded} aria-labelledby="project-title">
        <button
          ref={toggleButton}
          className="project-information-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="project-information-content"
          onClick={() => setExpanded((current) => !current)}
        >
          <strong>Project information</strong>
          <ExpandIcon expanded={expanded} />
        </button>
        <div id="project-information-content" className="project-information-scroll">
          {information}
        </div>
      </aside>

      <section className="project-document-view" aria-label={`${title} project document`} style={documentStyle}>
        {media}
        {hasDocument ? (
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
    </article>
  );
}
