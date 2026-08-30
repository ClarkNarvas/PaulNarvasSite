import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import { createOpenGraphImage, openGraphSize } from "@/lib/createOpenGraphImage";

type ProjectImageProps = { params: Promise<{ slug: string }> };

export async function generateImageMetadata({ params }: ProjectImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return [];

  return [
    {
      id: "project",
      alt: `${project.title} project by Paul Narvas`,
      size: openGraphSize,
      contentType: "image/png"
    }
  ];
}

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
