import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import { IconCalendar, IconPin, IconMic, IconUsers } from "@/components/icons";

export const metadata: Metadata = {
  title: "Events & Debates — Values for Daily Living",
  description:
    "Upcoming VDL conferences, inter-school values debates, community gatherings and workshops across Nigeria.",
};

const CATEGORY_ICON = {
  Conference: IconUsers,
  Debate: IconMic,
  Gathering: IconUsers,
  Workshop: IconCalendar,
} as const;

const EVENTS = [
  {
    title: "The Annual Values for Daily Living Conference",
    category: "Conference" as const,
    date: "18–19 September 2026",
    location: "Enugu, Nigeria",
    desc: "Educators, parents, students and leaders gather for keynote sessions, essay competition awards and the commissioning of new youth ambassadors.",
  },
  {
    title: "Inter-School Values Debate Championship",
    category: "Debate" as const,
    date: "7 August 2026",
    location: "Zonal heats — Enugu, Onitsha, Aba",
    desc: "Secondary school teams argue live on integrity, honesty and civic responsibility, judged by educators and community leaders. Winners advance to the national final at the Annual Conference.",
  },
  {
    title: "Community Values Gathering",
    category: "Gathering" as const,
    date: "Last Saturday, monthly",
    location: "Rotates across partner communities",
    desc: "An open town-hall for parents, faith leaders and residents to discuss character formation in the home and neighbourhood — informal, conversational, always free to attend.",
  },
  {
    title: "Parents & Teachers Values Workshop",
    category: "Workshop" as const,
    date: "Ongoing — book a date",
    location: "On-site at your school or church",
    desc: "A half-day, hands-on session equipping the adults around a child with practical language and tools for values-driven correction and encouragement.",
  },
  {
    title: "Youth Ambassadors Induction Ceremony",
    category: "Gathering" as const,
    date: "October 2026",
    location: "Enugu, Nigeria",
    desc: "Each new cohort of Youth Ambassadors is publicly commissioned — a short, ceremonial gathering for ambassadors, their families and mentors.",
  },
];

export default function EventsPage() {
  return (
    <main>
      <Nav />
      <PageHero
        crumb="Events & Debates"
        title={
          <>
            Events <em className="text-gold-soft">& Debates</em>
          </>
        }
        intro="Conferences, inter-school debates and community gatherings — the moments where values are spoken, argued and lived out together."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <ul className="space-y-6">
            {EVENTS.map((e) => {
              const Icon = CATEGORY_ICON[e.category];
              return (
                <li
                  key={e.title}
                  data-reveal
                  className="rounded-2xl border border-ink/10 bg-white p-7 lg:p-9"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-forest">
                      <Icon className="h-3.5 w-3.5" />
                      {e.category}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl tracking-tight lg:text-3xl">
                    {e.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink/60">
                    <span className="inline-flex items-center gap-1.5">
                      <IconCalendar className="h-4 w-4 text-gold" />
                      {e.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconPin className="h-4 w-4 text-gold" />
                      {e.location}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
                    {e.desc}
                  </p>

                  <Link
                    href="/contact"
                    className="group mt-6 inline-flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      Register your interest
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            data-reveal
            className="mt-16 rounded-2xl bg-forest-deep p-10 text-center text-cream lg:p-16"
          >
            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight tracking-tight lg:text-4xl">
              Want VDL to bring a debate or gathering to your school or community?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/70">
              We help schools, churches and community groups host their own
              values debates and gatherings — reach out and we&apos;ll help you
              plan one.
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
