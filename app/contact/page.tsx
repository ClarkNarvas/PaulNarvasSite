import type { Metadata } from "next";
import { ExternalLinkIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact", description: "Contact Paul Narvas about architecture, design management and technical design work." };

export default function ContactPage() {
  return (
    <section className="contact-page page-shell">
      <p className="page-kicker">Contact</p>
      <h1>Paul Narvas</h1>
      <p>For collaborations, technical design support or new opportunities.</p>
      <a className="contact-primary" href="mailto:paul@narvas.co.uk">paul@narvas.co.uk</a>
      <div className="contact-links">
        <span>Sheffield, United Kingdom</span>
        <a href="https://www.linkedin.com/in/paulnarvas/" target="_blank" rel="noreferrer">LinkedIn <ExternalLinkIcon /></a>
      </div>
    </section>
  );
}
