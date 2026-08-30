import type { Metadata } from "next";
import Image from "next/image";
import { DownloadIcon, ExternalLinkIcon } from "@/components/Icons";
import { cvProfile } from "@/data/cv";

export const metadata: Metadata = {
  title: "Profile",
  description: "Experience, education and design approach of Design Manager and Architectural Technologist Paul Narvas."
};

const experience = cvProfile.experience.map((item) => ({
  years: item.period,
  title: `${item.role} · ${item.organisation}`
}));

const education = cvProfile.education.map((item) => ({
  years: item.period,
  title: item.qualification,
  place: item.institution
}));

export default function ProfilePage() {
  return (
    <div className="profile-page page-shell">
      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-hero-image">
          <Image src="/media/paul-portrait.png" alt="Portrait of Paul Narvas" fill preload sizes="(max-width: 760px) 100vw, 42vw" />
        </div>
        <div className="profile-hero-copy">
          <p className="page-kicker">Profile</p>
          <h1 id="profile-title">Paul Narvas</h1>
          <p className="profile-role">MSc, BSc (Hons), ACIAT</p>
          <p className="profile-lede">A Sheffield-based Design Manager and Architectural Technologist, originally from the Philippines, with experience coordinating multidisciplinary teams and translating ambitious ideas into practical, buildable design.</p>
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
            {experience.map((item) => (
              <article key={`${item.years}-${item.title}`}>
                <p>{item.years}</p>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div className="education-list">
            {education.map((item) => (
              <article key={item.title}>
                <p>{item.years}</p>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
