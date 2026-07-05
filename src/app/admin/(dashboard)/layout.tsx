import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell name={session.name} email={session.email}>
      {children}
    </AdminShell>
  );
}
