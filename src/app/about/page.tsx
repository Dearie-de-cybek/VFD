import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import TreeLogo from "@/components/TreeLogo";
import { IconSparkle } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us — Values for Daily Living",
  description:
    "Values for Daily Living (VDL) is a resolute global movement dedicated to promoting moral values, ethical living, and purposeful leadership.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* page hero */}
      <section className="relative overflow-hidden bg-forest-deep pb-20 pt-[calc(var(--header-h)+4rem)] text-cream">
        <TreeLogo
          idPrefix="about-hero"
          className="pointer-events-none absolute -right-12 -top-6 h-[22rem] w-auto text-gold opacity-10"
        />
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.25em] text-cream/60">
            <ol className="flex items-center gap-3">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-soft">
                  Home
                </Link>
              </li>
              <li aria-hidden><IconSparkle className="h-3 w-3 text-gold" /></li>
              <li className="text-gold-soft">About Us</li>
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.98] tracking-tight">
            About <em className="text-gold-soft">Us</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
            A resolute global movement dedicated to promoting moral values,
            ethical living, and purposeful leadership.
          </p>
        </div>
      </section>

      {/* mission & vision */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-10 lg:grid-cols-2">
          <div data-reveal className="rounded-3xl border border-ink/10 bg-cream p-10 lg:p-12">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-gold">
              Mission
            </p>
            <p className="mt-5 font-display text-2xl leading-snug lg:text-3xl">
              Our mission is to use the teaching of values to change minds —
              thereby transforming lives.
            </p>
          </div>
          <div data-reveal className="rounded-3xl bg-forest p-10 text-cream lg:p-12">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-gold-soft">
              Vision
            </p>
            <p className="mt-5 font-display text-2xl leading-snug lg:text-3xl">
              Our vision is to cultivate a society deeply rooted in strong moral
              values, ensuring individuals contribute meaningfully to society.
            </p>
          </div>
        </div>
      </section>

      {/* story */}
      <section className="bg-paper pb-24 lg:pb-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="space-y-7 text-lg leading-relaxed text-ink/80">
                <p data-reveal className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-forest">
                  Values for Daily Living (VDL) is a resolute global movement
                  dedicated to promoting moral values, ethical living, and
                  purposeful leadership. At its core, VDL believes that values
                  are the foundation upon which lasting personal transformation
                  and societal progress are built.
                </p>
                <p data-reveal>
                  We are passionately committed to reshaping the moral fabric of
                  society by restoring character, inspiring principled action,
                  and redefining what it means to live with purpose. Through
                  structured educational programs, strategic advocacy, and deep
                  community engagement, we seek to ignite a values-driven
                  revolution that starts with the individual and echoes through
                  families, schools, institutions, and nations.
                </p>
                <p data-reveal>
                  VDL was founded on the conviction that true and sustainable
                  development — whether social, economic, or political — can
                  only be achieved when rooted in strong ethical principles. We
                  envision a world where individuals are not only intellectually
                  equipped but also morally grounded — where communities thrive
                  not just on infrastructure and policies, but on honesty,
                  empathy, discipline, responsibility, and integrity.
                </p>
              </div>

              <blockquote
                data-reveal
                className="my-12 border-l-2 border-gold pl-8 font-display text-2xl leading-snug text-forest lg:text-3xl"
              >
                Values are not inherited — they are taught, modeled, and
                reinforced through daily living.
              </blockquote>

              <div className="space-y-7 text-lg leading-relaxed text-ink/80">
                <p data-reveal>
                  Our approach is holistic. We work tirelessly to bridge the
                  widening gap between knowledge and character, understanding
                  that education without values leads to informed but
                  directionless individuals, and that success without ethics is
                  short-lived and dangerous.
                </p>
                <p data-reveal>
                  Through targeted initiatives, strategic partnerships, and
                  real-time impact projects, we empower young minds, support
                  parents and educators, and equip community leaders to nurture
                  environments that foster respect, empathy, accountability,
                  and service.
                </p>
              </div>

              <div data-reveal className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/#get-involved"
                  className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5"
                >
                  Join the movement
                </Link>
                <Link
                  href="/#work"
                  className="rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold transition-colors hover:border-forest hover:text-forest"
                >
                  See what we do
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div data-reveal className="relative aspect-[3/4] overflow-hidden rounded-t-[8rem] rounded-b-3xl">
                <Image
                  data-parallax
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80"
                  alt="Pupils raising their hands eagerly in class"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="scale-110 object-cover"
                />
              </div>
              <div data-reveal className="mt-6 rounded-3xl bg-forest-deep p-8 text-cream">
                <p className="font-display text-xl leading-snug text-gold-soft">
                  From the individual, to the family, to the nation.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  Our work targets students, educators, parents, community
                  leaders, and public institutions — long-term impact, from the
                  root up.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollFx />
    </main>
  );
}
