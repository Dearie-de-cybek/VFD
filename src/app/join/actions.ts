"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sendAdminPush } from "@/lib/push";
import type { MemberRoleValue } from "@/lib/member-roles";

import { hash } from "bcryptjs";

const JoinSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address.").toLowerCase(),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  joinType: z.enum(["VFD", "OUTSIDE"]),
  password: z.string().min(6, "Password must be at least 6 characters."),
  type: z.enum(["Teenager", "Adult"]).optional().or(z.literal("")),
  address: z.string().trim().optional(),
  state: z.string().trim().optional(),
  nationality: z.string().trim().optional(),
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
  if (data.joinType === "OUTSIDE") return "OUTSIDE_MEMBER";
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

  // Extra validation for VFD member type
  if (d.joinType === "VFD") {
    if (!d.type) return { ok: false, error: "Please select if you are a teenager or adult." };
    if (!d.address) return { ok: false, error: "Please enter your address." };
    if (!d.state) return { ok: false, error: "Please select your state." };
    if (!d.nationality) return { ok: false, error: "Please enter your nationality." };
    if (d.type === "Teenager") {
      if (!d.school) return { ok: false, error: "Please enter your school." };
      if (!d.klass) return { ok: false, error: "Please select your class." };
      if (!d.age) return { ok: false, error: "Please enter your age." };
    } else {
      if (!d.occupation) return { ok: false, error: "Please select your occupation." };
    }
  }

  // Check unique email
  const existing = await prisma.member.findUnique({
    where: { email: d.email },
  });
  if (existing) {
    return { ok: false, error: "An account with this email address already exists. Please log in." };
  }

  const stage = d.joinType === "OUTSIDE"
    ? "Webinar Guest"
    : d.type === "Teenager"
      ? d.klass || "Teenager"
      : d.occupation || "Adult";

  const schoolName = d.joinType === "OUTSIDE"
    ? null
    : d.type === "Teenager"
      ? d.school || null
      : d.orgName || null;

  const notes = [
    `Join Type: ${d.joinType}`,
    d.type ? `Type: ${d.type}` : null,
    d.address ? `Address: ${d.address}` : null,
    d.state ? `State of origin: ${d.state}` : null,
    d.nationality ? `Nationality: ${d.nationality}` : null,
    d.type === "Teenager" && d.age ? `Age: ${d.age}` : null,
    `Wants activity updates: ${d.updates ? "Yes" : "No"}`,
    d.comments ? `\nComments:\n${d.comments}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const passwordHash = await hash(d.password, 10);

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
      passwordHash,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendEmail(
      adminEmail,
      `New sign-up — ${d.name}`,
      `${d.name} (${d.email}, ${d.phone}) just joined via the website as a ${d.joinType === "OUTSIDE" ? "webinar guest" : "full member"}.\n\n${notes}\n\nView in admin: /admin/members/${member.id}`
    );
  }

  await sendAdminPush({
    title: "New sign-up",
    body: `${d.name} joined via the website.`,
    url: `/admin/members/${member.id}`,
  });

  return { ok: true };
}
