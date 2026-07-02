"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TreeLogo from "./TreeLogo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Projects" },
  { href: "/events", label: "Events & Debates" },
  { href: "/blogs", label: "Blogs" },
  { href: "/assessment", label: "Moral Assessment Form" },
  { href: "/contact", label: "Contact Us" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 9H15V6.5h-2c-1.93 0-3 1.07-3 3V11H8v2.5h2V21h3v-7.5h2.2l.3-2.5H13v-1.2c0-.5.2-.8.5-.8z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8zm0 5.3a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM16.4 8.6a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM12 5.5c-1.77 0-1.99.01-2.68.04-.7.03-1.17.14-1.59.3-.43.17-.8.4-1.16.76-.36.36-.6.73-.76 1.16-.16.42-.27.9-.3 1.59C5.5 10 5.5 10.23 5.5 12s0 2 .04 2.68c.03.7.14 1.17.3 1.59.17.43.4.8.76 1.16.36.36.73.6 1.16.76.42.16.9.27 1.59.3.7.03.91.04 2.68.04s1.99-.01 2.68-.04c.7-.03 1.17-.14 1.59-.3.43-.17.8-.4 1.16-.76.36-.36.6-.73.76-1.16.16-.42.27-.9.3-1.59.03-.69.04-.91.04-2.68s-.01-1.99-.04-2.68c-.03-.7-.14-1.17-.3-1.59a3.1 3.1 0 0 0-.76-1.16 3.1 3.1 0 0 0-1.16-.76c-.42-.16-.9-.27-1.59-.3C14 5.5 13.77 5.5 12 5.5zm0 1.17c1.74 0 1.95.01 2.63.04.63.03.98.14 1.21.23.3.12.52.26.75.49.23.23.37.44.49.75.09.23.2.57.23 1.21.03.68.04.88.04 2.62s-.01 1.94-.04 2.62c-.03.63-.14.98-.23 1.21-.12.3-.26.52-.49.75a2 2 0 0 1-.75.49c-.23.09-.58.2-1.21.23-.68.03-.88.04-2.63.04s-1.95-.01-2.63-.04c-.63-.03-.98-.14-1.21-.23a2 2 0 0 1-.75-.49 2 2 0 0 1-.49-.75c-.09-.23-.2-.57-.23-1.21-.03-.68-.04-.88-.04-2.62s.01-1.94.04-2.62c.03-.63.14-.98.23-1.21.12-.3.26-.52.49-.75.23-.23.44-.37.75-.49.23-.09.58-.2 1.21-.23.68-.03.89-.04 2.63-.04z",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    path: "M16.9 6h2l-4.6 5.3L19.8 18h-4.3l-3.3-4.3L8.4 18h-2l5-5.7L6.2 6h4.4l3 3.9L16.9 6zm-.7 10.8h1.2L9.9 7.1H8.6l7.6 9.7z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M19.6 8.2a2 2 0 0 0-1.4-1.4C16.9 6.4 12 6.4 12 6.4s-4.9 0-6.2.4A2 2 0 0 0 4.4 8.2 21 21 0 0 0 4 12a21 21 0 0 0 .4 3.8 2 2 0 0 0 1.4 1.4c1.3.4 6.2.4 6.2.4s4.9 0 6.2-.4a2 2 0 0 0 1.4-1.4A21 21 0 0 0 20 12a21 21 0 0 0-.4-3.8zM10.4 14.4V9.6L14.6 12l-4.2 2.4z",
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      if (!overlayRef.current) return;
      if (open) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(
          overlayRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power3.out" }
        );
        gsap.fromTo(
          ".menu-link",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(overlayRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* top bar — contact + socials */}
        <div className="flex h-[var(--topbar-h)] items-center bg-forest-deep text-cream/85">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-12">
            <div className="flex min-w-0 items-center gap-7 text-sm tracking-wide sm:text-base">
              <span className="flex min-w-0 items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-gold sm:h-6 sm:w-6" aria-hidden>
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                <span className="min-w-0 truncate">127 Chime Avenue, New Haven, Enugu</span>
              </span>
              <a
                href="tel:+2347030385985"
                className="hidden shrink-0 items-center gap-2.5 transition-colors hover:text-gold-soft sm:flex"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-gold sm:h-6 sm:w-6" aria-hidden>
                  <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.2 2.1z" />
                </svg>
                +234 703 038 5985
              </a>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-cream/70 transition-colors hover:text-gold-soft"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current sm:h-7 sm:w-7">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* main nav */}
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? "bg-paper/85 text-ink backdrop-blur-md border-b border-ink/10"
              : "bg-transparent text-cream"
          }`}
        >
          <nav className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-8 px-6 md:px-12">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Values for Daily Living — home"
            >
              <TreeLogo className="h-9 w-8 text-gold" idPrefix="nav" />
              <span className="font-display text-lg leading-none tracking-tight">
                Values for
                <br />
                Daily Living
              </span>
            </Link>

            <ul className="hidden items-center gap-2 lg:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`inline-block px-3 py-3 text-[13px] font-medium tracking-wide transition-colors xl:px-4 xl:text-sm ${
                      scrolled
                        ? "text-ink/80 hover:text-forest"
                        : "text-cream/90 hover:text-gold-soft"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="/#get-involved"
                className={`hidden rounded-full px-7 py-3 text-sm font-semibold transition-colors sm:block ${
                  scrolled
                    ? "bg-forest text-cream hover:bg-forest-deep"
                    : "bg-gold text-forest-deep hover:bg-gold-soft"
                }`}
              >
                Donate
              </Link>
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className={`relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border lg:hidden ${
                  scrolled ? "border-ink/15" : "border-cream/40"
                }`}
              >
                <span
                  className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${
                    open ? "text-cream" : ""
                  }`}
                  style={open ? { transform: "translateY(4px) rotate(45deg)" } : undefined}
                />
                <span
                  className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${
                    open ? "text-cream" : ""
                  }`}
                  style={open ? { transform: "translateY(-4px) rotate(-45deg)" } : undefined}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] hidden flex-col justify-between overflow-y-auto bg-forest-deep px-6 pb-10 pt-32 text-cream"
      >
        <ul className="flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="menu-link flex items-baseline gap-4 py-1.5"
              >
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <span className="font-display text-3xl sm:text-4xl">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu-link mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="text-sm text-cream/70">
            127 Chime Avenue,
            <br />
            New Haven, Enugu, Nigeria
            <br />
            <a href="tel:+2347030385985" className="text-gold-soft">
              +234 703 038 5985
            </a>
          </div>
          <Link
            href="/#get-involved"
            onClick={() => setOpen(false)}
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-forest-deep"
          >
            Donate
          </Link>
        </div>
      </div>
    </>
  );
}
