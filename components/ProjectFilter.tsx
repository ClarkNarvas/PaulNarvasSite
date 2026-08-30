import { categories, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilterControls } from "./ProjectFilterControls";

export function ProjectFilter() {
  const options = categories.map((category) => ({
    label: category,
    count: category === "All work"
      ? projects.length
      : projects.filter((project) => project.category === category).length
  }));

  return (
    <ProjectFilterControls options={options}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} priority={index < 2} />
      ))}
    </ProjectFilterControls>
  );
}
