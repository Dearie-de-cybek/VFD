import type { Metadata } from "next";
import TreeLogo from "@/components/TreeLogo";
import { IconSparkle } from "@/components/icons";
import MemberLoginForm from "./MemberLoginForm";

export const metadata: Metadata = {
  title: "Member Portal Sign In — Values for Daily Living",
  description: "Sign in to your VFD Member Portal to access scorecards, resources, and upcoming webinars.",
};

export default async function MemberLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* brand panel */}
      <div className="relative hidden overflow-hidden bg-forest-deep px-14 py-12 text-cream lg:flex lg:flex-col lg:justify-between">
        <TreeLogo
          idPrefix="member-login-bg"
          className="pointer-events-none absolute -right-24 -top-16 h-[34rem] w-auto text-gold opacity-[0.07]"
        />

        <div className="relative flex items-center gap-3">
          <TreeLogo className="h-9 w-8 text-gold" idPrefix="member-login" />
          <span className="font-display text-lg leading-none tracking-tight">
            Values for
            <br />
            Daily Living
          </span>
        </div>

        <div className="relative max-w-md">
          <IconSparkle className="h-6 w-6 text-gold" />
          <p className="mt-6 font-display text-3xl leading-[1.2] tracking-tight">
            Character is the seed. Society is the harvest.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-cream/60">
            Access your moral scorecard, upcoming webinars, and VDL community updates. Every step towards high moral values helps build a stronger nation.
          </p>
        </div>

        <p className="relative text-xs uppercase tracking-[0.25em] text-cream/40">
          Member Portal
        </p>
      </div>

      {/* form panel */}
      <div className="flex items-center justify-center bg-paper px-6 py-16">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <TreeLogo className="h-8 w-7 text-forest" idPrefix="member-login-mobile" />
            <span className="font-display text-base leading-none tracking-tight text-ink">
              Values for
              <br />
              Daily Living
            </span>
          </div>

          <h1 className="font-display text-3xl tracking-tight text-ink">
            Sign In
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink/55">
            Access webinars, scorecard, and your VFD profile.
          </p>

          <div className="mt-8">
            <MemberLoginForm next={next || "/dashboard"} />
          </div>
        </div>
      </div>
    </div>
  );
}
