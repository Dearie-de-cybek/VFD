"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Pencil, Trash2, Folder } from "lucide-react";

export type FolderRow = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  photoCount: number;
  published: boolean;
  updatedAt: string;
};

export default function FolderGrid({
  rows,
  editHrefBase,
  deleteAction,
  emptyLabel,
}: {
  rows: FolderRow[];
  editHrefBase: string;
  deleteAction: (formData: FormData) => void;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)
    );
  }, [rows, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-[10px] border border-[#E5E7EB] px-3 text-sm text-[#6B7280] dark:border-white/10">
        <Search className="h-4 w-4 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search folders…"
          className="w-full bg-transparent text-[#111827] outline-none placeholder:text-[#6B7280] dark:text-white"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white py-14 text-center text-sm text-[#6B7280] dark:border-white/10 dark:bg-[#0F1512]">
          {emptyLabel}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((row) => (
            <div
              key={row.id}
              className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,.08)] dark:border-white/10 dark:bg-[#0F1512]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] bg-[#DCFCE7]">
                  {row.image ? (
                    <Image src={row.image} alt="" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Folder className="h-5 w-5 text-[#16A34A]" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link
                    href={`${editHrefBase}/${row.id}`}
                    aria-label="Edit"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827] dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <form
                    action={deleteAction}
                    onSubmit={(e) => {
                      if (!confirm(`Delete "${row.title}" and all its photos? This cannot be undone.`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      aria-label="Delete"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:bg-[#DC2626]/10 hover:text-[#DC2626]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>

              <Link href={`${editHrefBase}/${row.id}`} className="mt-4 block">
                <p className="truncate font-semibold text-[#111827] dark:text-white">
                  {row.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-[#6B7280]">{row.subtitle}</p>
              </Link>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">
                  {row.photoCount} {row.photoCount === 1 ? "photo" : "photos"}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 font-semibold ${
                    row.published
                      ? "bg-[#DCFCE7] text-[#16A34A]"
                      : "bg-[#F3F4F6] text-[#6B7280]"
                  }`}
                >
                  {row.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
