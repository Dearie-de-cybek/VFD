import { prisma } from "@/lib/prisma";
import QuoteCarousel from "./QuoteCarousel";

export default async function Quote() {
  const quotes = await prisma.quote.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (quotes.length === 0) return null;

  return (
    <section data-reveal className="bg-paper py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <QuoteCarousel quotes={quotes} />
      </div>
    </section>
  );
}
