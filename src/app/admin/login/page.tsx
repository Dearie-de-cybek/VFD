import type { Metadata } from "next";
import TreeLogo from "@/components/TreeLogo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in — VDL Admin",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAF8] px-6">
      <div className="w-full max-w-[380px] rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,.05)]">
        <div className="flex items-center gap-2.5">
          <TreeLogo className="h-8 w-7 text-[#22C55E]" idPrefix="admin-login" />
          <span className="text-[15px] font-semibold text-[#111827]">
            VDL Admin
          </span>
        </div>
        <h1 className="mt-6 text-xl font-bold text-[#111827]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Sign in to manage events, blogs and projects.
        </p>

        <div className="mt-6">
          <LoginForm next={next || "/admin"} />
        </div>
      </div>
    </div>
  );
}
