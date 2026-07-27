import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import { prisma } from "@/lib/prisma";
import { IconSparkle } from "@/components/icons";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { title: "Project — Values for Daily Living" };
  return {
    title: `${project.title} — Values for Daily Living`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!project || !project.published) notFound();

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
                  <Link href="/projects" className="transition-colors hover:text-gold-soft">
                    Our Projects
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              {project.tag}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-tight">
              {project.title}
            </h1>
          </div>
        </header>

        <div className="bg-paper pb-24 lg:pb-32">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <div className="relative -mt-0 aspect-[16/9] overflow-hidden rounded-2xl lg:-translate-y-10">
              <Image
                src={project.img}
                alt={project.alt}
                fill
                priority
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink/80 lg:mt-4">
              <p data-reveal>{project.desc}</p>
            </div>

            {project.photos.length > 0 && (
              <div className="mt-20">
                <h2 data-reveal className="font-display text-2xl tracking-tight">
                  Gallery
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.photos.map((photo) => (
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
        </div>
      </article>

      <Footer />
      <ScrollFx />
    </main>
  );
}
