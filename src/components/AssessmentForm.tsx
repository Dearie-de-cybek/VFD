"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATEMENTS = [
  { value: "Integrity", text: "I keep my word even when breaking it would cost me nothing." },
  { value: "Integrity", text: "I am truthful even when a lie would be more convenient." },
  { value: "Responsibility", text: "When I make a mistake, I own it rather than shift the blame." },
  { value: "Responsibility", text: "I finish what I commit to, even without supervision." },
  { value: "Empathy", text: "I genuinely try to understand how others feel before I judge them." },
  { value: "Empathy", text: "I notice when someone around me is struggling and act on it." },
  { value: "Honesty", text: "I would return excess change or money that isn't mine." },
  { value: "Honesty", text: "I resist cutting corners even when no one is watching." },
  { value: "Discipline", text: "I follow through on my plans rather than my moods." },
  { value: "Discipline", text: "I can delay gratification for something more important." },
];

const SCALE = [
  { score: 1, label: "Never" },
  { score: 2, label: "Rarely" },
  { score: 3, label: "Sometimes" },
  { score: 4, label: "Often" },
  { score: 5, label: "Always" },
];

const ROLES = ["Student", "Parent", "Teacher", "Community Leader", "Other"];

function band(score: number) {
  if (score >= 42)
    return {
      title: "Deeply Rooted",
      color: "text-gold",
      note: "Your values are a strong, steady foundation. Consider mentoring others — character like this multiplies when it is shared. Our Youth Ambassador and volunteer programmes would be glad to have you.",
    };
  if (score >= 30)
    return {
      title: "Growing Well",
      color: "text-gold-soft",
      note: "Your roots are real and reaching. The next season of growth comes from consistency — small values, practiced daily. Our workshops and resources can help you strengthen the areas that wobble under pressure.",
    };
  return {
    title: "Ready for Nurturing",
    color: "text-cream",
    note: "Honesty about where we are is itself a value — and you have just practiced it. Character is built, not born. Reach out to us; our values education programmes exist precisely for this journey.",
  };
}

export default function AssessmentForm() {
  const scope = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const { contextSafe } = useGSAP({ scope });

  const submit = contextSafe((e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < STATEMENTS.length) {
      setError(
        `Please respond to all ${STATEMENTS.length} statements — ${
          STATEMENTS.length - Object.keys(answers).length
        } remaining.`
      );
      return;
    }
    setError("");
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    setResult(total);
    requestAnimationFrame(() => {
      document.getElementById("assessment-result")?.scrollIntoView({ block: "center" });
      gsap.fromTo(
        "#assessment-result",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    });
  });

  if (result !== null) {
    const b = band(result);
    return (
      <div ref={scope}>
        <div
          id="assessment-result"
          className="rounded-2xl bg-forest-deep p-10 text-center text-cream lg:p-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
            {name ? `${name}, your` : "Your"} values profile
          </p>
          <p className={`mt-6 font-display text-5xl lg:text-6xl ${b.color}`}>
            {b.title}
          </p>
          <p className="mt-4 font-mono text-sm text-cream/50">
            Score: {result} / {STATEMENTS.length * 5}
          </p>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-cream/80">
            {b.note}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-forest-deep"
            >
              Talk to us
            </a>
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
              }}
              className="rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold-soft hover:text-gold-soft"
            >
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={scope}>
      <form onSubmit={submit} noValidate>
        {/* who is taking it */}
        <div data-reveal className="grid gap-6 rounded-2xl bg-cream p-8 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Your name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chidinma Okafor"
              className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">I am a…</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors focus:border-forest"
            >
              <option value="">Select one (optional)</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* statements */}
        <ol className="mt-10 space-y-6">
          {STATEMENTS.map((s, i) => (
            <li
              key={i}
              data-reveal
              className="rounded-2xl border border-ink/10 bg-white p-6 lg:p-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-lg italic text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-lg font-medium leading-snug">
                    {s.text}
                  </p>
                </div>
              </div>
              <fieldset className="mt-5">
                <legend className="sr-only">{s.text}</legend>
                <div className="grid grid-cols-5 gap-2">
                  {SCALE.map((opt) => (
                    <label
                      key={opt.score}
                      className={`cursor-pointer rounded-lg border px-1 py-2.5 text-center text-xs font-semibold transition-colors sm:text-sm ${
                        answers[i] === opt.score
                          ? "border-forest bg-forest text-cream"
                          : "border-ink/15 text-ink/60 hover:border-forest/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={opt.score}
                        checked={answers[i] === opt.score}
                        onChange={() =>
                          setAnswers((a) => ({ ...a, [i]: opt.score }))
                        }
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-10 flex flex-col items-center gap-4">
          {error && (
            <p role="alert" className="text-sm font-semibold text-red-700">
              {error}
            </p>
          )}
          <p className="text-sm text-ink/50">
            {Object.keys(answers).length} of {STATEMENTS.length} answered
          </p>
          <button
            type="submit"
            className="rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5"
          >
            See my values profile
          </button>
        </div>
      </form>
    </div>
  );
}
