"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";
import { sendEmail } from "@/lib/email";

const EventSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  category: z.enum(["Conference", "Debate", "Gathering", "Workshop"]),
  date: z.string().trim().min(1, "Date is required."),
  location: z.string().trim().min(1, "Location is required."),
  desc: z.string().trim().min(1, "Description is required."),
  alt: z.string().trim().optional(),
  published: z.boolean(),
  featured: z.boolean(),
});

export type EventFormState = { error?: string };

function parse(formData: FormData) {
  return EventSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    date: formData.get("date"),
    location: formData.get("location"),
    desc: formData.get("desc"),
    alt: formData.get("alt") || undefined,
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  });
}

const MAX_FEATURED = 2;

async function parseWithImage(formData: FormData, existingImg?: string | null) {
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message } as const;

  const file = formData.get("image");
  let img = existingImg ?? null;
  if (file instanceof File && file.size > 0) {
    try {
      img = await saveUploadedImage(file);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." } as const;
    }
  }

  return { data: { ...parsed.data, img, alt: parsed.data.alt || null } } as const;
}

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await requireAdmin();
  const result = await parseWithImage(formData);
  if ("error" in result) return { error: result.error };

  if (result.data.featured) {
    const count = await prisma.event.count({ where: { featured: true } });
    if (count >= MAX_FEATURED) {
      return { error: `Only ${MAX_FEATURED} events can be featured on the homepage. Un-feature one first.` };
    }
  }

  await prisma.event.create({ data: result.data });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await requireAdmin();
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return { error: "Event not found." };

  const result = await parseWithImage(formData, event.img);
  if ("error" in result) return { error: result.error };

  if (result.data.featured) {
    const count = await prisma.event.count({ where: { featured: true, NOT: { id } } });
    if (count >= MAX_FEATURED) {
      return { error: `Only ${MAX_FEATURED} events can be featured on the homepage. Un-feature one first.` };
    }
  }

  await prisma.event.update({ where: { id }, data: result.data });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/");
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
  revalidatePath(`/events/${id}`);
  revalidatePath("/");
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
  revalidatePath(`/events/${eventId}`);
  return {};
}

export async function deleteEventPhoto(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const eventId = String(formData.get("eventId"));

  const photo = await prisma.eventPhoto.delete({ where: { id } });
  await deleteUploadedImage(photo.path);

  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath(`/events/${eventId}`);
}

const EventUpdateSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required."),
  body: z.string().trim().min(1, "Message is required."),
});

export type EventUpdateState = { error?: string; success?: string };

export async function sendEventUpdate(
  eventId: string,
  _prevState: EventUpdateState,
  formData: FormData
): Promise<EventUpdateState> {
  await requireAdmin();
  const parsed = EventUpdateSchema.safeParse({
    subject: formData.get("subject"),
    body: formData.get("body"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return { error: "Event not found." };

  const registrations = await prisma.eventRegistration.findMany({ where: { eventId } });
  if (registrations.length === 0) return { error: "No registrants to email yet." };

  const results = await Promise.all(
    registrations.map((r) => sendEmail(r.email, parsed.data.subject, parsed.data.body))
  );
  const sentCount = results.filter((r) => r.ok).length;
  const failedCount = results.length - sentCount;

  await prisma.campaign.create({
    data: {
      channel: "EMAIL",
      audience: `Event: ${event.title}`,
      subject: parsed.data.subject,
      body: parsed.data.body,
      sentCount,
      failedCount,
      status: sentCount > 0 ? "SENT" : "FAILED",
      sentAt: new Date(),
    },
  });

  if (sentCount === 0) {
    const firstError = results.find((r) => !r.ok);
    return { error: firstError && !firstError.ok ? firstError.error : "Send failed." };
  }
  return {
    success: `Sent to ${sentCount} of ${registrations.length} registrant${registrations.length === 1 ? "" : "s"}${
      failedCount > 0 ? ` (${failedCount} failed)` : ""
    }.`,
  };
}
