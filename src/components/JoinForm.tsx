"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import TreeLogo from "./TreeLogo";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT — Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
  "Not applicable (non-Nigerian)",
];

const CLASSES = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3", "Tertiary", "Other"];

const OCCUPATIONS = [
  "School Owner",
  "Teacher",
  "Agency Official (e.g. NOA)",
  "Parent / Guardian",
  "Civil Servant",
  "Business Owner / Entrepreneur",
  "Clergy / Faith Leader",
  "Student (Tertiary)",
  "NGO Worker / Volunteer",
  "Other",
];

const STEPS = ["About you", "Where you're from", "What you do", "Your message"];

type Data = {
  name: string;
  email: string;
  phone: string;
  type: "" | "Teenager" | "Adult";
  address: string;
  state: string;
  nationality: string;
  school: string;
  klass: string;
  age: string;
  occupation: string;
  orgName: string;
  comments: string;
  updates: boolean;
};

const INITIAL: Data = {
  name: "", email: "", phone: "", type: "",
  address: "", state: "", nationality: "Nigerian",
  school: "", klass: "", age: "",
  occupation: "", orgName: "",
  comments: "", updates: true,
};

/** which conditional org field an adult occupation needs */
function orgField(occupation: string) {
  if (occupation === "School Owner") return { label: "Name of your school", ph: "e.g. Sunrise International College" };
  if (occupation === "Teacher") return { label: "School where you teach", ph: "e.g. Community Secondary School, Enugu" };
  if (occupation.startsWith("Agency")) return { label: "Agency name", ph: "e.g. National Orientation Agency (NOA)" };
  if (occupation === "Other") return { label: "Please tell us what you do", ph: "e.g. Nurse" };
  return null;
}

const inputCls =
  "mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-ink/30 focus:border-forest";

