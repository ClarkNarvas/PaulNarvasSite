import type { Metadata } from "next";
import Image from "next/image";
import { DownloadIcon, ExternalLinkIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { cvProfile } from "@/data/cv";
import { createPageMetadata } from "@/lib/site";
import { profileStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = createPageMetadata({
  title: "Profile",
  description: "Experience, education and design approach of Design Manager and Architectural Technologist Paul Narvas.",
  path: "/profile"
});

export default function ProfilePage() {
  return (
    <div className="profile-page page-shell">
      <JsonLd data={profileStructuredData} />
      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-hero-image">
          <Image src="/media/paul-portrait.png" alt="Portrait of Paul Narvas" fill preload sizes="(max-width: 760px) 100vw, 42vw" />
        </div>
        <div className="profile-hero-copy">
          <p className="page-kicker">Profile</p>
          <h1 id="profile-title">Paul Narvas</h1>
          <p className="profile-role">MSc, BSc (Hons), ACIAT</p>
          <p className="profile-lede">{cvProfile.profile}</p>
          <div className="profile-links">
            <a className="profile-cv-button" href="/api/cv" download>
              CV <DownloadIcon />
            </a>
            <a href="https://www.linkedin.com/in/paulnarvas/" target="_blank" rel="noreferrer">LinkedIn <ExternalLinkIcon /></a>
          </div>
        </div>
      </section>

      <div className="profile-details">
        <section aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <div className="timeline">
            {cvProfile.experience.map((item) => (
              <article key={`${item.period}-${item.role}-${item.organisation}`}>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-content">
                  <h3>{item.role} · {item.organisation}</h3>
                  {item.location ? <p className="timeline-location">{item.location}</p> : null}
                  <p className="timeline-summary">{item.summary}</p>
                  {item.highlights?.length ? (
                    <ul>
                      {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="profile-sidebar">
          <section aria-labelledby="approach-title">
            <h2 id="approach-title">Approach</h2>
            <p className="profile-approach">{cvProfile.approach}</p>
          </section>

          <section aria-labelledby="expertise-title">
            <h2 id="expertise-title">Expertise</h2>
            <ul className="expertise-list">
              {cvProfile.expertise.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            <div className="education-list">
              {cvProfile.education.map((item) => (
                <article key={item.qualification}>
                  <p>{item.period}</p>
                  <h3>{item.qualification}</h3>
                  <p>{item.institution}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
