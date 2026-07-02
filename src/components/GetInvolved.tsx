const WAYS = [
  {
    title: "Donate",
    desc: "Fund books, school tours and mentorship. Every gift plants values where they matter most.",
    cta: "Give today",
    href: "/contact",
    theme: "bg-gold text-forest-deep",
    ctaTheme: "bg-forest-deep text-cream hover:bg-forest",
  },
  {
    title: "Volunteer",
    desc: "Mentor a young person, join a school tour, or lend your skills to the movement.",
    cta: "Join us",
    href: "/join",
    theme: "bg-cream text-ink border border-ink/10",
    ctaTheme: "bg-forest text-cream hover:bg-forest-deep",
  },
  {
    title: "Partner",
    desc: "Schools, foundations and institutions — let's embed values into your community together.",
    cta: "Start a conversation",
    href: "/contact",
    theme: "bg-forest text-cream",
    ctaTheme: "bg-gold text-forest-deep hover:bg-gold-soft",
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="bg-paper-deep py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-16 text-center">
          <p
            data-reveal
            className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-moss"
          >
            <span className="h-px w-10 bg-gold" />
            Get involved
            <span className="h-px w-10 bg-gold" />
          </p>
          <h2
            data-reveal
            className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-tight"
          >
            Plant a value.
            <br />
            <em className="text-gold">Grow a nation.</em>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {WAYS.map((w) => (
            <div
              key={w.title}
              data-reveal
              className={`flex flex-col rounded-3xl p-9 ${w.theme}`}
            >
              <h3 className="font-display text-3xl">{w.title}</h3>
              <p className="mt-4 flex-1 leading-relaxed opacity-80">{w.desc}</p>
              <a
                href={w.href}
                className={`mt-8 inline-block self-start rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${w.ctaTheme}`}
              >
                {w.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
