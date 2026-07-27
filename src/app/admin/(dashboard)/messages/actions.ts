"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.message.delete({ where: { id } });

  revalidatePath("/admin/messages");
}