export default function JoinForm() {
  const scope = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(INITIAL);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (patch: Partial<Data>) => setD((v) => ({ ...v, ...patch }));

  const { contextSafe } = useGSAP(
    () => {
      // tree grows with progress: draw a slice of branches per completed step
      const paths = gsap.utils.toArray<SVGPathElement>(
        "[data-tree='join'] .tree-branch path"
      );
      const total = paths.length;
      const progress = done ? 1 : step / STEPS.length;
      const visible = Math.round(total * progress);
      paths.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len });
        gsap.to(path, {
          strokeDashoffset: i < visible || done ? 0 : len,
          duration: 0.7,
          ease: "power2.inOut",
          delay: (i % 4) * 0.08,
        });
      });
      gsap.to("[data-tree='join'] .tree-leaves circle", {
        scale: done ? 1 : 0,
        transformOrigin: "center",
        duration: 0.5,
        stagger: 0.06,
        ease: done ? "back.out(2.5)" : "power2.in",
      });
    },
    { scope, dependencies: [step, done] }
  );

  const validate = (): string => {
    if (step === 0) {
      if (!d.name.trim()) return "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return "Please enter a valid email address.";
      if (d.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
      if (!d.type) return "Please tell us if you're joining as a teenager or an adult.";
    }
    if (step === 1) {
      if (!d.address.trim()) return "Please enter your address.";
      if (!d.state) return "Please select your state of origin.";
      if (!d.nationality.trim()) return "Please enter your nationality.";
    }
    if (step === 2) {
      if (d.type === "Teenager") {
        if (!d.school.trim()) return "Please enter your school.";
        if (!d.klass) return "Please select your class.";
        const age = Number(d.age);
        if (!d.age || age < 10 || age > 19) return "Please enter your age (10–19).";
      } else {
        if (!d.occupation) return "Please select your occupation.";
        if (orgField(d.occupation) && !d.orgName.trim())
          return `${orgField(d.occupation)!.label} is required.`;
      }
    }
    return "";
  };

  // state changes synchronously; the slide-in on [step] is decoration only,
  // so the form keeps working even when animation frames are throttled
  const lastDir = useRef<1 | -1>(1);

  useGSAP(
    () => {
      gsap.fromTo(
        ".step-panel",
        { opacity: 0, x: lastDir.current === 1 ? 28 : -28 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", overwrite: true }
      );
    },
    { scope, dependencies: [step] }
  );

  const go = contextSafe((dir: 1 | -1) => {
    if (dir === 1) {
      const err = validate();
      if (err) {
        setError(err);
        gsap.fromTo(".join-error", { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
        return;
      }
    }
    setError("");
    lastDir.current = dir;
    setStep((s) => s + dir);
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    const profile =
      d.type === "Teenager"
        ? `School: ${d.school}\nClass: ${d.klass}\nAge: ${d.age}`
        : `Occupation: ${d.occupation}${d.orgName ? `\n${orgField(d.occupation)?.label}: ${d.orgName}` : ""}`;
    const body = [
      `New ${d.type.toLowerCase()} sign-up — volunteers & participants`,
      ``,
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone}`,
      `Address: ${d.address}`,
      `State of origin: ${d.state}`,
      `Nationality: ${d.nationality}`,
      profile,
      `Wants activity updates: ${d.updates ? "Yes" : "No"}`,
      ``,
      `Comments for the VDL team:`,
      d.comments || "—",
    ].join("\n");
    window.location.href = `mailto:hello@valuesfordailyliving.org?subject=${encodeURIComponent(
      `VDL sign-up — ${d.name}`
    )}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };

  return (
    <div ref={scope} className="grid overflow-hidden rounded-3xl lg:grid-cols-12">
      {/* left — progress panel */}
      <div className="relative bg-forest-deep p-8 text-cream lg:col-span-4 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
          {done ? "Welcome aboard" : `Step ${step + 1} of ${STEPS.length}`}
        </p>

        <ol className="mt-8 space-y-4">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-4">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${
                  done || i < step
                    ? "border-gold bg-gold text-forest-deep"
                    : i === step
                      ? "border-gold text-gold-soft"
                      : "border-cream/25 text-cream/40"
                }`}
              >
                {done || i < step ? "✓" : i + 1}
              </span>
              <span
                className={`text-sm transition-colors duration-300 ${
                  i === step && !done ? "text-cream" : "text-cream/50"
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>

        {/* the tree grows as the form is completed */}
        <div className="mt-10 flex justify-center lg:mt-14">
          <TreeLogo idPrefix="join" className="h-44 w-36 text-gold lg:h-56 lg:w-44" />
        </div>
        <p className="mt-6 text-center font-display text-lg italic leading-snug text-cream/70">
          {done
            ? "You've been planted. Watch what grows."
            : "Every field you fill grows the tree."}
        </p>
      </div>

      {/* right — form */}
      <div className="bg-cream p-8 lg:col-span-8 lg:p-12">
        {done ? (
          <div className="flex h-full flex-col items-start justify-center">
            <p className="font-display text-4xl tracking-tight text-forest">
              Thank you, {d.name.split(" ")[0]}.
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-ink/70">
              Your email app should have opened with your details ready to send
              to the VDL team. Once we receive it, we&apos;ll keep you updated on
              tours, conferences and volunteer opportunities near you.
            </p>
            <p className="mt-3 max-w-md text-sm text-ink/50">
              If it didn&apos;t open, write to us directly at{" "}
              <a href="mailto:hello@valuesfordailyliving.org" className="font-semibold text-forest underline">
                hello@valuesfordailyliving.org
              </a>.
            </p>
            <button
              onClick={() => {
                setDone(false);
                setStep(0);
                setD(INITIAL);
              }}
              className="mt-9 rounded-full border border-ink/20 px-8 py-3.5 text-sm font-semibold transition-colors hover:border-forest hover:text-forest"
            >
              Register someone else
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="step-panel">
              {step === 0 && (
                <fieldset>
                  <legend className="font-display text-3xl tracking-tight">
                    First, who are we planting with?
                  </legend>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {(["Teenager", "Adult"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set({ type: t, occupation: "", school: "", klass: "", age: "", orgName: "" })}
                        aria-pressed={d.type === t}
                        className={`rounded-xl border p-6 text-left transition-colors ${
                          d.type === t
                            ? "border-forest bg-forest text-cream"
                            : "border-ink/15 bg-white hover:border-forest/50"
                        }`}
                      >
                        <span className="font-display text-2xl">{t}</span>
                        <span className={`mt-1.5 block text-sm ${d.type === t ? "text-cream/70" : "text-ink/50"}`}>
                          {t === "Teenager"
                            ? "In secondary school, 10–19 years old"
                            : "Parent, teacher, professional or leader"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="text-sm font-semibold">Full name</span>
                      <input type="text" value={d.name} onChange={(e) => set({ name: e.target.value })}
                        placeholder="e.g. Chidinma Okafor" className={inputCls} />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold">Email</span>
                      <input type="email" value={d.email} onChange={(e) => set({ email: e.target.value })}
                        placeholder="you@example.com" className={inputCls} />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold">Phone number</span>
                      <input type="tel" value={d.phone} onChange={(e) => set({ phone: e.target.value })}
                        placeholder="e.g. 0703 038 5985" className={inputCls} />
                    </label>
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="font-display text-3xl tracking-tight">
                    Where are your roots?
                  </legend>
                  <div className="mt-7 grid gap-5">
                    <label className="block">
                      <span className="text-sm font-semibold">Address</span>
                      <input type="text" value={d.address} onChange={(e) => set({ address: e.target.value })}
                        placeholder="House number, street, town / city" className={inputCls} />
                    </label>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-semibold">State of origin</span>
                        <select value={d.state} onChange={(e) => set({ state: e.target.value })} className={inputCls}>
                          <option value="">Select your state</option>
                          {NIGERIAN_STATES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-sm font-semibold">Nationality</span>
                        <input type="text" value={d.nationality} onChange={(e) => set({ nationality: e.target.value })}
                          placeholder="e.g. Nigerian" className={inputCls} />
                      </label>
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 2 && d.type === "Teenager" && (
                <fieldset>
                  <legend className="font-display text-3xl tracking-tight">
                    Tell us about school.
                  </legend>
                  <div className="mt-7 grid gap-5">
                    <label className="block">
                      <span className="text-sm font-semibold">School</span>
                      <input type="text" value={d.school} onChange={(e) => set({ school: e.target.value })}
                        placeholder="Name of your school" className={inputCls} />
                    </label>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-semibold">Class</span>
                        <select value={d.klass} onChange={(e) => set({ klass: e.target.value })} className={inputCls}>
                          <option value="">Select your class</option>
                          {CLASSES.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-sm font-semibold">Age</span>
                        <input type="number" min={10} max={19} value={d.age} onChange={(e) => set({ age: e.target.value })}
                          placeholder="e.g. 15" className={inputCls} />
                      </label>
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 2 && d.type === "Adult" && (
                <fieldset>
                  <legend className="font-display text-3xl tracking-tight">
                    What do you do?
                  </legend>
                  <div className="mt-7 grid gap-5">
                    <label className="block">
                      <span className="text-sm font-semibold">Occupation</span>
                      <select
                        value={d.occupation}
                        onChange={(e) => set({ occupation: e.target.value, orgName: "" })}
                        className={inputCls}
                      >
                        <option value="">Select your occupation</option>
                        {OCCUPATIONS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                    {orgField(d.occupation) && (
                      <label className="block">
                        <span className="text-sm font-semibold">{orgField(d.occupation)!.label}</span>
                        <input type="text" value={d.orgName} onChange={(e) => set({ orgName: e.target.value })}
                          placeholder={orgField(d.occupation)!.ph} className={inputCls} />
                      </label>
                    )}
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="font-display text-3xl tracking-tight">
                    Anything for the VDL team?
                  </legend>
                  <div className="mt-7 grid gap-5">
                    <label className="block">
                      <span className="text-sm font-semibold">
                        Comments <span className="font-normal text-ink/40">(optional)</span>
                      </span>
                      <textarea rows={5} value={d.comments} onChange={(e) => set({ comments: e.target.value })}
                        placeholder="Feedback, ideas, or how you'd like to be involved…"
                        className={`${inputCls} resize-y`} />
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink/10 bg-white p-4">
                      <input
                        type="checkbox"
                        checked={d.updates}
                        onChange={(e) => set({ updates: e.target.checked })}
                        className="mt-1 h-4 w-4 accent-[#14432e]"
                      />
                      <span className="text-sm leading-relaxed text-ink/70">
                        Keep me updated on VDL activities — school tours,
                        conferences, volunteer opportunities and new resources.
                      </span>
                    </label>
                  </div>
                </fieldset>
              )}
            </div>

            {error && (
              <p role="alert" className="join-error mt-6 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <div className="mt-9 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-forest hover:text-forest"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="rounded-full bg-forest px-9 py-3.5 text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:bg-forest-deep"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-full bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5"
                >
                  Plant my details
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
