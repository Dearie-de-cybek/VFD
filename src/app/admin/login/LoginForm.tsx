"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-[#111827]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoFocus
          placeholder="you@example.com"
          className="h-11 rounded-[10px] border border-[#E5E7EB] px-3.5 text-sm text-[#111827] outline-none transition-shadow focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/15"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-[#111827]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="h-11 rounded-[10px] border border-[#E5E7EB] px-3.5 text-sm text-[#111827] outline-none transition-shadow focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/15"
        />
      </div>

      {state.error && (
        <p className="rounded-[10px] bg-[#DC2626]/10 px-3.5 py-2.5 text-sm text-[#DC2626]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-10 rounded-[10px] bg-[#22C55E] text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
