"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Pencil, Trash2 } from "lucide-react";
import { MEMBER_ROLES, memberRoleLabel } from "@/lib/member-roles";

export type MemberRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  stage: string | null;
  updatedAt: string;
};

export default function MembersTable({
  rows,
  deleteAction,
}: {
  rows: MemberRow[];
  deleteAction: (formData: FormData) => void;
}) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string>("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (role !== "ALL" && r.role !== role) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.email ?? "").toLowerCase().includes(q) ||
        (r.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, query, role]);

  const tabs = [{ value: "ALL", label: "All" }, ...MEMBER_ROLES];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((t) => {
          const count = t.value === "ALL" ? rows.length : rows.filter((r) => r.role === t.value).length;
          const active = role === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setRole(t.value)}
              className={`flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : "border border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80"
              }`}
            >
              {t.label}
              <span className={active ? "text-[#16A34A]" : "text-[#6B7280]"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] px-6 py-4 dark:border-white/10">
          <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-[10px] border border-[#E5E7EB] px-3 text-sm text-[#6B7280] dark:border-white/10">
            <Search className="h-4 w-4 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone…"
              className="w-full bg-transparent text-[#111827] outline-none placeholder:text-[#6B7280] dark:text-white"
            />
          </div>
          <span className="ml-auto text-xs text-[#6B7280]">
            {filtered.length} of {rows.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm text-[#6B7280]">
            No members match this view yet.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-[#6B7280]">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Stage</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  className="h-14 border-t border-[#E5E7EB] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:hover:bg-white/5"
                >
                  <td className="px-6">
                    <Link
                      href={`/admin/members/${m.id}`}
                      className="font-medium text-[#111827] hover:underline dark:text-white"
                    >
                      {m.name}
                    </Link>
                  </td>
                  <td className="px-6 text-[#6B7280]">
                    <div className="flex flex-col">
                      {m.email && <span>{m.email}</span>}
                      {m.phone && <span>{m.phone}</span>}
                    </div>
                  </td>
                  <td className="px-6">
                    <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
                      {memberRoleLabel(m.role)}
                    </span>
                  </td>
                  <td className="px-6 text-[#6B7280]">{m.stage || "—"}</td>
                  <td className="px-6">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/members/${m.id}`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827] dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form
                        action={deleteAction}
                        onSubmit={(e) => {
                          if (!confirm(`Remove "${m.name}" from the members list?`)) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="id" value={m.id} />
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
    </div>
  );
}
