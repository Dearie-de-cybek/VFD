import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValuesMarquee from "@/components/ValuesMarquee";
import About from "@/components/About";
import Spotlight from "@/components/Spotlight";
import Pillars from "@/components/Pillars";
import Commitment from "@/components/Commitment";
import Programs from "@/components/Programs";
import Impact from "@/components/Impact";
import Quote from "@/components/Quote";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ValuesMarquee />
      <About />
      <Spotlight />
      <Pillars />
      <Commitment />
      <Programs />
      <Impact />
      <Quote />
      <GetInvolved />
      <Footer />
      <ScrollFx />
    </main>
  );
}
