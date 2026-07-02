import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import AssessmentTabs from "@/components/AssessmentTabs";

export const metadata: Metadata = {
  title: "Moral Assessment Form — Values for Daily Living",
  description:
    "A short self-assessment across our five core values, plus a printable character scorecard for parents and teachers to assess a child.",
};

export default function AssessmentPage() {
  return (
    <main>
      <div className="print:hidden">
        <Nav />
        <PageHero
          crumb="Moral Assessment"
          title={
            <>
              Moral <em className="text-gold-soft">Assessment</em>
            </>
          }
          intro="A truthful mirror for yourself, or a printable scorecard for a child in your care. There are no wrong answers."
        />
      </div>

      <section className="bg-paper py-20 lg:py-28 print:bg-white print:py-0">
        <div className="mx-auto max-w-3xl px-6 md:px-12 print:max-w-none print:px-0">
          <AssessmentTabs />
          <p className="mt-10 text-center text-xs leading-relaxed text-ink/40 print:hidden">
            These assessments are reflective, not diagnostic. Nothing is
            stored or transmitted — everything is calculated on your device.
          </p>
        </div>
      </section>

      <div className="print:hidden">
        <Footer />
        <ScrollFx />
      </div>
    </main>
  );
}
