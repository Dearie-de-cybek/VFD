"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/upload";

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
  const photos = await prisma.projectPhoto.findMany({ where: { projectId: id } });
  await prisma.project.delete({ where: { id } });
  await Promise.all(photos.map((p) => deleteUploadedImage(p.path)));

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export type PhotoFormState = { error?: string };

export async function addProjectPhotos(
  projectId: string,
  _prevState: PhotoFormState,
  formData: FormData
): Promise<PhotoFormState> {
  await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return { error: "Project not found." };

  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Choose at least one photo." };

  const count = await prisma.projectPhoto.count({ where: { projectId } });

  try {
    for (const [i, file] of files.entries()) {
      const savedPath = await saveUploadedImage(file);
      await prisma.projectPhoto.create({
        data: {
          projectId,
          path: savedPath,
          alt: project.title,
          order: count + i,
        },
      });
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }

  revalidatePath(`/admin/projects/${projectId}`);
  return {};
}

export async function deleteProjectPhoto(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const projectId = String(formData.get("projectId"));

  const photo = await prisma.projectPhoto.delete({ where: { id } });
  await deleteUploadedImage(photo.path);

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function setCoverPhoto(formData: FormData) {
  await requireAdmin();
  const projectId = String(formData.get("projectId"));
  const path = String(formData.get("path"));
  const alt = String(formData.get("alt"));

  await prisma.project.update({ where: { id: projectId }, data: { img: path, alt } });

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
