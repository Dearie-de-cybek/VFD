"use client";

import { useActionState } from "react";
import { registerForEvent, type RegisterState } from "@/app/events/[id]/actions";

const initialState: RegisterState = {};

export default function EventRegisterForm({ eventId }: { eventId: string }) {
  const action = registerForEvent.bind(null, eventId);
  const [state, formAction, pending] = useActionState(action, initialState);

  if (state.success) {
    return (
      <div id="register" data-reveal className="rounded-2xl bg-forest-deep p-8 text-cream lg:p-10">
        <p className="font-display text-2xl text-gold-soft">You&apos;re registered.</p>
        <p className="mt-3 max-w-md leading-relaxed text-cream/75">
          We&apos;ve noted your interest in this event — updates and reminders
          will be sent to your email as the date approaches.
        </p>
      </div>
    );
  }

  return (
    <form
      id="register"
      action={formAction}
      data-reveal
      className="rounded-2xl border border-ink/10 bg-white p-7 lg:p-9"
    >
      <h2 className="font-display text-2xl tracking-tight">Register your interest</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">
        Leave your details and we&apos;ll email you updates and reminders about
        this event.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">Name</span>
          <input
            name="name"
            required
            placeholder="Your full name"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold">
          Phone <span className="font-normal text-ink/40">(optional)</span>
        </span>
        <input
          name="phone"
          type="tel"
          placeholder="+234…"
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-colors placeholder:text-ink/30 focus:border-forest"
        />
      </label>

      {state.error && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 rounded-full bg-gold px-9 py-4 text-sm font-bold uppercase tracking-wider text-forest-deep transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Registering…" : "Register for this event"}
      </button>
    </form>
  );
}
