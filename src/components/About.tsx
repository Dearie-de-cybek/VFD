"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TreeLogo from "./TreeLogo";

export default function About() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // golden tree draws itself when the section enters
        const branches = gsap.utils.toArray<SVGPathElement>(
          "[data-tree='about'] .tree-branch path"
        );
        const tl = gsap.timeline({
          scrollTrigger: { trigger: scope.current, start: "top 70%" },
        });
        branches.forEach((path, i) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(
            path,
            { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
            i * 0.07
          );
        });
        tl.from(
          "[data-tree='about'] .tree-leaves circle",
          {
            scale: 0,
            transformOrigin: "center",
            duration: 0.45,
            stagger: 0.04,
            ease: "back.out(2.5)",
          },
          "-=0.5"
        );
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} id="about" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <p data-reveal className="flex items-center gap-3 text-sm tracking-wide text-ink/70">
              <span className="h-2 w-2 bg-gold" />
              About Us
            </p>
            <TreeLogo
              idPrefix="about"
              className="mt-10 hidden h-40 w-32 text-gold lg:block"
            />
          </div>

          <div className="lg:col-span-10">
            <h2
              data-reveal
              className="font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1] tracking-tight"
            >
              Values for
              <br />
              <span className="text-moss/50">Daily Living</span>
            </h2>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <p data-reveal className="text-xl leading-relaxed text-ink/85">
                  What began as a conviction has grown into a movement. Values
                  for Daily Living stands as a catalyst for national renewal —
                  working to restore character, inspire principled action, and
                  redefine what it means to live with purpose.
                </p>
                <p data-reveal className="mt-6 leading-relaxed text-ink/65">
                  From values education that shapes young minds, to mentorship
                  that raises ethical leaders, to workshops that equip parents —
                  our work delivers bold action and tangible transformation.
                </p>
                <Link
                  data-reveal
                  href="/about"
                  className="group mt-9 inline-flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-forest text-cream transition-transform group-hover:translate-x-1">
                    →
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    Our Story
                  </span>
                </Link>
              </div>

              {/* human moments strip */}
              <div className="grid grid-cols-2 gap-5">
                <figure data-reveal>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
                      alt="A teacher guiding her class"
                      fill
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-ink/60">
                    Values education, in class
                  </figcaption>
                </figure>
                <figure data-reveal className="mt-10">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                      alt="A mentor with young students"
                      fill
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-ink/60">
                    Mentorship that stays
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
