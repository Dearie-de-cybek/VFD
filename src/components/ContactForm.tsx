"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const SUBJECTS = [
  "Partnership enquiry",
  "Volunteering",
  "School values tour request",
  "Donation",
  "Media / press",
  "Other",
];

const initialState: ContactState = {};

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="rounded-2xl bg-forest-deep p-10 text-center text-cream">
        <p className="font-display text-3xl text-gold-soft">Thank you.</p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream/75">
          Your message has been sent to the VDL team — we usually respond
          within two working days.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">Name</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold">Subject</span>
        <select
          name="subject"
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 outline-none transition-colors focus:border-forest"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us how we can work together…"
          className="mt-2 w-full resize-y rounded-lg border border-ink/15 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
