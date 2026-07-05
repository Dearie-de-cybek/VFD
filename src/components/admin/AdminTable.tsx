"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Pencil, Trash2 } from "lucide-react";

export type AdminRow = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  published: boolean;
  updatedAt: string;
};

export default function AdminTable({
  rows,
  editHrefBase,
  deleteAction,
  emptyLabel,
}: {
  rows: AdminRow[];
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
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
      <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-6 py-4 dark:border-white/10">
        <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-[10px] border border-[#E5E7EB] px-3 text-sm text-[#6B7280] dark:border-white/10">
          <Search className="h-4 w-4 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-[#111827] outline-none placeholder:text-[#6B7280] dark:text-white"
          />
        </div>
        <span className="ml-auto text-xs text-[#6B7280]">
          {filtered.length} of {rows.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="px-6 py-14 text-center text-sm text-[#6B7280]">{emptyLabel}</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white dark:bg-[#0F1512]">
            <tr className="text-xs uppercase tracking-wider text-[#6B7280]">
              <th className="px-6 py-3 font-medium">Item</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Updated</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="h-14 border-t border-[#E5E7EB] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:hover:bg-white/5"
              >
                <td className="px-6">
                  <div className="flex items-center gap-3">
                    {row.image && (
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
                        <Image src={row.image} alt="" fill className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#111827] dark:text-white">
                        {row.title}
                      </p>
                      <p className="truncate text-xs text-[#6B7280]">{row.subtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      row.published
                        ? "bg-[#DCFCE7] text-[#16A34A]"
                        : "bg-[#F3F4F6] text-[#6B7280]"
                    }`}
                  >
                    {row.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 text-[#6B7280]">{row.updatedAt}</td>
                <td className="px-6">
                  <div className="flex items-center justify-end gap-1">
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
                        if (!confirm(`Delete "${row.title}"? This cannot be undone.`)) {
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
