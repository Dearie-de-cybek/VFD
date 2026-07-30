"use client";

import { useActionState } from "react";
import Link from "next/link";
import { inputClass, textareaClass, labelClass } from "./form-styles";
import ImageUploadField from "./ImageUploadField";
import type { QuoteFormState } from "@/app/admin/(dashboard)/quotes/actions";

const initialState: QuoteFormState = {};

export default function QuoteForm({
  action,
  defaultValues,
}: {
  action: (prevState: QuoteFormState, formData: FormData) => Promise<QuoteFormState>;
  defaultValues?: {
    text: string;
    author: string;
    role?: string | null;
    img?: string | null;
    alt?: string | null;
    order: number;
    published: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="text" className={labelClass}>
          Quote text
        </label>
        <textarea
          id="text"
          name="text"
          required
          rows={4}
          defaultValue={defaultValues?.text}
          placeholder="A nation can rise no higher than the values of its people…"
          className={textareaClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className={labelClass}>
            Author
          </label>
          <input
            id="author"
            name="author"
            required
            defaultValue={defaultValues?.author}
            placeholder="The Values for Daily Living movement"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className={labelClass}>
            Role / title <span className="text-xs font-normal text-[#6B7280]">(optional)</span>
          </label>
          <input
            id="role"
            name="role"
            defaultValue={defaultValues?.role ?? undefined}
            placeholder="Founder, VDL"
            className={inputClass}
          />
        </div>
      </div>

      <ImageUploadField name="image" label="Photo (optional)" defaultImage={defaultValues?.img ?? undefined} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="alt" className={labelClass}>
          Image alt text <span className="text-xs font-normal text-[#6B7280]">(only needed if a photo is set)</span>
        </label>
        <input
          id="alt"
          name="alt"
          defaultValue={defaultValues?.alt ?? undefined}
          placeholder="Children writing at their desks"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="order" className={labelClass}>
          Display order
        </label>
        <input
          id="order"
          name="order"
          type="number"
          min={0}
          defaultValue={defaultValues?.order ?? 0}
          className={inputClass}
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
          {pending ? "Saving…" : "Save quote"}
        </button>
        <Link
          href="/admin/quotes"
          className="h-10 rounded-[10px] border border-[#E5E7EB] px-5 text-sm font-medium leading-10 text-[#374151] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
