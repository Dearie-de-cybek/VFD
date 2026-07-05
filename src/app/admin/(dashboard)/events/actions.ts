"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

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
  const photos = await prisma.eventPhoto.findMany({ where: { eventId: id } });
  await prisma.event.delete({ where: { id } });
  await Promise.all(photos.map((p) => deleteUploadedImage(p.path)));

  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export type PhotoFormState = { error?: string };

export async function addEventPhotos(
  eventId: string,
  _prevState: PhotoFormState,
  formData: FormData
): Promise<PhotoFormState> {
  await requireAdmin();
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return { error: "Event not found." };

  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Choose at least one photo." };

  const count = await prisma.eventPhoto.count({ where: { eventId } });

  try {
    for (const [i, file] of files.entries()) {
      const savedPath = await saveUploadedImage(file);
      await prisma.eventPhoto.create({
        data: {
          eventId,
          path: savedPath,
          alt: event.title,
          order: count + i,
        },
      });
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }

  revalidatePath(`/admin/events/${eventId}`);
  return {};
}

export async function deleteEventPhoto(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const eventId = String(formData.get("eventId"));

  const photo = await prisma.eventPhoto.delete({ where: { id } });
  await deleteUploadedImage(photo.path);

  revalidatePath(`/admin/events/${eventId}`);
}
