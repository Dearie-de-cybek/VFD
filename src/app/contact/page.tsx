import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Values for Daily Living",
  description:
    "Reach Values for Daily Living at 127 Chime Avenue, New Haven, Enugu — or write to hello@valuesfordailyliving.org.",
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <PageHero
        crumb="Contact Us"
        title={
          <>
            Let&apos;s <em className="text-gold-soft">talk</em>
          </>
        }
        intro="Whether you're a school, a parent, a partner or a young person with purpose — we'd love to hear from you."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div data-reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">
                  Visit
                </p>
                <address className="mt-4 font-display text-2xl not-italic leading-snug">
                  127 Chime Avenue,
                  <br />
                  New Haven, Enugu,
                  <br />
                  Nigeria
                </address>
              </div>

              <div data-reveal className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">
                  Call
                </p>
                <a
                  href="tel:+2347030385985"
                  className="mt-4 block font-display text-2xl transition-colors hover:text-forest"
                >
                  +234 703 038 5985
                </a>
              </div>

              <div data-reveal className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">
                  Write
                </p>
                <a
                  href="mailto:hello@valuesfordailyliving.org"
                  className="mt-4 block font-display text-xl transition-colors hover:text-forest sm:text-2xl"
                >
                  hello@valuesfordailyliving.org
                </a>
              </div>

              <div data-reveal className="mt-12 overflow-hidden rounded-2xl border border-ink/10">
                <iframe
                  title="Map — 127 Chime Avenue, New Haven, Enugu"
                  src="https://maps.google.com/maps?q=127%20Chime%20Avenue%2C%20New%20Haven%2C%20Enugu%2C%20Nigeria&z=15&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div data-reveal className="rounded-2xl bg-cream p-8 lg:p-12">
                <h2 className="font-display text-3xl tracking-tight">
                  Send us a message
                </h2>
                <p className="mt-3 text-ink/60">
                  We usually respond within two working days.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollFx />
    </main>
  );
}
