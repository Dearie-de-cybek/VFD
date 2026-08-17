"use client";

import { useActionState } from "react";
import Link from "next/link";
import { inputClass, textareaClass, labelClass } from "./form-styles";
import ImageUploadField from "./ImageUploadField";
import type { ProductFormState } from "@/app/admin/(dashboard)/products/actions";

const initialState: ProductFormState = {};

export default function ProductForm({
  action,
  defaultValues,
}: {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  defaultValues?: {
    title: string;
    price: number;
    desc: string;
    img: string | null;
    link: string | null;
    published: boolean;
    featured: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={labelClass}>
          Product Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          placeholder="e.g. Values for Daily Living (Paperback Book)"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className={labelClass}>
            Price (₦)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues?.price}
            placeholder="e.g. 5000"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="link" className={labelClass}>
            Checkout Link (WhatsApp/Paystack)
          </label>
          <input
            id="link"
            name="link"
            defaultValue={defaultValues?.link ?? ""}
            placeholder="e.g. https://wa.me/2347030385985"
            className={inputClass}
          />
        </div>
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
          placeholder="Describe the product, book chapters, or merch details..."
          className={textareaClass}
        />
      </div>

      <ImageUploadField name="image" label="Product Image" defaultImage={defaultValues?.img ?? undefined} />

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2.5 text-sm text-[#374151] dark:text-white/80">
          <input
            type="checkbox"
            name="published"
            defaultChecked={defaultValues?.published ?? true}
            className="h-4 w-4 rounded border-[#E5E7EB] text-[#22C55E] focus:ring-[#22C55E]"
          />
          Published (visible on the public storefront)
        </label>

        <label className="flex items-center gap-2.5 text-sm text-[#374151] dark:text-white/80">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaultValues?.featured ?? false}
            className="h-4 w-4 rounded border-[#E5E7EB] text-[#22C55E] focus:ring-[#22C55E]"
          />
          Featured Product (highlighted on store page)
        </label>
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
          {pending ? "Saving…" : "Save product"}
        </button>
        <Link
          href="/admin/products"
          className="h-10 rounded-[10px] border border-[#E5E7EB] px-5 text-sm font-medium leading-10 text-[#374151] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
