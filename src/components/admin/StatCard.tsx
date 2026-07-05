import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  delta: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,.08)] dark:border-white/10 dark:bg-[#0F1512]">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#DCFCE7]">
          <Icon className="h-[18px] w-[18px] text-[#16A34A]" />
        </span>
        {delta > 0 && (
          <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
            +{delta} this week
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-[#6B7280]">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-[#111827] dark:text-white">
        {value}
      </p>
    </div>
  );
}
