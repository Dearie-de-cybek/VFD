import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import { deleteEvent } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { updatedAt: "desc" } });

  const rows = events.map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: `${e.category} · ${e.date}`,
    published: e.published,
    updatedAt: e.updatedAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <AdminTable
      rows={rows}
      editHrefBase="/admin/events"
      deleteAction={deleteEvent}
      emptyLabel="No events yet — click New to add the first one."
    />
  );
}
