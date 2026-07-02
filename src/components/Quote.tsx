import Image from "next/image";

export default function Quote() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <div
            data-reveal
            className="relative aspect-square overflow-hidden rounded-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
              alt="Children writing at their desks"
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>

        <figure className="order-1 lg:order-2 lg:col-span-8">
          <blockquote
            data-reveal
            className="font-display text-[clamp(1.9rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-tight"
          >
            <span aria-hidden className="mr-2 text-gold">“</span>
            A nation can rise no higher than the values of its people. So we
            begin where nations truly begin —{" "}
            <em className="text-forest">in the heart of a child.</em>
            <span aria-hidden className="text-gold">”</span>
          </blockquote>
          <figcaption
            data-reveal
            className="mt-8 flex items-center gap-4 text-sm"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="font-semibold uppercase tracking-[0.2em] text-moss">
              The Values for Daily Living movement
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
