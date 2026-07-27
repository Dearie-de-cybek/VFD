import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import { prisma } from "@/lib/prisma";
import { IconSparkle, IconCalendar, IconPin, IconMic, IconUsers } from "@/components/icons";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

const CATEGORY_ICON: Record<string, typeof IconUsers> = {
  Conference: IconUsers,
  Debate: IconMic,
  Gathering: IconUsers,
  Workshop: IconCalendar,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return { title: "Event — Values for Daily Living" };
  return {
    title: `${event.title} — Values for Daily Living`,
    description: event.desc,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!event || !event.published) notFound();

  const Icon = CATEGORY_ICON[event.category] ?? IconUsers;

  return (
    <main>
      <Nav />

      <article>
        <header className="relative overflow-hidden bg-forest-deep pb-16 pt-[calc(var(--header-h)+4rem)] text-cream">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.25em] text-cream/60">
              <ol className="flex flex-wrap items-center gap-3">
                <li>
                  <Link href="/" className="transition-colors hover:text-gold-soft">
                    Home
                  </Link>
                </li>
                <li aria-hidden><IconSparkle className="h-3 w-3 text-gold" /></li>
                <li>
                  <Link href="/events" className="transition-colors hover:text-gold-soft">
                    Events & Debates
                  </Link>
                </li>
              </ol>
            </nav>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-soft">
              <Icon className="h-3.5 w-3.5" />
              {event.category}
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-tight">
              {event.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-cream/70">
              <span className="inline-flex items-center gap-1.5">
                <IconCalendar className="h-4 w-4 text-gold" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconPin className="h-4 w-4 text-gold" />
                {event.location}
              </span>
            </div>
          </div>
        </header>

        <div className="bg-paper pb-24 lg:pb-32">
          <div className="mx-auto max-w-4xl px-6 pt-16 md:px-12">
            <div className="mx-auto max-w-2xl text-lg leading-relaxed text-ink/80">
              <p data-reveal>{event.desc}</p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                  →
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  Register your interest
                </span>
              </Link>
            </div>

            {event.photos.length > 0 && (
              <div className="mt-20">
                <h2 data-reveal className="font-display text-2xl tracking-tight">
                  Gallery
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {event.photos.map((photo) => (
                    <div
                      key={photo.id}
                      data-reveal
                      className="relative aspect-[4/3] overflow-hidden rounded-xl"
                    >
                      <Image
                        src={photo.path}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
      <ScrollFx />
    </main>
  );
}
