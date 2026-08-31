import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProjectViewer } from "@/components/ProjectViewer";
import { getProject, projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/site";
import { createProjectStructuredData } from "@/lib/structuredData";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    excludeImagesFromSearch: true
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd data={createProjectStructuredData(project)} />
      <ProjectViewer project={project} next={next} />
    </>
  );
}
