"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sendAdminPush } from "@/lib/push";

const RegistrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional(),
});

export type RegisterState = { error?: string; success?: boolean };

export async function registerForEvent(
  eventId: string,
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = RegistrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || !event.published) return { error: "This event is no longer available." };

  await prisma.eventRegistration.create({
    data: {
      eventId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(
      adminEmail,
      `New registration — ${event.title}`,
      `${parsed.data.name} (${parsed.data.email}${parsed.data.phone ? `, ${parsed.data.phone}` : ""}) just registered for "${event.title}" (${event.date}, ${event.location}).\n\nView all registrations at /admin/events/${event.id}`
    );
  }

  await sendAdminPush({
    title: `New registration — ${event.title}`,
    body: `${parsed.data.name} just registered for this event.`,
    url: `/admin/events/${event.id}`,
  });

  revalidatePath(`/admin/events/${eventId}`);
  return { success: true };
}
