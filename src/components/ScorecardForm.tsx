"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TreeLogo from "./TreeLogo";
import {
  QUESTIONS,
  BANDS,
  bandFor,
  LEVELS,
  type Question,
} from "@/lib/scorecard";

type Phase = "setup" | "quiz" | "review" | "done";

type Info = {
  child: string;
  level: string;
  klass: string;
  teacher: string;
  parent: string;
};

const inputCls =
  "mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-ink/30 focus:border-forest";

export default function ScorecardForm() {
  const scope = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("setup");
  const [info, setInfo] = useState<Info>({
    child: "",
    level: "",
    klass: "",
    teacher: "",
    parent: "",
  });
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [idx, setIdx] = useState(0);
  const [error, setError] = useState("");
  const [custom, setCustom] = useState({ text: "", value: "" });
  const [printMode, setPrintMode] = useState<"blank" | "filled">("blank");

  const q = questions[idx];
  const answered = questions.filter((x) => scores[x.id] !== undefined).length;
  const scored = questions.filter((x) => scores[x.id] !== undefined);
  const average =
    scored.length > 0
      ? Math.round(
          scored.reduce((a, x) => a + (scores[x.id] ?? 0), 0) / scored.length
        )
      : 0;

  /* ── decoration: the tree grows as questions are answered ── */
  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(
        "[data-tree='scorecard'] .tree-branch path"
      );
      const full = phase === "done";
      const progress = full ? 1 : answered / questions.length;
      const visible = Math.round(paths.length * progress);
      paths.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len });
        gsap.to(path, {
          strokeDashoffset: i < visible ? 0 : len,
          duration: 0.7,
          ease: "power2.inOut",
          delay: (i % 4) * 0.06,
        });
      });
      gsap.to("[data-tree='scorecard'] .tree-leaves circle", {
        scale: full ? 1 : 0,
        transformOrigin: "center",
        duration: 0.5,
        stagger: 0.06,
        ease: full ? "back.out(2.5)" : "power2.in",
      });
    },
    { scope, dependencies: [answered, phase, questions.length] }
  );

  /* card slide-in — decoration only, state changes synchronously */
  useGSAP(
    () => {
      if (phase === "quiz") {
        gsap.fromTo(
          ".sc-card",
          { opacity: 0, y: 24, rotate: -0.5 },
          { opacity: 1, y: 0, rotate: 0, duration: 0.45, ease: "power3.out", overwrite: true }
        );
      }
      if (phase === "done") {
        // count the headline number up and grow the bars
        const state = { v: 0 };
        gsap.to(state, {
          v: average,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            const el = document.querySelector(".sc-average");
            if (el) el.textContent = String(Math.round(state.v));
          },
        });
        gsap.fromTo(
          ".sc-bar",
          { width: 0 },
          { width: (i, el) => el.dataset.w + "%", duration: 1, stagger: 0.05, ease: "power3.out" }
        );
      }
    },
    { scope, dependencies: [idx, phase] }
  );

  const setScore = (id: string, v: number) =>
    setScores((s) => ({ ...s, [id]: v }));

  const startQuiz = () => {
    if (!info.child.trim()) return setError("Please enter the child's name.");
    if (!info.level) return setError("Please select a school level.");
    setError("");
    setPhase("quiz");
    setIdx(0);
  };

  const next = () => {
    if (scores[q.id] === undefined)
      return setError("Pick a band or slide to a score first — honest is best!");
    setError("");
    if (idx < questions.length - 1) setIdx(idx + 1);
    else setPhase("review");
  };

  const addCustom = () => {
    if (!custom.text.trim() || !custom.value.trim())
      return setError("Give your question and the value it builds.");
    setError("");
    const id = `c${Date.now()}`;
    setQuestions((qs) => [
      ...qs,
      { id, text: custom.text.trim(), value: custom.value.trim(), custom: true },
    ]);
    setCustom({ text: "", value: "" });
    setIdx(questions.length); // jump straight to scoring it
    setPhase("quiz");
  };

  const printCard = (mode: "blank" | "filled") => {
    setPrintMode(mode);
    setTimeout(() => window.print(), 60);
  };

  const weakest = [...scored]
    .sort((a, b) => (scores[a.id] ?? 0) - (scores[b.id] ?? 0))
    .slice(0, 3)
    .filter((x) => (scores[x.id] ?? 0) < 70);

  const overallBand = bandFor(average);

  return (
    <div ref={scope}>
      {/* ══════════════ interactive experience (hidden when printing) ══════════════ */}
      <div className="print:hidden">
        {/* progress header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <TreeLogo idPrefix="scorecard" className="h-20 w-16 text-gold" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss">
                {phase === "setup" && "Getting ready"}
                {phase === "quiz" && `Question ${idx + 1} of ${questions.length}`}
                {phase === "review" && "Review & customise"}
                {phase === "done" && "Scorecard complete"}
              </p>
              <p className="mt-1 font-display text-xl leading-tight">
                {info.child ? `${info.child}'s character garden` : "A character garden"}
              </p>
            </div>
          </div>
          <p className="hidden text-right text-sm text-ink/50 sm:block">
            {answered}/{questions.length} answered
          </p>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-500"
            style={{ width: `${(answered / questions.length) * 100}%` }}
          />
        </div>

        {/* ── SETUP ── */}
        {phase === "setup" && (
          <div className="sc-card mt-10 rounded-2xl border border-ink/10 bg-white p-8 lg:p-10">
            <h2 className="font-display text-3xl tracking-tight">
              Whose character are we growing?
            </h2>
            <p className="mt-3 leading-relaxed text-ink/60">
              Score each question from 0–100 based on observable behaviour —
              or print the blank scorecard and hand it to your child&apos;s
              teacher for an honest review.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">Child&apos;s name</span>
                <input type="text" value={info.child}
                  onChange={(e) => setInfo({ ...info, child: e.target.value })}
                  placeholder="e.g. Somto" className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">School level</span>
                <select value={info.level}
                  onChange={(e) => setInfo({ ...info, level: e.target.value })}
                  className={inputCls}>
                  <option value="">Select level</option>
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Class <span className="font-normal text-ink/40">(optional)</span></span>
                <input type="text" value={info.klass}
                  onChange={(e) => setInfo({ ...info, klass: e.target.value })}
                  placeholder="e.g. Primary 5" className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Teacher&apos;s name <span className="font-normal text-ink/40">(optional)</span></span>
                <input type="text" value={info.teacher}
                  onChange={(e) => setInfo({ ...info, teacher: e.target.value })}
                  placeholder="e.g. Mrs. Eze" className={inputCls} />
              </label>
            </div>
            {error && <p role="alert" className="mt-5 text-sm font-semibold text-red-700">{error}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={startQuiz}
                className="rounded-full bg-gold px-9 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5">
                Start scoring
              </button>
              <button onClick={() => printCard("blank")}
                className="rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold transition-colors hover:border-forest hover:text-forest">
                🖨 Print blank scorecard for the teacher
              </button>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <div className="sc-card mt-10 rounded-2xl border border-ink/10 bg-white p-8 lg:p-10">
            <span className="inline-block rounded-full bg-forest px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream">
              {q.value}
            </span>
            <h2 className="mt-5 font-display text-2xl leading-snug tracking-tight lg:text-3xl">
              {q.text}
            </h2>
            {q.reverse && (
              <p className="mt-3 inline-block rounded-lg bg-gold/15 px-3 py-1.5 text-sm text-ink/70">
                ↺ Reversed: a <strong>high score</strong> means this rarely or never happens.
              </p>
            )}

            {/* band buttons */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {BANDS.map((b) => {
                const selected =
                  scores[q.id] !== undefined && bandFor(scores[q.id]).key === b.key;
                return (
                  <button key={b.key} type="button"
                    onClick={() => setScore(q.id, b.mid)}
                    aria-pressed={selected}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      selected
                        ? "scale-[1.02] border-transparent text-white shadow-lg"
                        : "border-ink/10 bg-paper hover:border-ink/30"
                    }`}
                    style={selected ? { background: b.color } : undefined}>
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="mt-1 block text-sm font-bold">{b.label}</span>
                    <span className={`text-xs ${selected ? "text-white/70" : "text-ink/40"}`}>
                      {b.range}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* fine-tune slider */}
            <div className="mt-7 rounded-xl bg-paper p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink/60">Fine-tune the score</span>
                <span className="font-display text-3xl"
                  style={{ color: scores[q.id] !== undefined ? bandFor(scores[q.id]).color : "#12331e40" }}>
                  {scores[q.id] ?? "–"}
                </span>
              </div>
              <input
                type="range" min={0} max={100} step={5}
                value={scores[q.id] ?? 50}
                onChange={(e) => setScore(q.id, Number(e.target.value))}
                aria-label={`Score for: ${q.text}`}
                className="mt-3 w-full cursor-pointer"
                style={{ accentColor: scores[q.id] !== undefined ? bandFor(scores[q.id]).color : "#c9a227" }}
              />
              <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-ink/35">
                <span>0 · Needs improvement</span>
                <span className="hidden sm:block">40–60 · Progressing</span>
                <span>100 · Expected</span>
              </div>
            </div>

            <details className="mt-5 rounded-xl border border-ink/10 p-4 open:bg-paper">
              <summary className="cursor-pointer text-sm font-semibold text-ink/60">
                ✎ Add a remark for this question (optional)
              </summary>
              <textarea rows={2} value={remarks[q.id] ?? ""}
                onChange={(e) => setRemarks((r) => ({ ...r, [q.id]: e.target.value }))}
                placeholder="e.g. Improved a lot this term…"
                className={`${inputCls} resize-y`} />
            </details>

            {error && <p role="alert" className="mt-5 text-sm font-semibold text-red-700">{error}</p>}

            <div className="mt-8 flex items-center justify-between">
              <button type="button"
                onClick={() => (idx > 0 ? setIdx(idx - 1) : setPhase("setup"))}
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-forest hover:text-forest">
                ← Back
              </button>
              <button type="button" onClick={next}
                className="rounded-full bg-forest px-9 py-3.5 text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:bg-forest-deep">
                {idx < questions.length - 1 ? "Next →" : "Review answers"}
              </button>
            </div>
          </div>
        )}

        {/* ── REVIEW ── */}
        {phase === "review" && (
          <div className="sc-card mt-10 rounded-2xl border border-ink/10 bg-white p-8 lg:p-10">
            <h2 className="font-display text-3xl tracking-tight">
              Review {info.child}&apos;s answers
            </h2>
            <p className="mt-2 text-ink/60">Tap any row to change a score.</p>
            <ul className="mt-7 divide-y divide-ink/10">
              {questions.map((item, i) => {
                const s = scores[item.id];
                const b = s !== undefined ? bandFor(s) : null;
                return (
                  <li key={item.id}>
                    <button type="button"
                      onClick={() => { setIdx(i); setPhase("quiz"); }}
                      className="flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-paper">
                      <span className="w-7 shrink-0 font-mono text-xs text-ink/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-sm leading-snug">{item.text}</span>
                      {b ? (
                        <span className="shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white"
                          style={{ background: b.color }}>
                          {b.emoji} {s}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink/50">
                          not scored
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* add your own question */}
            <div className="mt-8 rounded-xl bg-paper p-6">
              <h3 className="font-display text-xl">Add your own question</h3>
              <p className="mt-1 text-sm text-ink/55">
                Every child is unique — add questions that fit yours.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-[2fr_1fr_auto]">
                <input type="text" value={custom.text}
                  onChange={(e) => setCustom({ ...custom, text: e.target.value })}
                  placeholder="e.g. Does my child complete homework unprompted?"
                  className="rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none focus:border-forest" />
                <input type="text" value={custom.value}
                  onChange={(e) => setCustom({ ...custom, value: e.target.value })}
                  placeholder="Value, e.g. Diligence"
                  className="rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none focus:border-forest" />
                <button type="button" onClick={addCustom}
                  className="rounded-lg bg-forest px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-deep">
                  + Add
                </button>
              </div>
            </div>

            {error && <p role="alert" className="mt-5 text-sm font-semibold text-red-700">{error}</p>}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={() => { setIdx(questions.length - 1); setPhase("quiz"); }}
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-forest hover:text-forest">
                ← Back
              </button>
              <button type="button" onClick={() => setPhase("done")}
                className="rounded-full bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5">
                🌳 See the results
              </button>
            </div>
          </div>
        )}

        {/* ── DONE ── */}
        {phase === "done" && (
          <div className="mt-10 space-y-6">
            <div className="rounded-2xl bg-forest-deep p-8 text-center text-cream lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
                {info.child}&apos;s overall score
              </p>
              <p className="mt-4 font-display text-7xl text-gold-soft lg:text-8xl">
                <span className="sc-average">0</span>
                <span className="text-3xl text-cream/40"> / 100</span>
              </p>
              <p className="mt-4 text-2xl">
                {overallBand.emoji}{" "}
                <span className="font-display italic text-gold-soft">{overallBand.label}</span>
              </p>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70">
                Character is a garden, not a verdict. Use this long holiday to
                water what&apos;s growing — and set measurable goals before the
                new session begins.
              </p>
            </div>

            {/* per-question bars */}
            <div className="rounded-2xl border border-ink/10 bg-white p-8 lg:p-10">
              <h3 className="font-display text-2xl tracking-tight">The garden, value by value</h3>
              <ul className="mt-7 space-y-4">
                {questions.map((item) => {
                  const s = scores[item.id];
                  if (s === undefined) return null;
                  const b = bandFor(s);
                  return (
                    <li key={item.id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-semibold">{item.value}</span>
                        <span className="font-mono text-xs" style={{ color: b.color }}>
                          {b.emoji} {s}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink/8">
                        <div className="sc-bar h-full rounded-full" data-w={s}
                          style={{ background: b.color, width: `${s}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* holiday goals */}
            {weakest.length > 0 && (
              <div className="rounded-2xl border-2 border-gold/40 bg-gold/10 p-8 lg:p-10">
                <h3 className="font-display text-2xl tracking-tight">
                  🌱 Holiday goals — where to water first
                </h3>
                <ul className="mt-6 space-y-4">
                  {weakest.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                      <p className="text-sm leading-relaxed text-ink/75">
                        <strong>{item.value}:</strong> revisit &ldquo;{item.text}&rdquo;
                        Set one measurable target for the holiday, review it together
                        weekly, and re-score before the new session begins.
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => printCard("filled")}
                className="rounded-full bg-forest px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:bg-forest-deep">
                🖨 Print completed scorecard
              </button>
              <button onClick={() => printCard("blank")}
                className="rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold transition-colors hover:border-forest hover:text-forest">
                Print a blank copy
              </button>
              <button
                onClick={() => { setScores({}); setRemarks({}); setIdx(0); setPhase("setup"); }}
                className="rounded-full border border-ink/20 px-8 py-4 text-sm font-semibold transition-colors hover:border-forest hover:text-forest">
                Start over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════ printable scorecard (only visible when printing) ══════════════ */}
      <div className="hidden print:block">
        <div className="mb-6 flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <p className="font-display text-2xl font-bold">VDL Moral Assessment Scorecard</p>
            <p className="text-sm">For Elementary, Primary and Secondary School Students — Values for Daily Living</p>
          </div>
          <TreeLogo idPrefix="print" className="h-16 w-14 text-black" />
        </div>
        <p className="mb-4 text-sm">
          <strong>Child:</strong> {info.child || "____________________"} &nbsp;
          <strong>Level/Class:</strong> {info.level || "________"} {info.klass} &nbsp;
          <strong>Teacher:</strong> {info.teacher || "____________________"} &nbsp;
          <strong>Date:</strong> ____________
        </p>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {["S/N", "Assessment Question", "0–30", "40–60", "70–100", "Core Values for Character Development", "Remarks"].map((h) => (
                <th key={h} className="border border-black bg-black/5 p-2 text-left font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((item, i) => {
              const s = printMode === "filled" ? scores[item.id] : undefined;
              const b = s !== undefined ? bandFor(s) : null;
              return (
                <tr key={item.id}>
                  <td className="border border-black p-2">{i + 1}</td>
                  <td className="border border-black p-2">{item.text}</td>
                  <td className="border border-black p-2 text-center">{b?.key === "ni" ? `✓ ${s}` : ""}</td>
                  <td className="border border-black p-2 text-center">{b?.key === "prog" ? `✓ ${s}` : ""}</td>
                  <td className="border border-black p-2 text-center">{b?.key === "exp" ? `✓ ${s}` : ""}</td>
                  <td className="border border-black p-2">{item.value}</td>
                  <td className="border border-black p-2">
                    {printMode === "filled" ? remarks[item.id] || "" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-4 text-[10px] leading-relaxed">
          Scoring: 0–30 Needs Improvement · 40–60 Progress Towards Expected Behaviour · 70–100 Expected Behaviour.
          You may change or add questions based on the unique characteristics of your child — this scorecard serves as a general guide.
          When completed and returned, set measurable goals to improve or reinforce the values you wish to develop in your child.
          valuesfordailyliving.org
        </p>
      </div>
    </div>
  );
}
