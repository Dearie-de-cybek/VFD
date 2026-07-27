"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sendAdminPush } from "@/lib/push";
import type { MemberRoleValue } from "@/lib/member-roles";

const JoinSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  type: z.enum(["Teenager", "Adult"]),
  address: z.string().trim().min(1, "Please enter your address."),
  state: z.string().trim().min(1, "Please select your state of origin."),
  nationality: z.string().trim().min(1, "Please enter your nationality."),
  school: z.string().trim().optional(),
  klass: z.string().trim().optional(),
  age: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  orgName: z.string().trim().optional(),
  comments: z.string().trim().optional(),
  updates: z.boolean(),
});

export type JoinData = z.infer<typeof JoinSchema>;
export type JoinState = { ok: true } | { ok: false; error: string };

function roleFor(data: JoinData): MemberRoleValue {
  if (data.type === "Teenager") return "AMBASSADOR";
  if (data.occupation === "School Owner") return "SCHOOL_OWNER";
  if (data.occupation === "Teacher") return "TEACHER";
  if (data.occupation === "Parent / Guardian") return "PARENT";
  return "AMBASSADOR";
}

export async function submitJoin(data: JoinData): Promise<JoinState> {
  const parsed = JoinSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const d = parsed.data;

  const stage = d.type === "Teenager" ? d.klass || "Teenager" : d.occupation || "Adult";
  const schoolName = d.type === "Teenager" ? d.school || null : d.orgName || null;
  const notes = [
    `Type: ${d.type}`,
    `Address: ${d.address}`,
    `State of origin: ${d.state}`,
    `Nationality: ${d.nationality}`,
    d.type === "Teenager" && d.age ? `Age: ${d.age}` : null,
    `Wants activity updates: ${d.updates ? "Yes" : "No"}`,
    d.comments ? `\nComments:\n${d.comments}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const member = await prisma.member.create({
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone,
      role: roleFor(d),
      stage,
      schoolName,
      notes,
      source: "join",
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(
      adminEmail,
      `New sign-up — ${d.name}`,
      `${d.name} (${d.email}, ${d.phone}) just joined via the website as a${d.type === "Adult" ? "n" : ""} ${d.type.toLowerCase()}.\n\n${notes}\n\nView in admin: /admin/members/${member.id}`
    );
  }

  await sendAdminPush({
    title: "New sign-up",
    body: `${d.name} joined via the website.`,
    url: `/admin/members/${member.id}`,
  });

  return { ok: true };
}
