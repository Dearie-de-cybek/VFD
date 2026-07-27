import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Spotlight() {
  const events = await prisma.event.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: "asc" },
    take: 2,
  });

  if (events.length === 0) return null;

  return (
    <section className="bg-paper px-4 pb-24 md:px-8 lg:pb-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {events.map((event, i) => (
          <div
            key={event.id}
            data-reveal
            className="relative overflow-hidden rounded-2xl bg-forest-deep"
          >
            <div className="pointer-events-none absolute inset-4 rounded-xl border border-gold/50 lg:inset-6" />

            <div className="grid lg:grid-cols-2">
              <div
                className={`flex flex-col justify-center p-10 lg:p-20 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <p className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-cream/60">
                  Featured Event
                  <span className="font-mono text-gold-soft">
                    0{i + 1} / 0{events.length}
                  </span>
                </p>
                <h3 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-medium leading-[1.1] tracking-tight text-white">
                  {event.title}
                </h3>
                <p className="mt-6 max-w-md leading-relaxed text-cream/70">
                  {event.desc}
                </p>
                <Link
                  href={`/events/${event.id}`}
                  className="group mt-9 inline-flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                    →
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-white">
                    View event
                  </span>
                </Link>
              </div>

              <div
                className={`relative min-h-[20rem] lg:min-h-[30rem] ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                {event.img ? (
                  <Image
                    src={event.img}
                    alt={event.alt || event.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-forest" />
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    i % 2 === 1
                      ? "from-transparent to-forest-deep/60"
                      : "from-forest-deep/60 to-transparent"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
