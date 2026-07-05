import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import PhotoGallery from "@/components/admin/PhotoGallery";
import {
  updateProject,
  addProjectPhotos,
  deleteProjectPhoto,
  setCoverPhoto,
} from "../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-8">
      <ProjectForm action={updateProject.bind(null, id)} defaultValues={project} />

      <PhotoGallery
        photos={project.photos}
        addAction={addProjectPhotos.bind(null, id)}
        deleteAction={deleteProjectPhoto}
        parentIdName="projectId"
        parentId={id}
        coverAction={setCoverPhoto}
        currentCover={project.img}
      />
    </div>
  );
}
