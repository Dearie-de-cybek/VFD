import { createProduct } from "../actions";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight text-[#111827] dark:text-white">New Product</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
