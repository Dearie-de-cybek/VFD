import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Projects — Values for Daily Living",
  description:
    "School values tours, the annual VDL conference, essay competitions, book distribution, youth ambassadors and digital skills training.",
};

const PROJECTS = [
  {
    title: "School Values Tours",
    tag: "Ongoing · Nationwide",
    desc: "Moral education campaigns that bring values teaching directly into classrooms — assemblies, workshops and teacher resources delivered school by school.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80",
    alt: "A school classroom",
  },
  {
    title: "Annual VDL Conference",
    tag: "Yearly · Enugu",
    desc: "Educators, parents, students and leaders gather each year to advance the national conversation on values, character and purposeful leadership.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    alt: "An audience at a conference",
  },
  {
    title: "Essay Competitions",
    tag: "Yearly · Secondary Schools",
    desc: "Students reflect deeply on character and citizenship through structured writing — with scholarships and prizes for the most thoughtful voices.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    alt: "A student writing with a fountain pen",
  },
  {
    title: "Book Distribution",
    tag: "Ongoing · Nationwide",
    desc: "Values-based books placed into the hands of students, teachers and families — building home and school libraries of character.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80",
    alt: "A stack of open books",
  },
  {
    title: "Youth Ambassador Programme",
    tag: "Ongoing · Cohort-based",
    desc: "A leadership pipeline of young people trained to model and multiply values in their schools and communities.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    alt: "Young people collaborating on a project",
  },
  {
    title: "Digital Skills Training",
    tag: "Ongoing · Ambassadors",
    desc: "Practical digital skills for young ambassadors — pairing competence with character for purposeful, productive futures.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    alt: "Young women learning on laptops",
  },
];

export default function ProjectsPage() {
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
                key={p.title}
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
