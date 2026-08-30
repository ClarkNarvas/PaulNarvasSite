"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const homeDescription =
  "Paul is a Sheffield-based Design Manager and Architectural Technologist who coordinates people, information and design to turn architectural ideas into clear, buildable outcomes.";
const homeDescriptionWords = homeDescription.split(" ");

export function HomeIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const aboutRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const layout = layoutRef.current;
    const name = nameRef.current;
    const title = titleRef.current;
    const role = roleRef.current;
    const about = aboutRef.current;

    if (!section || !layout || !name || !title || !role || !about) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileLayout = window.matchMedia("(max-width: 760px)");

    if (mobileLayout.matches) {
      section.dataset.motionReady = "true";

      const nativeScrollMotion =
        !reducedMotion.matches && CSS.supports("animation-timeline", "scroll()");

      if (nativeScrollMotion) {
        section.dataset.motionMode = "native";

        return () => {
          delete section.dataset.motionMode;
        };
      }

      section.dataset.motionMode = "fallback";
      const work = document.querySelector<HTMLElement>(".home-work");
      const observer = work
        ? new IntersectionObserver(
            ([entry]) => {
              section.dataset.compact = String(entry.isIntersecting);
            },
            { rootMargin: "0px 0px -25% 0px", threshold: 0 },
          )
        : null;

      if (work && observer) observer.observe(work);

      return () => {
        observer?.disconnect();
        delete section.dataset.compact;
        delete section.dataset.motionMode;
      };
    }

    let frame = 0;
    let resizeFrame = 0;
    let measuredWidth = 0;
    let transitionDistance = 1;
    let lastRawProgress = -1;
    let titleScale = 1;
    let nameY = 0;
    let roleY = 0;
    let aboutX = 0;
    let aboutY = 0;

    const render = () => {
      frame = 0;
      const rawProgress = reducedMotion.matches
        ? window.scrollY > 1
          ? 1
          : 0
        : clamp(window.scrollY / transitionDistance, 0, 1);

      if (rawProgress === lastRawProgress) return;
      lastRawProgress = rawProgress;

      const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
      const expanded = 1 - progress;
      const scale = 1 + (titleScale - 1) * expanded;

      name.style.transform = `translate3d(0, ${nameY * expanded}px, 0)`;
      title.style.transform = `scale(${scale})`;
      role.style.transform = `translate3d(0, ${roleY * expanded}px, 0)`;
      about.style.transform = `translate3d(${aboutX * expanded}px, ${aboutY * expanded}px, 0)`;
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      section.dataset.motionReady = "true";
      name.style.transform = "none";
      title.style.transform = "none";
      role.style.transform = "none";
      about.style.transform = "none";

      const titleRect = title.getBoundingClientRect();
      const roleRect = role.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      const viewportWidth = section.clientWidth;
      const viewportHeight = section.offsetHeight;
      const horizontalInset = Math.max(32, viewportWidth * 0.12);
      const availableTitleWidth = viewportWidth - horizontalInset * 2;
      const scaleLimit = viewportWidth <= 760 ? 2.05 : 2.8;

      measuredWidth = viewportWidth;
      transitionDistance = Math.max(1, viewportHeight - layout.offsetHeight);

      titleScale = clamp(availableTitleWidth / titleRect.width, 1, scaleLimit);

      const expandedTitleHeight = titleRect.height * titleScale;
      const titleExpansion = (expandedTitleHeight - titleRect.height) / 2;
      const roleGap = Math.max(10, roleRect.top - titleRect.bottom);
      const groupGap = clamp(viewportHeight * 0.035, 24, 42);
      const expandedGroupHeight =
        expandedTitleHeight + roleGap + roleRect.height + groupGap + aboutRect.height;
      const groupTop = Math.max(88, (viewportHeight - expandedGroupHeight) / 2);
      const targetTitleCenterY = groupTop + expandedTitleHeight / 2;
      const targetAboutCenterY =
        groupTop + expandedTitleHeight + roleGap + roleRect.height + groupGap + aboutRect.height / 2;

      nameY = targetTitleCenterY - (titleRect.top + titleRect.height / 2);
      roleY = titleExpansion;
      aboutX = viewportWidth / 2 - (aboutRect.left + aboutRect.width / 2);
      aboutY = targetAboutCenterY - (aboutRect.top + aboutRect.height / 2);

      lastRawProgress = -1;
      render();
    };

    const handleResize = () => {
      // iOS Safari fires resize events while its address bar collapses. The
      // small viewport units used by the layout stay stable, so only a width
      // change (rotation or a genuine resize) needs a fresh measurement.
      if (Math.abs(section.clientWidth - measuredWidth) < 1 || resizeFrame) return;

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotion.addEventListener("change", measure);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} className="home-intro" aria-labelledby="home-title">
      <div ref={layoutRef} className="home-intro-layout page-shell">
        <div ref={nameRef} className="home-name">
          <div className="home-name-content">
            <h1 ref={titleRef} id="home-title">
              <span>Paul</span> <strong>Narvas</strong>
            </h1>
            <p ref={roleRef} className="home-role">
              Design Manager · Architectural Technologist
            </p>
          </div>
        </div>
        <p ref={aboutRef} className="home-about">
          <span className="home-about-content">
            {homeDescriptionWords.map((word, index) => (
              <span
                className="home-about-word"
                style={{ animationDelay: `${480 + index * 36}ms` }}
                key={`${word}-${index}`}
              >
                {word}{"\u00a0"}
              </span>
            ))}
            <Link href="/profile">
              <span
                className="home-about-word"
                style={{ animationDelay: `${480 + homeDescriptionWords.length * 36}ms` }}
              >
                Profile
              </span>
            </Link>
          </span>
        </p>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <span className="scroll-indicator-rule" />
      </div>
    </section>
  );
}
