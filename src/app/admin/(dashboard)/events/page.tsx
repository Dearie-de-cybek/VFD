import { prisma } from "@/lib/prisma";
import FolderGrid from "@/components/admin/FolderGrid";
import { deleteEvent } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { photos: true } } },
  });

  const rows = events.map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: `${e.category} · ${e.date}`,
    photoCount: e._count.photos,
    published: e.published,
    updatedAt: e.updatedAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <FolderGrid
      rows={rows}
      editHrefBase="/admin/events"
      deleteAction={deleteEvent}
      emptyLabel="No events yet — click New to add the first one."
    />
  );
}
