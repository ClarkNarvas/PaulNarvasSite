import { cvProfile } from "@/data/cv";
import type { Project } from "@/data/projects";
import { absoluteUrl, PERSON_ID, SITE_DESCRIPTION, SITE_NAME, SITE_ROOT, WEBSITE_ID } from "@/lib/site";

const currentExperience = cvProfile.experience.find((item) => item.period === "Present");

const personIdentityStructuredData = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: cvProfile.name,
  url: SITE_ROOT,
  image: absoluteUrl("/media/paul-portrait.png"),
  description: cvProfile.profile,
  jobTitle: cvProfile.title,
  sameAs: [`https://${cvProfile.linkedin}/`],
  workLocation: {
    "@type": "Place",
    name: cvProfile.location
  }
};

export const personStructuredData = {
  ...personIdentityStructuredData,
  knowsAbout: cvProfile.expertise,
  worksFor: currentExperience
    ? {
        "@type": "Organization",
        name: currentExperience.organisation
      }
    : undefined,
  alumniOf: cvProfile.education.map((item) => ({
    "@type": "EducationalOrganization",
    name: item.institution
  })),
  hasCredential: cvProfile.education.map((item) => ({
    "@type": "EducationalOccupationalCredential",
    name: item.qualification,
    recognizedBy: {
      "@type": "EducationalOrganization",
      name: item.institution
    }
  }))
};

export const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_ROOT,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-GB",
      publisher: { "@id": PERSON_ID }
    },
    personIdentityStructuredData
  ]
};

export const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absoluteUrl("/profile")}#profile-page`,
  url: absoluteUrl("/profile"),
  name: `Profile — ${SITE_NAME}`,
  description: cvProfile.profile,
  inLanguage: "en-GB",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: personStructuredData
};

export function createProjectStructuredData(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.title,
    headline: project.title,
    description: project.summary,
    abstract: project.detail,
    inLanguage: "en-GB",
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
    genre: project.category,
    keywords: project.services,
    temporalCoverage: project.year,
    contentLocation: project.location
      ? {
          "@type": "Place",
          name: project.location
        }
      : undefined
  };
}
