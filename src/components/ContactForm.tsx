"use client";

import { useState } from "react";

const SUBJECTS = [
  "Partnership enquiry",
  "Volunteering",
  "School values tour request",
  "Donation",
  "Media / press",
  "Other",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // no backend yet — open the visitor's mail client with the message prefilled
    const subject = String(data.get("subject") || "Website enquiry");
    window.location.href = `mailto:hello@valuesfordailyliving.org?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-forest-deep p-10 text-center text-cream">
        <p className="font-display text-3xl text-gold-soft">Thank you.</p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream/75">
          Your email app should have opened with your message ready to send. If
          it didn&apos;t, write to us directly at{" "}
          <a href="mailto:hello@valuesfordailyliving.org" className="text-gold-soft underline">
            hello@valuesfordailyliving.org
          </a>
          .
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-8 rounded-full border border-cream/30 px-8 py-3 text-sm font-semibold transition-colors hover:border-gold-soft hover:text-gold-soft"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
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
      {error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5"
      >
        Send message
      </button>
    </form>
  );
}
