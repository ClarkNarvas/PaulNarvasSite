"use client";

import { useState } from "react";
import { categories, projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = "All work" | ProjectCategory;

export function ProjectFilter() {
  const [filter, setFilter] = useState<Filter>("All work");
  const visible = filter === "All work" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <div className="project-filters" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="project-grid">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index < 2} />
        ))}
      </div>
    </>
  );
}
