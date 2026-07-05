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
        <AdminSidebar name={name} email={email} />
        <div className="pl-[260px]">
          <AdminTopbar name={name} dark={dark} onToggleDark={toggleDark} />
          <main className="p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
