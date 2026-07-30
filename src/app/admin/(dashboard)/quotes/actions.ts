"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

const QuoteSchema = z.object({
  text: z.string().trim().min(2, "Quote text is required."),
  author: z.string().trim().min(1, "Author is required."),
  role: z.string().trim().optional(),
  alt: z.string().trim().optional(),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

export type QuoteFormState = { error?: string };

function parse(formData: FormData) {
  return QuoteSchema.safeParse({
    text: formData.get("text"),
    author: formData.get("author"),
    role: formData.get("role") || undefined,
    alt: formData.get("alt") || undefined,
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

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

  return {
    data: {
      ...parsed.data,
      role: parsed.data.role || null,
      alt: parsed.data.alt || null,
      img,
    },
  } as const;
}

export async function createQuote(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  await requireAdmin();
  const result = await parseWithImage(formData);
  if ("error" in result) return { error: result.error };

  await prisma.quote.create({ data: result.data });

  revalidatePath("/admin/quotes");
  revalidatePath("/");
  redirect("/admin/quotes");
}

export async function updateQuote(
  id: string,
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  await requireAdmin();
  const quote = await prisma.quote.findUnique({ where: { id } });
  if (!quote) return { error: "Quote not found." };

  const result = await parseWithImage(formData, quote.img);
  if ("error" in result) return { error: result.error };

  await prisma.quote.update({ where: { id }, data: result.data });

  revalidatePath("/admin/quotes");
  revalidatePath("/");
  redirect("/admin/quotes");
}

export async function deleteQuote(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const quote = await prisma.quote.delete({ where: { id } });
  if (quote.img) await deleteUploadedImage(quote.img);

  revalidatePath("/admin/quotes");
  revalidatePath("/");
}
