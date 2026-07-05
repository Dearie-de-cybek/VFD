"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const EventSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  category: z.enum(["Conference", "Debate", "Gathering", "Workshop"]),
  date: z.string().trim().min(1, "Date is required."),
  location: z.string().trim().min(1, "Location is required."),
  desc: z.string().trim().min(1, "Description is required."),
  published: z.boolean(),
});

export type EventFormState = { error?: string };

function parse(formData: FormData) {
  return EventSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    date: formData.get("date"),
    location: formData.get("location"),
    desc: formData.get("desc"),
    published: formData.get("published") === "on",
  });
}

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.event.create({ data: parsed.data });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.event.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.event.delete({ where: { id } });

  revalidatePath("/admin/events");
  revalidatePath("/events");
}
