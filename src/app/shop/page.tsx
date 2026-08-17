import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import PageHero from "@/components/PageHero";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main>
      <ScrollFx />
      <Nav />

      <PageHero
        crumb="Shop"
        title={
          <>
            Support the mission, <em className="text-gold-soft">grow your values</em>
          </>
        }
        intro="Explore resources, paperback and digital books, and daily merchandise carefully curated to encourage daily values and moral reflection."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/10 bg-cream p-12 text-center">
              <ShoppingBag className="h-12 w-12 text-ink/30 mb-4" />
              <h3 className="font-display text-xl font-semibold text-forest-deep">No products available yet</h3>
              <p className="mt-2 text-sm text-ink/60 max-w-sm">
                Our shop is currently being stocked. Check back soon for books, resources, and merch!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                // Generate automatic fallback WhatsApp checkout URL if no custom link is provided
                const checkoutUrl = p.link || `https://wa.me/2347030385985?text=Hello!%20I%20am%20interested%20in%20purchasing%20the%20product:%20${encodeURIComponent(p.title)}`;

                return (
                  <article
                    key={p.id}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-4 transition-all duration-300 hover:shadow-xl ${
                      p.featured ? "border-gold/40 shadow-md shadow-gold/5" : "border-ink/10"
                    }`}
                  >
                    {/* Featured Badge */}
                    {p.featured && (
                      <span className="absolute top-6 left-6 z-10 rounded-full bg-gold px-3.5 py-1 text-xs font-semibold text-forest-deep uppercase tracking-wider">
                        Featured
                      </span>
                    )}

                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream">
                      {p.img ? (
                        <Image
                          src={p.img}
                          alt={p.alt || p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-forest-deep/5 text-forest/40">
                          <ShoppingBag className="h-12 w-12" />
                        </div>
                      )}
                    </div>

                    {/* Metadata & Title */}
                    <div className="mt-6 flex flex-1 flex-col">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl font-bold tracking-tight text-forest-deep leading-tight group-hover:text-forest transition-colors">
                          {p.title}
                        </h3>
                        <span className="text-lg font-bold text-forest shrink-0">
                          ₦{p.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-ink/70 leading-relaxed flex-1 line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Checkout Button */}
                      <div className="mt-6">
                        <a
                          href={checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-forest-deep focus:ring-4 focus:ring-forest/20"
                        >
                          <span>Purchase Now</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
