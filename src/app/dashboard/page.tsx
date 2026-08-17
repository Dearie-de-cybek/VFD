import { getMemberSession } from "@/lib/member-session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { logoutAction } from "../login/actions";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import TreeLogo from "@/components/TreeLogo";

import {
  CalendarDays,
  ClipboardList,
  Compass,
  Video,
  Award,
  BookOpen,
  Lock,
  ArrowRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { memberRoleLabel } from "@/lib/member-roles";

export const dynamic = "force-dynamic";

export default async function MemberDashboardPage() {
  const session = await getMemberSession();
  if (!session) {
    redirect("/login?next=/dashboard");
  }

  // Fetch published events to show under Webinars & Events
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" },
  });

  const isOutside = session.role === "OUTSIDE_MEMBER";

  return (
    <main className="min-h-screen bg-paper flex flex-col">
      <Nav />

      {/* Hero Welcome Section */}
      <section className="bg-forest-deep pt-[calc(var(--header-h)+3rem)] pb-12 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-soft flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  {isOutside ? "Webinar Guest" : "Full Member"}
                </span>
                <span className="rounded-full bg-cream/10 px-3 py-1 text-xs font-medium text-cream/70">
                  {memberRoleLabel(session.role)}
                </span>
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Welcome back, <em className="text-gold-soft">{session.name}</em>
              </h1>
              <p className="mt-2 text-sm text-cream/60 max-w-xl">
                {isOutside 
                  ? "Access virtual webinars, conferences, and program resources here on your guest dashboard."
                  : "Access your character scorecard, take moral assessments, view school tour events, and collaborate on VDL projects."
                }
              </p>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-cream/15 hover:border-cream/40"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Member Tools */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* VFD MEMBERS ONLY: Scorecard & Core Programs */}
            {!isOutside && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scorecard Card */}
                <div className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-tight text-ink group-hover:text-forest">
                    Moral Assessment & Scorecard
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    Reflect on your character score across core values or evaluate students/children in your care.
                  </p>
                  <Link
                    href="/assessment"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-deep"
                  >
                    Take Assessment
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* VFD Projects Card */}
                <div className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-forest-deep">
                    <Compass className="h-6 w-6 text-forest" />
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-tight text-ink group-hover:text-forest">
                    Active Projects & Tours
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    Explore values conferences, secondary school debates, and volunteer initiatives across Nigeria.
                  </p>
                  <Link
                    href="/projects"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-deep"
                  >
                    Explore Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}

            {/* OUTSIDE MEMBERS: Lock / Upgrade Banner */}
            {isOutside && (
              <div className="rounded-3xl bg-forest-deep p-8 text-cream shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <TreeLogo
                  idPrefix="upgrade-banner-bg"
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-auto text-gold opacity-[0.08]"
                />
                <div className="relative max-w-xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/25 px-3 py-1 text-xs font-semibold text-gold-soft">
                    <Award className="h-3.5 w-3.5" />
                    Join VFD Community
                  </span>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">
                    Unlock Moral Scorecards & Local Projects
                  </h2>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                    Guest accounts are restricted to webinars. Become a full VFD Member to unlock the Moral Scorecard for parents and teachers, join local chapters, and volunteer in high-impact school tours.
                  </p>
                </div>
                <Link
                  href="/contact?subject=Upgrade%20to%20Full%20VFD%20Membership"
                  className="relative shrink-0 rounded-full bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5"
                >
                  Request Upgrade
                </Link>
              </div>
            )}

            {/* Webinars list */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl tracking-tight text-ink">
                  Upcoming Webinars & Events
                </h2>
                <span className="text-xs text-ink/40">
                  {events.length} events listed
                </span>
              </div>

              {events.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-ink/20 p-12 text-center bg-white/50">
                  <Video className="mx-auto h-8 w-8 text-ink/35" />
                  <p className="mt-3 text-sm text-ink/50">No upcoming webinars or events scheduled right now.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {events.map((e) => (
                    <div
                      key={e.id}
                      className="rounded-2xl border border-ink/10 bg-white p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors hover:border-forest/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/5 text-forest">
                          {e.category === "Workshop" || e.title.toLowerCase().includes("webinar") ? (
                            <Video className="h-5 w-5" />
                          ) : (
                            <CalendarDays className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-forest/70">
                              {e.category}
                            </span>
                            <span className="text-xs text-ink/40">•</span>
                            <span className="text-xs text-ink/65">{e.date}</span>
                          </div>
                          <h3 className="mt-1 font-display text-lg tracking-tight text-ink">
                            {e.title}
                          </h3>
                          <p className="mt-1 text-xs text-ink/50 line-clamp-1">{e.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                        {/* Webinar Join Link Simulation */}
                        {e.category === "Workshop" || e.title.toLowerCase().includes("webinar") ? (
                          <a
                            href="https://zoom.us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none text-center rounded-full bg-forest px-5 py-2 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-forest-deep"
                          >
                            Join Webinar
                          </a>
                        ) : (
                          <Link
                            href={`/events/${e.id}`}
                            className="flex-1 md:flex-none text-center rounded-full bg-gold px-5 py-2 text-xs font-bold uppercase tracking-wider text-forest-deep transition-colors hover:bg-gold-soft"
                          >
                            View Event
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE: Sidebar Resources */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Profile Detail Box */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg tracking-tight text-ink border-b border-ink/5 pb-3">
                Your Profile
              </h3>
              <ul className="mt-4 flex flex-col gap-3.5 text-sm">
                <li className="flex justify-between">
                  <span className="text-ink/50">Name:</span>
                  <span className="font-semibold text-ink">{session.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-ink/50">Email:</span>
                  <span className="font-semibold text-ink">{session.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-ink/50">Membership:</span>
                  <span className="font-semibold text-ink">
                    {isOutside ? "Webinar Guest" : "Full VFD Member"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Locked Content Panel for Outside Members */}
            {isOutside && (
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg tracking-tight text-ink border-b border-ink/5 pb-3 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-ink/40" />
                  Locked VFD Tools
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex items-start gap-3 opacity-60">
                    <ClipboardList className="h-5 w-5 text-ink/45 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Moral Scorecard</h4>
                      <p className="text-xs text-ink/50 mt-0.5">Parent/Teacher diagnostic templates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <Award className="h-5 w-5 text-ink/45 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Youth Chapters</h4>
                      <p className="text-xs text-ink/50 mt-0.5">Local values ambassador network.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <Compass className="h-5 w-5 text-ink/45 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Tours & Outreaches</h4>
                      <p className="text-xs text-ink/50 mt-0.5">Physical community & school tour operations.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Webinar Resources Box */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg tracking-tight text-ink border-b border-ink/5 pb-3">
                Webinar Resources
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2.5 text-sm text-ink/75 hover:text-forest group"
                  >
                    <BookOpen className="h-4 w-4 text-gold group-hover:text-forest" />
                    <span>Values Introduction Guide.pdf</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2.5 text-sm text-ink/75 hover:text-forest group"
                  >
                    <BookOpen className="h-4 w-4 text-gold group-hover:text-forest" />
                    <span>National Reorientation Slides.pdf</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2.5 text-sm text-ink/75 hover:text-forest group"
                  >
                    <BookOpen className="h-4 w-4 text-gold group-hover:text-forest" />
                    <span>VDL Conference Schedule.pdf</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      <Footer />
      <ScrollFx />
    </main>
  );
}
