import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  const rows = projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.tag,
    image: p.img,
    published: p.published,
    updatedAt: p.updatedAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/projects"
      deleteAction={deleteProject}
      emptyLabel="No projects yet — click New to add the first one."
    />
  );
}
