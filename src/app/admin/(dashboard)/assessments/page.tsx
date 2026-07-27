import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  self: "Self Assessment",
  scorecard: "Character Scorecard",
};

export default async function AdminAssessmentsPage() {
  const submissions = await prisma.assessmentSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
      {submissions.length === 0 ? (
        <p className="px-6 py-14 text-center text-sm text-[#6B7280]">
          No assessments submitted yet.
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-[#6B7280]">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Result</th>
              <th className="px-6 py-3 font-medium">Score</th>
              <th className="px-6 py-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="h-14 border-t border-[#E5E7EB] dark:border-white/10">
                <td className="px-6">
                  <Link
                    href={`/admin/assessments/${s.id}`}
                    className="font-semibold text-[#111827] hover:underline dark:text-white"
                  >
                    {s.name || "Anonymous"}
                  </Link>
                </td>
                <td className="px-6 text-[#6B7280]">{TYPE_LABEL[s.type] ?? s.type}</td>
                <td className="px-6">
                  <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
                    {s.band}
                  </span>
                </td>
                <td className="px-6 text-[#6B7280]">
                  {s.score} / {s.maxScore}
                </td>
                <td className="px-6 text-[#6B7280]">
                  {s.createdAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
