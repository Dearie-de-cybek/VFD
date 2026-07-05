import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Our Projects — Values for Daily Living",
  description:
    "School values tours, the annual VDL conference, essay competitions, book distribution, youth ambassadors and digital skills training.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const PROJECTS = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <main>
      <Nav />
      <PageHero
        crumb="Our Projects"
        title={
          <>
            Our <em className="text-gold-soft">Projects</em>
          </>
        }
        intro="From classrooms to conference halls — the initiatives through which values take root across Nigeria and beyond."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-10 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <article
                key={p.id}
                data-reveal
                className={`group ${i % 2 === 1 ? "md:mt-16" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-forest-deep/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-soft backdrop-blur-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6 pt-6">
                  <div>
                    <h2 className="font-display text-2xl tracking-tight lg:text-3xl">
                      {p.title}
                    </h2>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/65">
                      {p.desc}
                    </p>
                  </div>
                  <span className="mt-1 hidden font-display text-xl italic text-gold sm:block">
                    0{i + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-20 rounded-2xl bg-forest-deep p-10 text-center text-cream lg:p-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight tracking-tight lg:text-4xl">
              Have a school, community or institution in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/70">
              We partner with schools, foundations and public institutions to
              bring these projects where they are needed most.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-gold px-9 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollFx />
    </main>
  );
}
