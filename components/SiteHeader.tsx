"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BackIcon, CloseIcon } from "./Icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" }
];

function isActive(pathname: string, href: string) {
  if (href === "/#work") return pathname.startsWith("/work");
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/work/");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menu.current) return;
      const focusable = Array.from(menu.current.querySelectorAll<HTMLElement>("a, button:not([disabled])"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="desktop-nav-shell">
        <Link
          className="desktop-back-button"
          href="/#work"
          aria-label="Back to work"
          aria-hidden={!isProjectPage}
          data-visible={isProjectPage}
          tabIndex={isProjectPage ? undefined : -1}
        >
          <BackIcon />
        </Link>
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="Paul Narvas home">
            <span>Paul</span> <strong>Narvas</strong>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>

      <div className="mobile-nav-controls" data-context={isProjectPage ? "project" : "site"}>
        {isProjectPage ? (
          <Link className="mobile-back-button" href="/#work" aria-label="Back to work">
            <BackIcon />
          </Link>
        ) : null}
        <button
          ref={menuButton}
          className="mobile-menu-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      <div
        ref={menu}
        id="mobile-navigation"
        className="mobile-menu"
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Site navigation"
        aria-hidden={!open}
        data-state={open ? "open" : "closed"}
        inert={!open}
      >
        <div className="mobile-menu-top">
          <Link href="/" onClick={() => setOpen(false)}>Paul <strong>Narvas</strong></Link>
          <button ref={closeButton} type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <ol>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} aria-current={isActive(pathname, link.href) ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu-footer">
          <a href="mailto:paul@narvas.co.uk">paul@narvas.co.uk</a>
        </div>
      </div>
    </>
  );
}
