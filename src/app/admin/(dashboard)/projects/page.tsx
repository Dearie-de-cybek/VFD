import { prisma } from "@/lib/prisma";
import FolderGrid from "@/components/admin/FolderGrid";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { photos: true } } },
  });

  const rows = projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.tag,
    image: p.img,
    photoCount: p._count.photos,
    published: p.published,
    updatedAt: p.updatedAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <FolderGrid
      rows={rows}
      editHrefBase="/admin/projects"
      deleteAction={deleteProject}
      emptyLabel="No projects yet — click New to add the first one."
    />
  );
}
