import type { Metadata } from "next";

export const SITE_URL = "https://www.paulnarvas.com";
export const SITE_ROOT = `${SITE_URL}/`;
export const SITE_NAME = "Paul Narvas";
export const SITE_TITLE = "Paul Narvas — Design Manager & Architectural Technologist";
export const SITE_DESCRIPTION =
  "Selected architecture, technical design, design management and visualisation work by Sheffield-based Paul Narvas.";
export const PERSON_ID = `${SITE_ROOT}#paul-narvas`;
export const WEBSITE_ID = `${SITE_ROOT}#website`;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website"
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}
