"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sendAdminPush } from "@/lib/push";

export type AnswerEntry = { label: string; text: string; score: number; remark?: string };

async function notifyAdmin(title: string, body: string, url: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(adminEmail, title, body);
  }
  await sendAdminPush({ title, body, url });
}

export async function submitSelfAssessment(data: {
  name: string;
  role: string;
  total: number;
  maxScore: number;
  band: string;
  answers: AnswerEntry[];
}) {
  const submission = await prisma.assessmentSubmission.create({
    data: {
      type: "self",
      name: data.name || null,
      role: data.role || null,
      score: data.total,
      maxScore: data.maxScore,
      band: data.band,
      answers: JSON.stringify(data.answers),
    },
  });

  await notifyAdmin(
    "New self-assessment submitted",
    `${data.name || "Someone"}${data.role ? ` (${data.role})` : ""} completed the self-assessment — ${data.band} (${data.total}/${data.maxScore}).`,
    `/admin/assessments/${submission.id}`
  );
}

export async function submitScorecard(data: {
  child: string;
  level: string;
  klass?: string;
  teacher?: string;
  parent?: string;
  average: number;
  band: string;
  answers: AnswerEntry[];
}) {
  const submission = await prisma.assessmentSubmission.create({
    data: {
      type: "scorecard",
      name: data.child,
      role: null,
      meta: JSON.stringify({
        level: data.level,
        klass: data.klass || null,
        teacher: data.teacher || null,
        parent: data.parent || null,
      }),
      score: data.average,
      maxScore: 100,
      band: data.band,
      answers: JSON.stringify(data.answers),
    },
  });

  await notifyAdmin(
    "New character scorecard submitted",
    `A scorecard for ${data.child} (${data.level}) was completed — ${data.band} (${data.average}/100).`,
    `/admin/assessments/${submission.id}`
  );
}
