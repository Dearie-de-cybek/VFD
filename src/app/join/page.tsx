import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Join the Movement — Values for Daily Living",
  description:
    "Register as a volunteer or participant with Values for Daily Living — get updates on school tours, conferences and programmes, and share your feedback with the team.",
};

export default function JoinPage() {
  return (
    <main>
      <Nav />
      <PageHero
        crumb="Join the Movement"
        title={
          <>
            Join the <em className="text-gold-soft">movement</em>
          </>
        }
        intro="Volunteers and participants — register once and we'll keep you updated on our activities, and you can share feedback with the VDL team anytime."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div data-reveal className="shadow-xl shadow-ink/5">
            <JoinForm />
          </div>
          <p className="mt-10 text-center text-xs leading-relaxed text-ink/40">
            Your details go directly to the VDL team and are used only to keep
            you informed about our programmes.
          </p>
        </div>
      </section>

      <Footer />
      <ScrollFx />
    </main>
  );
}
