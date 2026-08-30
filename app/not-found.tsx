import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found page-shell">
      <p>404</p>
      <h1>Page not found.</h1>
      <Link className="text-link" href="/#work">Return to work</Link>
    </section>
  );
}
