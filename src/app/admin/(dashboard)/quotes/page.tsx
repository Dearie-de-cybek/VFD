import { prisma } from "@/lib/prisma";
import FolderGrid from "@/components/admin/FolderGrid";
import { deleteQuote } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  const quotes = await prisma.quote.findMany({ orderBy: { order: "asc" } });

  const rows = quotes.map((q) => ({
    id: q.id,
    title: q.author,
    subtitle: q.text.length > 70 ? `${q.text.slice(0, 70)}…` : q.text,
    image: q.img ?? undefined,
    photoCount: q.img ? 1 : 0,
    published: q.published,
    updatedAt: q.updatedAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <FolderGrid
      rows={rows}
      editHrefBase="/admin/quotes"
      deleteAction={deleteQuote}
      emptyLabel="No quotes yet — click New to add the first one."
    />
  );
}
