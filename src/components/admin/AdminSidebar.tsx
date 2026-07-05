"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Newspaper,
  Images,
  Settings,
  HelpCircle,
} from "lucide-react";
import TreeLogo from "@/components/TreeLogo";

const GROUPS = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/events", label: "Events", icon: CalendarDays, exact: false },
      { href: "/admin/blogs", label: "Blogs", icon: Newspaper, exact: false },
      { href: "/admin/projects", label: "Projects & Photos", icon: Images, exact: false },
    ],
  },
];

export default function AdminSidebar({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-[#E5E7EB] bg-white dark:border-white/10 dark:bg-[#0B0F0D]">
      <div className="flex h-[72px] items-center gap-2.5 border-b border-[#E5E7EB] px-6 dark:border-white/10">
        <TreeLogo className="h-7 w-6 text-[#22C55E]" idPrefix="admin-sb" />
        <span className="text-[15px] font-semibold text-[#111827] dark:text-white">
          VDL Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {GROUPS.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              {group.label}
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex h-11 items-center gap-3 rounded-[10px] px-3 text-sm transition-colors duration-200 ${
                        active
                          ? "bg-[#DCFCE7] font-medium text-[#111827] dark:bg-[#22C55E]/15 dark:text-white"
                          : "text-[#374151] hover:bg-[#F3F4F6] dark:text-white/70 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] ${
                          active ? "text-[#22C55E]" : "text-[#6B7280]"
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#E5E7EB] p-3 dark:border-white/10">
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/admin/settings"
              className={`flex h-11 items-center gap-3 rounded-[10px] px-3 text-sm transition-colors duration-200 ${
                isActive("/admin/settings")
                  ? "bg-[#DCFCE7] font-medium text-[#111827] dark:bg-[#22C55E]/15 dark:text-white"
                  : "text-[#374151] hover:bg-[#F3F4F6] dark:text-white/70 dark:hover:bg-white/5"
              }`}
            >
              <Settings
                className={`h-[18px] w-[18px] ${
                  isActive("/admin/settings") ? "text-[#22C55E]" : "text-[#6B7280]"
                }`}
              />
              Settings
            </Link>
          </li>
          <li>
            <a
              href="mailto:eburujacintha@gmail.com"
              className="flex h-11 items-center gap-3 rounded-[10px] px-3 text-sm text-[#374151] transition-colors duration-200 hover:bg-[#F3F4F6] dark:text-white/70 dark:hover:bg-white/5"
            >
              <HelpCircle className="h-[18px] w-[18px] text-[#6B7280]" />
              Help
            </a>
          </li>
        </ul>

        <div className="mt-3 flex items-center gap-2.5 rounded-[10px] px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-xs font-semibold text-[#16A34A]">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-[#111827] dark:text-white">
              {name}
            </p>
            <p className="truncate text-xs text-[#6B7280]">{email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
