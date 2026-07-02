"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Commitment() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".commit-img",
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.from(".commit-line > span", {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 55%" },
        });
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative flex min-h-[90svh] items-center overflow-hidden bg-forest-deep"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=2000&q=80"
          alt="Students walking and learning together"
          fill
          sizes="100vw"
          className="commit-img object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="flex items-start gap-3 text-sm tracking-wide text-cream/80 lg:col-span-2">
            <span className="mt-1.5 h-2 w-2 shrink-0 bg-gold" />
            Our Commitment
          </p>
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.9rem)] font-medium leading-[1.12] tracking-tight text-white lg:col-span-10">
            <span className="commit-line reveal-line">
              <span>Driven by conviction. Focused on people.</span>
            </span>
            <span className="commit-line reveal-line">
              <span>
                Fuelled by purpose. Values for Daily Living
              </span>
            </span>
            <span className="commit-line reveal-line">
              <span>
                exists to raise a generation that is{" "}
                <em className="text-gold-soft">morally grounded,</em>
              </span>
            </span>
            <span className="commit-line reveal-line">
              <span>not just intellectually equipped.</span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
