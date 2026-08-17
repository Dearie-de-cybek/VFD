"use client";

import { useEffect, useState, type ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({
  name,
  email,
  children,
}: {
  name: string;
  email: string;
  children: ReactNode;
}) {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // localStorage is unavailable during SSR, so the persisted preference can only be read post-mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(localStorage.getItem("vdl-admin-theme") === "dark");
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("vdl-admin-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#F8FAF8] dark:bg-[#050706]">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
          />
        )}

        <AdminSidebar name={name} email={email} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="pl-0 md:pl-[260px] transition-all duration-300">
          <AdminTopbar
            name={name}
            dark={dark}
            onToggleDark={toggleDark}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className="p-5 md:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
