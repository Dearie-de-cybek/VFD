"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage } from "@/lib/upload";

const ProjectSchema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  tag: z.string().trim().min(1, "Tag is required."),
  desc: z.string().trim().min(1, "Description is required."),
  alt: z.string().trim().min(1, "Image alt text is required."),
  order: z.coerce.number().int().min(0),
  published: z.boolean(),
});

export type ProjectFormState = { error?: string };

async function parseWithImage(formData: FormData, existingImg?: string) {
  const parsed = ProjectSchema.safeParse({
    title: formData.get("title"),
    tag: formData.get("tag"),
    desc: formData.get("desc"),
    alt: formData.get("alt"),
    order: formData.get("order") || 0,
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

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();
  const result = await parseWithImage(formData);
  if ("error" in result) return { error: result.error };

  await prisma.project.create({ data: result.data });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: "Project not found." };

  const result = await parseWithImage(formData, project.img);
  if ("error" in result) return { error: result.error };

  await prisma.project.update({ where: { id }, data: result.data });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
