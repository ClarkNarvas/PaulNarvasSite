"use client";

import { useState, type ReactNode } from "react";
import type { ProjectCategory } from "@/data/projects";

type Filter = "All work" | ProjectCategory;
type FilterOption = { label: Filter; count: number };

export function ProjectFilterControls({
  children,
  options
}: {
  children: ReactNode;
  options: FilterOption[];
}) {
  const [filter, setFilter] = useState<Filter>("All work");
  const visibleCount = options.find((option) => option.label === filter)?.count ?? 0;

  return (
    <div className="project-filter" data-filter={filter}>
      <div className="project-filters" aria-label="Filter projects">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={filter === option.label}
            onClick={() => setFilter(option.label)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {visibleCount} {visibleCount === 1 ? "project" : "projects"}
      </p>
      <div className="project-grid">{children}</div>
    </div>
  );
}
