import BlogForm from "@/components/admin/BlogForm";
import { createPost } from "../actions";

export default function NewBlogPage() {
  return <BlogForm action={createPost} />;
}
