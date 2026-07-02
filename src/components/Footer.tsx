import TreeLogo from "./TreeLogo";

export default function Footer() {
  return (
    <footer id="contact" className="bg-forest-deep pt-20 text-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <TreeLogo idPrefix="footer" className="h-14 w-12 text-gold" />
              <p className="font-display text-2xl leading-tight">
                Values for
                <br />
                Daily Living
              </p>
            </div>
            <p className="mt-6 max-w-sm leading-relaxed text-cream/60">
              Changing minds. Transforming lives. Building a society rooted in
              integrity, responsibility, empathy, honesty and discipline.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              Visit
            </p>
            <address className="mt-5 not-italic leading-relaxed text-cream/75">
              127 Chime Avenue,
              <br />
              New Haven, Enugu,
              <br />
              Nigeria
            </address>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              Explore
            </p>
            <ul className="mt-5 space-y-2.5 text-cream/75">
              {[
                ["/about", "About Us"],
                ["/projects", "Our Projects"],
                ["/events", "Events & Debates"],
                ["/blogs", "Blogs"],
                ["/assessment", "Moral Assessment Form"],
                ["/contact", "Contact Us"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-gold-soft">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              Write
            </p>
            <ul className="mt-5 space-y-2.5 text-cream/75">
              <li>
                <a
                  href="mailto:hello@valuesfordailyliving.org"
                  className="break-all transition-colors hover:text-gold-soft"
                >
                  hello@valuesfordailyliving.org
                </a>
              </li>
              <li>
                <a
                  href="tel:+2347030385985"
                  className="transition-colors hover:text-gold-soft"
                >
                  +234 703 038 5985
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-8 border-t border-cream/10 py-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              Newsletter
            </p>
            <p className="mt-4 max-w-md text-cream/70">
              Join our mailing list to stay up to date with what&apos;s
              happening at Values for Daily Living.
            </p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <a href="/join" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                →
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">
                Join Our Community
              </span>
            </a>
          </div>
        </div>

        <p
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display text-[clamp(2.5rem,8.5vw,7.5rem)] leading-none text-cream/10"
        >
          Values for Daily Living
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 py-6 text-xs text-cream/50">
          <p>© 2026 Values for Daily Living. All rights reserved.</p>
          <p>Made with integrity in Enugu, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
