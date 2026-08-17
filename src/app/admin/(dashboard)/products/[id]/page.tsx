import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../actions";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight text-[#111827] dark:text-white">Edit Product</h1>
      <ProductForm action={updateProduct.bind(null, id)} defaultValues={product} />
    </div>
  );
}
