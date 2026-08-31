import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1
    },
    { url: absoluteUrl("/profile"), changeFrequency: "yearly", priority: 0.7, images: [absoluteUrl("/media/paul-portrait.png")] },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.7
    }))
  ];
}
