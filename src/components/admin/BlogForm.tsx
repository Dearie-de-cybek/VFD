"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { inputClass, textareaClass, labelClass } from "./form-styles";
import ImageUploadField from "./ImageUploadField";
import type { PostFormState } from "@/app/admin/(dashboard)/blogs/actions";

const initialState: PostFormState = {};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({
  action,
  defaultValues,
}: {
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
  defaultValues?: {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    body: string;
    img: string;
    alt: string;
    published: boolean;
  };
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.slug));

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
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="Why Character Is the First Curriculum"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="slug" className={labelClass}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          placeholder="why-character-is-the-first-curriculum"
          className={`${inputClass} font-mono text-[13px]`}
        />
        <p className="text-xs text-[#6B7280]">Shown in the URL: /blogs/{slug || "…"}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <input
          id="category"
          name="category"
          required
          defaultValue={defaultValues?.category}
          placeholder="Values Education"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className={labelClass}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={defaultValues?.excerpt}
          className={textareaClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="body" className={labelClass}>
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={10}
          defaultValue={defaultValues?.body}
          placeholder={"First paragraph...\n\nSecond paragraph...\n\nThird paragraph..."}
          className={textareaClass}
        />
        <p className="text-xs text-[#6B7280]">Separate paragraphs with a blank line.</p>
      </div>

      <ImageUploadField name="image" label="Cover image" defaultImage={defaultValues?.img} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="alt" className={labelClass}>
          Image alt text
        </label>
        <input
          id="alt"
          name="alt"
          required
          defaultValue={defaultValues?.alt}
          placeholder="A child studying at a desk"
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
          {pending ? "Saving…" : "Save post"}
        </button>
        <Link
          href="/admin/blogs"
          className="h-10 rounded-[10px] border border-[#E5E7EB] px-5 text-sm font-medium leading-10 text-[#374151] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
