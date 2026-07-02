import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import { POSTS } from "@/lib/posts";
import { IconSparkle } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article — Values for Daily Living" };
  return {
    title: `${post.title} — Values for Daily Living`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main>
      <Nav />

      <article>
        <header className="relative overflow-hidden bg-forest-deep pb-16 pt-[calc(var(--header-h)+4rem)] text-cream">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 text-xs uppercase tracking-[0.25em] text-cream/60"
            >
              <ol className="flex flex-wrap items-center gap-3">
                <li>
                  <Link href="/" className="transition-colors hover:text-gold-soft">
                    Home
                  </Link>
                </li>
                <li aria-hidden><IconSparkle className="h-3 w-3 text-gold" /></li>
                <li>
                  <Link href="/blogs" className="transition-colors hover:text-gold-soft">
                    Blogs
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              {post.category} <span className="text-cream/40">·</span>{" "}
              <span className="text-cream/60">{post.date}</span>
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="bg-paper pb-24 lg:pb-32">
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <div className="relative -mt-0 aspect-[16/9] translate-y-0 overflow-hidden rounded-2xl lg:-translate-y-10">
              <Image
                src={post.img}
                alt={post.alt}
                fill
                priority
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mx-auto mt-10 max-w-2xl space-y-7 text-lg leading-relaxed text-ink/80 lg:mt-4">
              {post.body.map((para, i) => (
                <p
                  key={i}
                  data-reveal
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-forest"
                      : ""
                  }
                >
                  {para}
                </p>
              ))}

              <div data-reveal className="border-t border-ink/15 pt-8">
                <p className="text-sm text-ink/60">
                  Written by the{" "}
                  <span className="font-semibold text-forest">
                    Values for Daily Living
                  </span>{" "}
                  editorial team.
                </p>
              </div>
            </div>

            {/* read next */}
            <div className="mt-20">
              <h2 data-reveal className="font-display text-2xl tracking-tight">
                Read next
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {others.map((o) => (
                  <Link key={o.slug} href={`/blogs/${o.slug}`} data-reveal className="group">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                      <Image
                        src={o.img}
                        alt={o.alt}
                        fill
                        sizes="(min-width: 640px) 28rem, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-xl leading-snug tracking-tight transition-colors group-hover:text-forest">
                      {o.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
      <ScrollFx />
    </main>
  );
}
