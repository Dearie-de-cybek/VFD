import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { AnswerEntry } from "@/app/assessment/actions";

type Meta = { level: string; klass: string | null; teacher: string | null; parent: string | null };

const TYPE_LABEL: Record<string, string> = {
  self: "Self Assessment",
  scorecard: "Character Scorecard",
};

export default async function AssessmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await prisma.assessmentSubmission.findUnique({ where: { id } });
  if (!submission) notFound();

  const answers: AnswerEntry[] = JSON.parse(submission.answers);
  const meta: Meta | null = submission.meta ? JSON.parse(submission.meta) : null;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/assessments"
        className="w-fit text-sm font-medium text-[#6B7280] hover:text-[#111827] dark:hover:text-white"
      >
        ← Back to assessments
      </Link>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
          {TYPE_LABEL[submission.type] ?? submission.type}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-[#111827] dark:text-white">
          {submission.name || "Anonymous"}
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#DCFCE7] px-3 py-1.5 text-sm font-semibold text-[#16A34A]">
            {submission.band}
          </span>
          <span className="text-sm text-[#6B7280]">
            {submission.score} / {submission.maxScore}
          </span>
          <span className="text-sm text-[#6B7280]">
            {submission.createdAt.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {submission.role && (
          <p className="mt-4 text-sm text-[#6B7280]">
            Role: <span className="text-[#111827] dark:text-white">{submission.role}</span>
          </p>
        )}

        {meta && (
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <p className="text-[#6B7280]">
              Level: <span className="text-[#111827] dark:text-white">{meta.level}</span>
            </p>
            {meta.klass && (
              <p className="text-[#6B7280]">
                Class: <span className="text-[#111827] dark:text-white">{meta.klass}</span>
              </p>
            )}
            {meta.teacher && (
              <p className="text-[#6B7280]">
                Teacher: <span className="text-[#111827] dark:text-white">{meta.teacher}</span>
              </p>
            )}
            {meta.parent && (
              <p className="text-[#6B7280]">
                Parent: <span className="text-[#111827] dark:text-white">{meta.parent}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <div className="border-b border-[#E5E7EB] px-6 py-4 dark:border-white/10">
          <h3 className="text-sm font-bold text-[#111827] dark:text-white">Full report</h3>
        </div>
        <ul className="divide-y divide-[#E5E7EB] dark:divide-white/10">
          {answers.map((a, i) => (
            <li key={i} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-semibold text-[#374151] dark:bg-white/10 dark:text-white/70">
                    {a.label}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-[#111827] dark:text-white">
                    {a.text}
                  </p>
                  {a.remark && (
                    <p className="mt-1.5 text-sm italic text-[#6B7280]">"{a.remark}"</p>
                  )}
                </div>
                <span className="shrink-0 font-mono text-sm font-semibold text-[#111827] dark:text-white">
                  {a.score}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
