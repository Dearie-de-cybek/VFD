"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Global scroll effects, driven by data attributes so content sections
 * can stay server components:
 *   data-reveal            — blur+rise into view
 *   data-parallax          — slow vertical drift inside its clipping parent
 *   data-counter="25000"   — count up on enter (data-suffix="+" optional)
 */
export default function ScrollFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    // counters run even with reduced motion — they end at a static value
    gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
      const end = parseFloat(el.dataset.counter || "0");
      const suffix = el.dataset.suffix || "";
      const state = { v: 0 };
      gsap.to(state, {
        v: end,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => {
          el.textContent = Math.round(state.v).toLocaleString() + suffix;
        },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
