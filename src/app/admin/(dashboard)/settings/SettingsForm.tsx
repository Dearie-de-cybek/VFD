"use client";

import { useActionState } from "react";
import { inputClass, labelClass } from "@/components/admin/form-styles";
import { changePassword, type PasswordFormState } from "./actions";

const initialState: PasswordFormState = {};

export default function SettingsForm() {
  const [state, formAction, pending] = useActionState(changePassword, initialState);

  return (
    <form
      action={formAction}
      key={state.success ? "reset" : "form"}
      className="flex max-w-md flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="currentPassword" className={labelClass}>
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="newPassword" className={labelClass}>
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>

      {state.error && (
        <p className="rounded-[10px] bg-[#DC2626]/10 px-3.5 py-2.5 text-sm text-[#DC2626]">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-[10px] bg-[#DCFCE7] px-3.5 py-2.5 text-sm text-[#16A34A]">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-10 w-fit rounded-[10px] bg-[#22C55E] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
