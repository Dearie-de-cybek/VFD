import { prisma } from "@/lib/prisma";
import FolderGrid from "@/components/admin/FolderGrid";
import { deleteProduct } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = products.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: `₦${p.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
    image: p.img,
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
      editHrefBase="/admin/products"
      deleteAction={deleteProduct}
      emptyLabel="No products yet — click New to add the first one."
    />
  );
}
