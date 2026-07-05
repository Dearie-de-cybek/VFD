"use client";

import { useActionState } from "react";
import Link from "next/link";
import { inputClass, textareaClass, labelClass } from "./form-styles";
import { MEMBER_ROLES } from "@/lib/member-roles";
import type { MemberFormState } from "@/app/admin/(dashboard)/members/actions";

const initialState: MemberFormState = {};

export default function MemberForm({
  action,
  defaultValues,
}: {
  action: (prevState: MemberFormState, formData: FormData) => Promise<MemberFormState>;
  defaultValues?: {
    name: string;
    email: string | null;
    phone: string | null;
    role: string;
    stage: string | null;
    schoolName: string | null;
    notes: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="Chidinma Okafor"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={defaultValues?.email ?? ""}
            placeholder="chidinma@example.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            defaultValue={defaultValues?.phone ?? ""}
            placeholder="+234 803 000 0000"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className={labelClass}>
            Role
          </label>
          <select
            id="role"
            name="role"
            defaultValue={defaultValues?.role ?? MEMBER_ROLES[0].value}
            className={inputClass}
          >
            {MEMBER_ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="stage" className={labelClass}>
            Stage / phase
          </label>
          <input
            id="stage"
            name="stage"
            defaultValue={defaultValues?.stage ?? ""}
            placeholder="e.g. Phase 1, Graduated"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="schoolName" className={labelClass}>
          School / organisation
        </label>
        <input
          id="schoolName"
          name="schoolName"
          defaultValue={defaultValues?.schoolName ?? ""}
          placeholder="Optional"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
          className={textareaClass}
        />
      </div>

      {state.error && (
        <p className="rounded-[10px] bg-[#DC2626]/10 px-3.5 py-2.5 text-sm text-[#DC2626]">
          {state.error}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-10 rounded-[10px] bg-[#22C55E] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save member"}
        </button>
        <Link
          href="/admin/members"
          className="h-10 rounded-[10px] border border-[#E5E7EB] px-5 text-sm font-medium leading-10 text-[#374151] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
