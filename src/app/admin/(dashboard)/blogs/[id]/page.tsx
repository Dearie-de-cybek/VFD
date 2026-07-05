import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";
import { updatePost } from "../actions";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return <BlogForm action={updatePost.bind(null, id)} defaultValues={post} />;
}
