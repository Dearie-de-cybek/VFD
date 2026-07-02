import Link from "next/link";
import TreeLogo from "./TreeLogo";

type Props = {
  crumb: string;
  title: React.ReactNode;
  intro?: string;
};

export default function PageHero({ crumb, title, intro }: Props) {
  return (
    <section className="relative overflow-hidden bg-forest-deep pb-16 pt-[calc(var(--header-h)+4rem)] text-cream lg:pb-20">
      <TreeLogo
        idPrefix={`ph-${crumb.toLowerCase().replace(/\s/g, "-")}`}
        className="pointer-events-none absolute -right-12 -top-6 h-[22rem] w-auto text-gold opacity-10"
      />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-[0.25em] text-cream/60"
        >
          <ol className="flex items-center gap-3">
            <li>
              <Link href="/" className="transition-colors hover:text-gold-soft">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-gold">✦</li>
            <li className="text-gold-soft">{crumb}</li>
          </ol>
        </nav>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.8rem)] font-medium leading-[0.98] tracking-tight">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
