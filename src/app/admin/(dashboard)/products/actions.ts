"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

const ProductSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  price: z.preprocess((val) => Number(val), z.number().min(0, "Price must be a positive number.")),
  desc: z.string().trim().min(1, "Description is required."),
  link: z.string().trim().optional().or(z.literal("")),
  published: z.boolean(),
  featured: z.boolean(),
});

export type ProductFormState = { error?: string };

function parse(formData: FormData) {
  return ProductSchema.safeParse({
    title: formData.get("title"),
    price: formData.get("price"),
    desc: formData.get("desc"),
    link: formData.get("link") || "",
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
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

  return { data: { ...parsed.data, img, alt: parsed.data.title } } as const;
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const result = await parseWithImage(formData);
  if ("error" in result) return { error: result.error };

  await prisma.product.create({
    data: {
      ...result.data,
      link: result.data.link || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { error: "Product not found." };

  const result = await parseWithImage(formData, product.img);
  if ("error" in result) return { error: result.error };

  await prisma.product.update({
    where: { id },
    data: {
      ...result.data,
      link: result.data.link || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const product = await prisma.product.findUnique({ where: { id } });
  if (product && product.img) {
    await deleteUploadedImage(product.img);
  }
  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
