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

  const registrations = await prisma.eventRegistration.findMany({
    orderBy: { createdAt: "desc" },
    take: 15,
    include: { event: { select: { id: true, title: true } } },
  });

  return registrations.map((r) => ({
    id: r.id,
    title: r.event.title,
    body: `${r.name} registered for this event.`,
    url: `/admin/events/${r.event.id}`,
    createdAt: r.createdAt.toISOString(),
  }));
}
