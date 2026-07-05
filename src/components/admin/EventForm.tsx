"use client";

import { useActionState } from "react";
import Link from "next/link";
import { inputClass, textareaClass, labelClass } from "./form-styles";
import type { EventFormState } from "@/app/admin/(dashboard)/events/actions";

const CATEGORIES = ["Conference", "Debate", "Gathering", "Workshop"] as const;

const initialState: EventFormState = {};

export default function EventForm({
  action,
  defaultValues,
}: {
  action: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>;
  defaultValues?: {
    title: string;
    category: string;
    date: string;
    location: string;
    desc: string;
    published: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          placeholder="The Annual Values for Daily Living Conference"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={defaultValues?.category ?? CATEGORIES[0]}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            name="date"
            required
            defaultValue={defaultValues?.date}
            placeholder="18–19 September 2026"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <input
          id="location"
          name="location"
          required
          defaultValue={defaultValues?.location}
          placeholder="Enugu, Nigeria"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="desc" className={labelClass}>
          Description
        </label>
        <textarea
          id="desc"
          name="desc"
          required
          rows={4}
          defaultValue={defaultValues?.desc}
          className={textareaClass}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-[#374151] dark:text-white/80">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="h-4 w-4 rounded border-[#E5E7EB] text-[#22C55E] focus:ring-[#22C55E]"
        />
        Published (visible on the public site)
      </label>

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
          {pending ? "Saving…" : "Save event"}
        </button>
        <Link
          href="/admin/events"
          className="h-10 rounded-[10px] border border-[#E5E7EB] px-5 text-sm font-medium leading-10 text-[#374151] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
