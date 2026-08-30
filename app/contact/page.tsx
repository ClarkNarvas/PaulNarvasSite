import type { Metadata } from "next";
import { ExternalLinkIcon } from "@/components/Icons";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Paul Narvas",
  description: "Contact Sheffield-based Design Manager and Architectural Technologist Paul Narvas about architecture, design management and technical design work.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <section className="contact-page page-shell">
      <p className="page-kicker">Contact</p>
      <h1>Contact Paul Narvas</h1>
      <p>Sheffield-based Design Manager and Architectural Technologist. Get in touch about collaborations, technical design support or new opportunities.</p>
      <a className="contact-primary" href="mailto:paul@narvas.co.uk">paul@narvas.co.uk</a>
      <div className="contact-links">
        <span>Sheffield, United Kingdom</span>
        <a href="https://www.linkedin.com/in/paulnarvas/" target="_blank" rel="noreferrer">LinkedIn <ExternalLinkIcon /></a>
      </div>
    </section>
  );
}
