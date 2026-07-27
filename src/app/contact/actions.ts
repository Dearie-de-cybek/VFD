"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sendAdminPush } from "@/lib/push";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please fill in your name, email and message."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1, "Please fill in your name, email and message."),
});

export type ContactState = { error?: string; success?: boolean };

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const d = parsed.data;

  await prisma.message.create({
    data: { name: d.name, email: d.email, subject: d.subject, body: d.message },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(
      adminEmail,
      `New message — ${d.subject}`,
      `${d.name} (${d.email}) sent:\n\n${d.message}\n\nView in admin: /admin/messages`
    );
  }

  await sendAdminPush({
    title: `New message — ${d.subject}`,
    body: `${d.name}: ${d.message.slice(0, 80)}`,
    url: `/admin/messages`,
  });

  return { success: true };
}
