import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import { createOpenGraphImage, openGraphSize } from "@/lib/createOpenGraphImage";

export const alt = "Selected project by Paul Narvas";
export const size = openGraphSize;
export const contentType = "image/png";

type ProjectImageProps = { params: Promise<{ slug: string }> };

export default async function Image({ params }: ProjectImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return createOpenGraphImage({
    label: project.category,
    title: project.title,
    description: project.summary,
    meta: [project.location, project.year].filter(Boolean).join(" · ")
  });
}
