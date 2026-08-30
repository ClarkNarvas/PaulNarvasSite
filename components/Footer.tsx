import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Paul Narvas</p>
      <nav aria-label="Footer navigation">
        <Link href="/#work">Work</Link>
        <Link href="/profile">Profile</Link>
        <a href="mailto:paul@narvas.co.uk">Email</a>
      </nav>
    </footer>
  );
}
