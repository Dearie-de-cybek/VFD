"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "./actions";
import { IconMail, IconLock, IconEye, IconEyeOff, IconAlert } from "@/components/icons";

const initialState: LoginState = {};

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <div className="relative">
          <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/35" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoFocus
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-ink/15 bg-white pl-11 pr-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <div className="relative">
          <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/35" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className="h-12 w-full rounded-xl border border-ink/15 bg-white pl-11 pr-11 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-ink/40 transition-colors hover:text-ink/70"
          >
            {showPassword ? (
              <IconEyeOff className="h-4.5 w-4.5" />
            ) : (
              <IconEye className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>

      {state.error && (
        <p className="flex items-start gap-2.5 rounded-xl border-l-2 border-[#DC2626] bg-[#DC2626]/8 px-3.5 py-2.5 text-sm text-[#B91C1C]">
          <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-12 items-center justify-center gap-2.5 rounded-xl bg-forest-deep text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:opacity-60"
      >
        {pending && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
        )}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
