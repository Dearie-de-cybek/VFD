"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const VALUES = ["Integrity", "Responsibility", "Empathy", "Honesty", "Discipline"];

export default function ValuesMarquee() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".marquee-track", {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      });
      return () => mm.revert();
    },
    { scope }
  );

  const row = (
    <>
      {VALUES.map((v) => (
        <span key={v} className="flex items-center gap-8 pr-8">
          <span className="font-display text-4xl italic text-gold-soft md:text-6xl">
            {v}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-gold" aria-hidden>
            <path d="M12 0l2.8 9.2L24 12l-9.2 2.8L12 24l-2.8-9.2L0 12l9.2-2.8z" />
          </svg>
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={scope}
      className="overflow-hidden border-y border-gold/30 bg-forest-deep py-6"
      aria-label="Our five core values: Integrity, Responsibility, Empathy, Honesty, Discipline"
    >
      <div className="marquee-track flex w-max">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
