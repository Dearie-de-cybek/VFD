"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // slow Ken Burns settle
        tl.fromTo(
          ".hero-img",
          { scale: 1.15 },
          { scale: 1, duration: 2.2, ease: "power2.out" },
          0
        )
          .from(".hero-eyebrow", { opacity: 0, x: -24, duration: 0.8 }, 0.4)
          .from(
            ".reveal-line > span",
            { yPercent: 115, duration: 1, stagger: 0.1 },
            0.5
          )
          .from(
            ".hero-fade",
            { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 },
            "-=0.5"
          );

        // gentle drift as you scroll away
        gsap.to(".hero-img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=80"
          alt="A young Nigerian student looking up with quiet determination"
          fill
          priority
          sizes="100vw"
          className="hero-img object-cover object-[65%_center]"
        />
        {/* darken for legibility, heavier at the edges like a vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-[calc(var(--header-h)+5rem)] md:px-12 lg:pb-28">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <p className="hero-eyebrow flex items-center gap-3 text-sm tracking-wide text-cream/80 lg:col-span-2 lg:mb-3">
            <span className="h-2 w-2 bg-gold" />
            Welcome
          </p>

          <div className="lg:col-span-10">
            <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5.4rem)] font-medium leading-[1.02] tracking-tight text-white">
              <span className="reveal-line">
                <span>Character is the seed.</span>
              </span>
              <span className="reveal-line">
                <span>
                  Society is the <em className="text-gold-soft">harvest.</em>
                </span>
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              Changing minds and transforming lives across Nigeria — one value,
              one child, one community at a time.
            </p>

            <div className="hero-fade mt-9 flex flex-wrap items-center gap-5">
              <Link href="/#work" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                  →
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">
                  What We Do
                </span>
              </Link>
              <Link href="/#get-involved" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-cream/40 text-cream transition-colors group-hover:border-gold group-hover:text-gold-soft">
                  →
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">
                  Get Involved
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
