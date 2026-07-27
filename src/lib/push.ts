import "server-only";
import webpush from "web-push";
import { prisma } from "./prisma";

type PushPayload = { title: string; body: string; url?: string };

function configure(): typeof webpush | null {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) return null;

  webpush.setVapidDetails(subject, publicKey, privateKey);
  return webpush;
}

/** Pushes a notification to every subscribed admin device. Silently no-ops if VAPID isn't configured. */
export async function sendAdminPush(payload: PushPayload): Promise<void> {
  const wp = configure();
  if (!wp) return;

  const subscriptions = await prisma.pushSubscription.findMany();

  await Promise.all(
    subscriptions.map(async (s) => {
      try {
        await wp.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify(payload)
        );
      } catch (e) {
        const statusCode = (e as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { id: s.id } }).catch(() => {});
        }
      }
    })
  );
}
