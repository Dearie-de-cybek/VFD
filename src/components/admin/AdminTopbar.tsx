"use client";

import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Plus, Menu } from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/app/admin/logout-action";
import NotificationBell from "./NotificationBell";

const TITLES: Record<string, { title: string; quickAdd?: string }> = {
  "/admin": { title: "Dashboard" },
  "/admin/events": { title: "Events", quickAdd: "/admin/events/new" },
  "/admin/blogs": { title: "Blogs", quickAdd: "/admin/blogs/new" },
  "/admin/projects": { title: "Projects & Photos", quickAdd: "/admin/projects/new" },
  "/admin/quotes": { title: "Quotes", quickAdd: "/admin/quotes/new" },
  "/admin/products": { title: "Shop Products", quickAdd: "/admin/products/new" },
  "/admin/members": { title: "Members", quickAdd: "/admin/members/new" },
  "/admin/messages": { title: "Messages" },
  "/admin/assessments": { title: "Assessments" },
  "/admin/newsletter": { title: "Newsletter" },
  "/admin/settings": { title: "Settings" },
};

export default function AdminTopbar({
  name,
  dark,
  onToggleDark,
  onToggleSidebar,
}: {
  name: string;
  dark: boolean;
  onToggleDark: () => void;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const last = segments.at(-1) ?? "dashboard";
  const fallbackTitle = last === "new" ? "New" : /^[a-z0-9]{20,}$/.test(last) ? "Edit" : last;
  const match = TITLES[pathname] ?? { title: fallbackTitle };

  return (
    <header className="flex h-[72px] items-center justify-between gap-6 border-b border-[#E5E7EB] bg-white px-5 md:px-10 dark:border-white/10 dark:bg-[#0B0F0D]">
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-1.5 text-[#6B7280] hover:bg-[#F3F4F6] md:hidden dark:hover:bg-white/5"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="min-w-0">
          <p className="text-[10px] md:text-xs text-[#6B7280]">
            Admin{segments.length > 1 ? " / " : ""}
            {segments.slice(1).join(" / ")}
          </p>
          <h1 className="truncate text-base md:text-lg font-bold text-[#111827] dark:text-white">
            {match.title}
          </h1>
        </div>
      </div>

      <div className="hidden max-w-md flex-1 items-center gap-2 rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#6B7280] md:flex dark:border-white/10">
        <Search className="h-4 w-4" />
        <span>Search…</span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {match.quickAdd && (
          <Link
            href={match.quickAdd}
            className="flex h-10 items-center gap-1.5 rounded-[10px] bg-[#22C55E] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </Link>
        )}

        <button
          type="button"
          onClick={onToggleDark}
          aria-label="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:hover:bg-white/5"
        >
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        <NotificationBell />

        <div className="ml-1 flex items-center gap-2.5 border-l border-[#E5E7EB] pl-3 dark:border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCFCE7] text-xs font-semibold text-[#16A34A]">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="hidden sm:inline text-xs font-medium text-[#6B7280] hover:text-[#111827] dark:hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
