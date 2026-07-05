import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import { deletePost } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  const rows = posts.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: `${p.category} · /blogs/${p.slug}`,
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
      editHrefBase="/admin/blogs"
      deleteAction={deletePost}
      emptyLabel="No blog posts yet — click New to write the first one."
    />
  );
}
