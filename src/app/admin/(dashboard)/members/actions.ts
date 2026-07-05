"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { MEMBER_ROLES } from "@/lib/member-roles";

const ROLE_VALUES = MEMBER_ROLES.map((r) => r.value) as [string, ...string[]];

const MemberSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || z.string().email().safeParse(v).success, "Enter a valid email."),
  phone: z.string().trim().optional().or(z.literal("")),
  role: z.enum(ROLE_VALUES),
  stage: z.string().trim().optional().or(z.literal("")),
  schoolName: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type MemberFormState = { error?: string };

function parse(formData: FormData) {
  return MemberSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    stage: formData.get("stage"),
    schoolName: formData.get("schoolName"),
    notes: formData.get("notes"),
  });
}

function toData(parsed: z.infer<typeof MemberSchema>) {
  return {
    name: parsed.name,
    email: parsed.email || null,
    phone: parsed.phone || null,
    role: parsed.role,
    stage: parsed.stage || null,
    schoolName: parsed.schoolName || null,
    notes: parsed.notes || null,
  };
}

export async function createMember(
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const data = toData(parsed.data);
  if (!data.email && !data.phone) {
    return { error: "Enter at least an email or a phone number." };
  }

  await prisma.member.create({ data });

  revalidatePath("/admin/members");
  redirect("/admin/members");
}

export async function updateMember(
  id: string,
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const data = toData(parsed.data);
  if (!data.email && !data.phone) {
    return { error: "Enter at least an email or a phone number." };
  }

  await prisma.member.update({ where: { id }, data });

  revalidatePath("/admin/members");
  redirect("/admin/members");
}

export async function deleteMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.member.delete({ where: { id } });

  revalidatePath("/admin/members");
}
