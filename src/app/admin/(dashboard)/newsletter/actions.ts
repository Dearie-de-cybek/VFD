"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { sendEmail } from "@/lib/email";
import { sendSms } from "@/lib/sms";
import { MEMBER_ROLES } from "@/lib/member-roles";

const ROLE_VALUES = MEMBER_ROLES.map((r) => r.value) as [string, ...string[]];

const CampaignSchema = z.object({
  channel: z.enum(["EMAIL", "SMS"]),
  audience: z.enum([...ROLE_VALUES, "ALL"]),
  subject: z.string().trim().optional().or(z.literal("")),
  body: z.string().trim().min(1, "Message body is required."),
});

export type CampaignFormState = { error?: string; success?: string };

export async function sendCampaign(
  _prevState: CampaignFormState,
  formData: FormData
): Promise<CampaignFormState> {
  await requireAdmin();

  const parsed = CampaignSchema.safeParse({
    channel: formData.get("channel"),
    audience: formData.get("audience"),
    subject: formData.get("subject"),
    body: formData.get("body"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { channel, audience, subject, body } = parsed.data;

  if (channel === "EMAIL" && !subject) {
    return { error: "Subject is required for email." };
  }

  const members = await prisma.member.findMany({
    where: audience === "ALL" ? {} : { role: audience },
  });

  const recipients =
    channel === "EMAIL"
      ? members.filter((m) => m.email).map((m) => m.email!)
      : members.filter((m) => m.phone).map((m) => m.phone!);

  if (recipients.length === 0) {
    return {
      error: `No members in this audience have a${channel === "EMAIL" ? "n email" : " phone number"} on file.`,
    };
  }

  const results = await Promise.all(
    recipients.map((to) => (channel === "EMAIL" ? sendEmail(to, subject!, body) : sendSms(to, body)))
  );

  const sentCount = results.filter((r) => r.ok).length;
  const failedCount = results.length - sentCount;
  const firstError = results.find((r) => !r.ok);

  await prisma.campaign.create({
    data: {
      channel,
      audience: audience === "ALL" ? null : audience,
      subject: channel === "EMAIL" ? subject : null,
      body,
      sentCount,
      failedCount,
      status: sentCount > 0 ? "SENT" : "FAILED",
      sentAt: new Date(),
    },
  });

  revalidatePath("/admin/newsletter");

  if (sentCount === 0) {
    return { error: firstError && !firstError.ok ? firstError.error : "Send failed." };
  }
  if (failedCount > 0) {
    return { success: `Sent to ${sentCount} of ${recipients.length} recipients (${failedCount} failed).` };
  }
  return { success: `Sent to all ${sentCount} recipients.` };
}
