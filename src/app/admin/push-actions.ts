"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

type SubscriptionInput = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export async function saveSubscription(sub: SubscriptionInput) {
  const { adminId } = await requireAdmin();
  await prisma.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    create: { adminId, endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    update: { adminId, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
  });
}

export async function removeSubscription(endpoint: string) {
  await requireAdmin();
  await prisma.pushSubscription.deleteMany({ where: { endpoint } });
}
