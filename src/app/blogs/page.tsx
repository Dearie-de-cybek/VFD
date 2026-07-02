import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Values for Daily Living",
  description:
    "Essays and reflections on values, character, parenting, mentorship and leadership from the Values for Daily Living movement.",
};

export default function BlogsPage() {
  const [featured, ...rest] = POSTS;

  return (
    <main>
      <Nav />
      <PageHero
        crumb="Blogs"
        title={
          <>
            Ideas that <em className="text-gold-soft">form character</em>
          </>
        }
        intro="Essays and reflections on values, parenting, mentorship and leadership — written from the field."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* featured */}
          <Link
            href={`/blogs/${featured.slug}`}
            data-reveal
            className="group grid gap-8 rounded-2xl bg-cream p-6 lg:grid-cols-2 lg:p-8"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto lg:min-h-[24rem]">
              <Image
                src={featured.img}
                alt={featured.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center lg:p-6">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-moss">
                <span className="rounded-full bg-gold/20 px-3 py-1 text-forest">
                  {featured.category}
                </span>
                {featured.date}
              </p>
              <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight transition-colors group-hover:text-forest lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink/65">
                {featured.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-forest">
                Read article
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>

          {/* grid */}
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                data-reveal
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={post.img}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-moss">
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-forest">
                    {post.category}
                  </span>
                  {post.date}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-snug tracking-tight transition-colors group-hover:text-forest">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollFx />
    </main>
  );
}
