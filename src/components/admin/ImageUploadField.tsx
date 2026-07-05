"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export default function ImageUploadField({
  name,
  label,
  defaultImage,
}: {
  name: string;
  label: string;
  defaultImage?: string;
}) {
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#111827] dark:text-white">{label}</label>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-[#F8FAF8] dark:border-white/10">
          {preview ? (
            <Image src={preview} alt="" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#6B7280]">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
        </div>
        <label className="flex h-10 cursor-pointer items-center rounded-[10px] border border-[#E5E7EB] px-4 text-sm font-medium text-[#374151] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5">
          Choose image
          <input
            type="file"
            name={name}
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </label>
      </div>
      <p className="text-xs text-[#6B7280]">JPG, PNG, WEBP, GIF or SVG. Max 8MB.</p>
    </div>
  );
}
