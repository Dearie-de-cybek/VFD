import Image from "next/image";
import Link from "next/link";

export default function Spotlight() {
  return (
    <section className="bg-paper px-4 pb-24 md:px-8 lg:pb-32">
      <div
        data-reveal
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-forest-deep"
      >
        <div className="pointer-events-none absolute inset-4 rounded-xl border border-gold/50 lg:inset-6" />

        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center p-10 lg:p-20">
            <p className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-cream/60">
              Featured Event
              <span className="font-mono text-gold-soft">01 / 02</span>
            </p>
            <h3 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-medium leading-[1.1] tracking-tight text-white">
              The Annual Values for Daily Living{" "}
              <em className="text-gold-soft">Conference</em>
            </h3>
            <p className="mt-6 max-w-md leading-relaxed text-cream/70">
              Educators, parents, students and leaders gather to advance the
              national conversation on values — with keynote sessions, essay
              competition awards and the commissioning of new youth ambassadors.
            </p>
            <Link href="/#get-involved" className="group mt-9 inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                →
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">
                Register your interest
              </span>
            </Link>
          </div>

          <div className="relative min-h-[20rem] lg:min-h-[30rem]">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
              alt="An audience engaged at a conference session"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
