"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconSparkle } from "./icons";

const PILLARS = [
  {
    name: "Values Education",
    heading:
      "Education without values produces informed but directionless minds.",
    desc: "We develop character curricula and partner with schools to weave values education through every level of learning — primary to tertiary.",
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80",
    alt: "A teacher engaging pupils in a classroom",
  },
  {
    name: "Youth Mentorship",
    heading:
      "Every young person deserves someone who believes in who they can become.",
    desc: "We mentor young people in leadership, personal development, ethical decision-making and purposeful living.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    alt: "A mentor working with young students",
  },
  {
    name: "Parent Empowerment",
    heading: "Values are first taught at home — we help parents teach them well.",
    desc: "Workshops and resources that equip parents to raise values-driven children in a changing world.",
    img: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1000&q=80",
    alt: "A parent holding a child's hand",
  },
  {
    name: "Policy & Governance",
    heading:
      "Institutions shape nations. Ethics must shape institutions.",
    desc: "We consult with governments and organizations to embed values into policies, governance and institutional culture.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    alt: "Professionals in discussion",
  },
  {
    name: "Community Outreach",
    heading:
      "Moral reorientation happens where people live, learn and gather.",
    desc: "School tours, conferences, campaigns and engagement programs that spark civic responsibility across communities.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    alt: "Volunteers joining hands in community service",
  },
];

export default function Pillars() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { contextSafe } = useGSAP({ scope });

  // state changes synchronously; the fade on [active] is decoration only,
  // so tab switching keeps working even when animation frames are throttled
  useGSAP(
    () => {
      gsap.fromTo(
        ".wwd-swap",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: true }
      );
    },
    { scope, dependencies: [active] }
  );

  const select = contextSafe((i: number) => {
    if (i === active) return;
    setActive(i);
  });

  const p = PILLARS[active];

  return (
    <section ref={scope} id="work" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <p
              data-reveal
              className="flex items-center gap-3 text-sm tracking-wide text-ink/70 lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
            >
              <span className="h-2 w-2 bg-gold" />
              What we do
            </p>
          </div>

          <div className="flex flex-col lg:col-span-6 lg:pr-10">
            <div className="wwd-swap min-h-[16rem]">
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.15] tracking-tight">
                {p.heading}
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-ink/65">
                {p.desc}
              </p>
              <Link href="/about" className="group mt-8 inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gold/20 text-forest transition-colors group-hover:bg-gold group-hover:text-forest-deep">
                  →
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  More Information
                </span>
              </Link>
            </div>

            <ul data-reveal className="mt-14">
              {PILLARS.map((item, i) => (
                <li key={item.name}>
                  <button
                    onClick={() => select(i)}
                    aria-pressed={i === active}
                    className={`flex w-full items-center justify-between border-b py-4 text-left transition-colors ${
                      i === active
                        ? "border-ink text-ink"
                        : "border-ink/15 text-ink/40 hover:text-ink/70"
                    }`}
                  >
                    <span className="text-lg font-medium">{item.name}</span>
                    <IconSparkle
                      className={`h-4 w-4 text-gold transition-opacity ${
                        i === active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div
              data-reveal
              className="wwd-swap relative aspect-[3/4] overflow-hidden rounded-xl lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
            >
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
