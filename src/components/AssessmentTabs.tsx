"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import AssessmentForm from "./AssessmentForm";
import ScorecardForm from "./ScorecardForm";

const TABS = [
  {
    key: "self",
    label: "Self Assessment",
    blurb: "Ten honest statements across our five core values. Takes about three minutes.",
  },
  {
    key: "scorecard",
    label: "Character Scorecard",
    blurb: "For parents and teachers — score a child across 15 observable behaviours, print blank or filled.",
  },
] as const;

export default function AssessmentTabs() {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("self");

  useGSAP(
    () => {
      gsap.fromTo(
        ".at-swap",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", overwrite: true }
      );
    },
    { scope, dependencies: [active] }
  );

  const tab = TABS.find((t) => t.key === active)!;

  return (
    <div ref={scope}>
      <div className="print:hidden">
        <div className="flex flex-wrap justify-center gap-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              aria-pressed={active === t.key}
              className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors ${
                active === t.key
                  ? "border-forest bg-forest text-cream"
                  : "border-ink/15 text-ink/60 hover:border-forest/50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="at-swap mt-5 text-center text-sm text-ink/55">{tab.blurb}</p>
      </div>

      <div className="at-swap mt-10">
        {active === "self" ? <AssessmentForm /> : <ScorecardForm />}
      </div>
    </div>
  );
}
