"use client";

import { useActionState, useRef } from "react";
import Image from "next/image";
import { Trash2, Star, ImagePlus } from "lucide-react";

export type PhotoFormState = { error?: string };

type Photo = { id: string; path: string; alt: string };

export default function PhotoGallery({
  photos,
  addAction,
  deleteAction,
  parentIdName,
  parentId,
  coverAction,
  currentCover,
}: {
  photos: Photo[];
  addAction: (prevState: PhotoFormState, formData: FormData) => Promise<PhotoFormState>;
  deleteAction: (formData: FormData) => void;
  parentIdName: string;
  parentId: string;
  coverAction?: (formData: FormData) => void;
  currentCover?: string;
}) {
  const [state, formAction, pending] = useActionState(addAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#111827] dark:text-white">
            Photos ({photos.length})
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            {coverAction
              ? "All photos in this folder. Star one to make it the cover shown on the public site."
              : "All photos in this folder."}
          </p>
        </div>

        <form
          ref={formRef}
          action={(formData) => {
            formAction(formData);
            formRef.current?.reset();
          }}
        >
          <input type="hidden" name={parentIdName} value={parentId} />
          <label className="flex h-10 cursor-pointer items-center gap-1.5 rounded-[10px] bg-[#22C55E] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <ImagePlus className="h-4 w-4" />
            {pending ? "Uploading…" : "Add photos"}
            <input
              type="file"
              name="photos"
              multiple
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              className="hidden"
              disabled={pending}
              onChange={(e) => {
                if (e.target.files?.length) e.target.form?.requestSubmit();
              }}
            />
          </label>
        </form>
      </div>

      {state.error && (
        <p className="mt-4 rounded-[10px] bg-[#DC2626]/10 px-3.5 py-2.5 text-sm text-[#DC2626]">
          {state.error}
        </p>
      )}

      {photos.length === 0 ? (
        <p className="mt-6 rounded-[10px] border border-dashed border-[#E5E7EB] py-10 text-center text-sm text-[#6B7280] dark:border-white/10">
          No photos yet. Click &ldquo;Add photos&rdquo; to upload the first ones.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo) => {
            const isCover = coverAction && photo.path === currentCover;
            return (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-[10px] border border-[#E5E7EB] dark:border-white/10"
              >
                <Image src={photo.path} alt={photo.alt} fill className="object-cover" />

                {isCover && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#22C55E] px-2 py-1 text-[11px] font-semibold text-white">
                    <Star className="h-3 w-3 fill-current" />
                    Cover
                  </span>
                )}

                <div className="absolute inset-0 flex items-end justify-end gap-1.5 bg-black/0 p-2 opacity-0 transition-all duration-200 group-hover:bg-black/25 group-hover:opacity-100">
                  {coverAction && !isCover && (
                    <form action={coverAction}>
                      <input type="hidden" name="projectId" value={parentId} />
                      <input type="hidden" name="path" value={photo.path} />
                      <input type="hidden" name="alt" value={photo.alt} />
                      <button
                        type="submit"
                        aria-label="Set as cover"
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#6B7280] shadow-sm transition-colors hover:text-[#22C55E]"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                  <form
                    action={deleteAction}
                    onSubmit={(e) => {
                      if (!confirm("Delete this photo? This cannot be undone.")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={photo.id} />
                    <input type="hidden" name={parentIdName} value={parentId} />
                    <button
                      type="submit"
                      aria-label="Delete photo"
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#6B7280] shadow-sm transition-colors hover:text-[#DC2626]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
