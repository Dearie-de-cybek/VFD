import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: 25000, suffix: "+", label: "Students reached through values education and school tours" },
  { value: 10000, suffix: "+", label: "Values-based books placed in the hands of young readers" },
  { value: 500, suffix: "+", label: "Youth ambassadors trained in leadership and digital skills" },
];

export default function Impact() {
  return (
    <section id="impact" className="bg-forest-deep">
      {/* joyful, human, full-bleed */}
      <div className="relative h-[55svh] min-h-[320px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2000&q=80"
          alt="Pupils raising their hands with excitement in class"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-forest-deep" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-4 text-cream md:px-12 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <p
            data-reveal
            className="flex items-start gap-3 text-sm tracking-wide text-cream/80 lg:col-span-2"
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 bg-gold" />
            Our Impact
          </p>

          <div className="lg:col-span-10">
            <div className="grid gap-12 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p
                    data-counter={s.value}
                    data-suffix={s.suffix}
                    className="font-display text-5xl text-gold-soft lg:text-6xl"
                  >
                    0{s.suffix}
                  </p>
                  <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-cream/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div data-reveal className="mt-14 flex flex-wrap items-center gap-8">
              <Link href="/#get-involved" className="group inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                  →
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">
                  Help us reach further
                </span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-cream/60">
                In partnership with schools, communities and public institutions
                — including values-based projects alongside Nigeria&apos;s
                National Orientation Agency through collaborating foundations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
