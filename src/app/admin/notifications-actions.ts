"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  url: string;
  createdAt: string;
};

export async function getRecentNotifications(): Promise<NotificationItem[]> {
  await requireAdmin();

  const [registrations, members, messages, assessments] = await Promise.all([
    prisma.eventRegistration.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
      include: { event: { select: { id: true, title: true } } },
    }),
    prisma.member.findMany({
      where: { source: "join" },
      orderBy: { createdAt: "desc" },
      take: 15,
    }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 15 }),
    prisma.assessmentSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 15 }),
  ]);

  const items: NotificationItem[] = [
    ...registrations.map((r) => ({
      id: `reg-${r.id}`,
      title: r.event.title,
      body: `${r.name} registered for this event.`,
      url: `/admin/events/${r.event.id}`,
      createdAt: r.createdAt.toISOString(),
    })),
    ...members.map((m) => ({
      id: `mem-${m.id}`,
      title: "New sign-up",
      body: `${m.name} joined via the website.`,
      url: `/admin/members/${m.id}`,
      createdAt: m.createdAt.toISOString(),
    })),
    ...messages.map((msg) => ({
      id: `msg-${msg.id}`,
      title: msg.subject,
      body: `${msg.name}: ${msg.body.slice(0, 80)}${msg.body.length > 80 ? "…" : ""}`,
      url: `/admin/messages`,
      createdAt: msg.createdAt.toISOString(),
    })),
    ...assessments.map((a) => ({
      id: `assess-${a.id}`,
      title: a.type === "scorecard" ? "New character scorecard" : "New self-assessment",
      body: `${a.name || "Someone"} — ${a.band} (${a.score}/${a.maxScore}).`,
      url: `/admin/assessments/${a.id}`,
      createdAt: a.createdAt.toISOString(),
    })),
  ];

  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 15);
}
