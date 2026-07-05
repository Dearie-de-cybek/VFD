import { getSession } from "@/lib/session";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <h2 className="text-base font-bold text-[#111827] dark:text-white">Account</h2>
        <p className="mt-1 text-sm text-[#6B7280]">
          Signed in as <span className="font-medium text-[#111827] dark:text-white">{session?.name}</span>{" "}
          ({session?.email})
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <h2 className="text-base font-bold text-[#111827] dark:text-white">Change password</h2>
        <p className="mt-1 text-sm text-[#6B7280]">
          Choose a strong password you haven&apos;t used elsewhere.
        </p>
        <div className="mt-6">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
