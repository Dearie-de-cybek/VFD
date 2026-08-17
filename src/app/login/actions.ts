"use server";

import { z } from "zod";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createMemberSession, destroyMemberSession } from "@/lib/member-session";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const next = String(formData.get("next") || "/dashboard");

  const parsed = LoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const member = await prisma.member.findUnique({
    where: { email: parsed.data.email },
  });

  if (!member) {
    return { error: "Invalid email or password." };
  }

  if (!member.passwordHash) {
    return { error: "This account has not set a password. Please register on the join page." };
  }

  const valid = await compare(parsed.data.password, member.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createMemberSession({
    memberId: member.id,
    email: member.email || "",
    name: member.name,
    role: member.role,
  });

  redirect(next);
}

export async function logoutAction() {
  await destroyMemberSession();
  redirect("/login");
}
