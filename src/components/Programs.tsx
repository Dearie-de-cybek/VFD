"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PROGRAMS = [
  {
    title: "School Values Tours",
    desc: "Moral education campaigns that bring values teaching directly into classrooms across Nigeria.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80",
    alt: "A school classroom",
  },
  {
    title: "Annual VDL Conference",
    desc: "Educators, parents and leaders gather each year to advance the national conversation on values.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    alt: "An audience at a conference",
  },
  {
    title: "Essay Competitions",
    desc: "Secondary school students reflect deeply on character and citizenship — and are rewarded for it.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    alt: "A student writing with a fountain pen",
  },
  {
    title: "Book Distribution",
    desc: "Values-based books placed into the hands of students, teachers and families nationwide.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    alt: "A stack of open books",
  },
  {
    title: "Youth Ambassadors",
    desc: "A leadership pipeline of young people trained to model and multiply values in their communities.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    alt: "Young people collaborating on a project",
  },
  {
    title: "Digital Skills Training",
    desc: "Equipping young ambassadors with practical digital skills for purposeful, productive futures.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    alt: "Young women learning on laptops",
  },
];

export default function Programs() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // pinned horizontal scroll on desktop only
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = scope.current?.querySelector(".programs-track");
          if (!track) return;
          const getX = () => -(track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: getX,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: () => `+=${-getX()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="programs"
      className="overflow-hidden bg-forest py-24 text-cream lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="mx-auto mb-12 w-full max-w-7xl px-5 md:px-10 lg:mb-16">
        <p
          data-reveal
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft"
        >
          <span className="h-px w-10 bg-gold" />
          Major programs
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-tight"
        >
          Where the work <em className="text-gold-soft">takes root</em>
        </h2>
      </div>

      <div className="programs-track flex flex-col gap-6 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:pr-[10vw]">
        {PROGRAMS.map((p, i) => (
          <article
            key={p.title}
            data-reveal
            className="group flex flex-col overflow-hidden rounded-3xl bg-forest-deep lg:w-[24rem] lg:shrink-0"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={p.img}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-mono text-xs font-bold text-forest-deep">
                0{i + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {p.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
