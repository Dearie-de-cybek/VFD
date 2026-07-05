"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage } from "@/lib/upload";

const PostSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers and hyphens."),
  title: z.string().trim().min(2, "Title is required."),
  category: z.string().trim().min(1, "Category is required."),
  excerpt: z.string().trim().min(1, "Excerpt is required."),
  body: z.string().trim().min(1, "Body is required."),
  alt: z.string().trim().min(1, "Image alt text is required."),
  published: z.boolean(),
});

export type PostFormState = { error?: string };

async function parseWithImage(formData: FormData, existingImg?: string) {
  const parsed = PostSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    alt: formData.get("alt"),
    published: formData.get("published") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message } as const;

  const file = formData.get("image");
  let img = existingImg;
  if (file instanceof File && file.size > 0) {
    try {
      img = await saveUploadedImage(file);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Image upload failed." } as const;
    }
  }
  if (!img) return { error: "An image is required." } as const;

  return { data: { ...parsed.data, img } } as const;
}

export async function createPost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();
  const result = await parseWithImage(formData);
  if ("error" in result) return { error: result.error };

  const existing = await prisma.post.findUnique({ where: { slug: result.data.slug } });
  if (existing) return { error: "That slug is already in use." };

  await prisma.post.create({ data: result.data });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  redirect("/admin/blogs");
}

export async function updatePost(
  id: string,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return { error: "Post not found." };

  const result = await parseWithImage(formData, post.img);
  if ("error" in result) return { error: result.error };

  if (result.data.slug !== post.slug) {
    const existing = await prisma.post.findUnique({ where: { slug: result.data.slug } });
    if (existing) return { error: "That slug is already in use." };
  }

  await prisma.post.update({ where: { id }, data: result.data });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${post.slug}`);
  revalidatePath(`/blogs/${result.data.slug}`);
  redirect("/admin/blogs");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const post = await prisma.post.delete({ where: { id } });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${post.slug}`);
}
