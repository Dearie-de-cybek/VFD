"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import TreeLogo from "./TreeLogo";

export type QuoteItem = {
  id: string;
  text: string;
  author: string;
  role: string | null;
  img: string | null;
  alt: string | null;
};

const AUTO_ADVANCE_MS = 7000;

export default function QuoteCarousel({ quotes }: { quotes: QuoteItem[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (quotes.length < 2 || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % quotes.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [quotes.length, paused]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".quote-swap",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", overwrite: true }
      );
    },
    { scope, dependencies: [active] }
  );

  if (quotes.length === 0) return null;

  const q = quotes[active];
  const hasImage = Boolean(q.img);

  return (
    <div
      ref={scope}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {hasImage ? (
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="order-2 quote-swap lg:order-1 lg:col-span-4">
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image
                key={q.img}
                src={q.img!}
                alt={q.alt || q.author}
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
            </div>
          </div>

          <figure className="order-1 quote-swap lg:order-2 lg:col-span-8">
            <blockquote className="font-display text-[clamp(1.9rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-tight">
              <span aria-hidden className="mr-2 text-gold">
                &ldquo;
              </span>
              {q.text}
              <span aria-hidden className="text-gold">
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-sm">
              <span className="h-px w-10 bg-gold" />
              <span className="font-semibold uppercase tracking-[0.2em] text-moss">
                {q.author}
                {q.role ? `, ${q.role}` : ""}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : (
        <div className="quote-swap relative mx-auto max-w-3xl text-center">
          <TreeLogo
            idPrefix={`quote-${q.id}`}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-auto -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.06]"
          />
          <figure className="relative">
            <blockquote className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-medium leading-[1.16] tracking-tight">
              <span aria-hidden className="mr-2 text-gold">
                &ldquo;
              </span>
              {q.text}
              <span aria-hidden className="text-gold">
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4 text-sm">
              <span className="h-px w-10 bg-gold" />
              <span className="font-semibold uppercase tracking-[0.2em] text-moss">
                {q.author}
                {q.role ? `, ${q.role}` : ""}
              </span>
              <span className="h-px w-10 bg-gold" />
            </figcaption>
          </figure>
        </div>
      )}

      {quotes.length > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2.5">
          {quotes.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show quote ${i + 1} of ${quotes.length}`}
              aria-pressed={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-gold" : "w-2 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
