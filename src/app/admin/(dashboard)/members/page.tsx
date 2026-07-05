import { prisma } from "@/lib/prisma";
import MembersTable from "@/components/admin/MembersTable";
import { deleteMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({ orderBy: { createdAt: "desc" } });

  const rows = members.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    role: m.role,
    stage: m.stage,
    updatedAt: m.updatedAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  return <MembersTable rows={rows} deleteAction={deleteMember} />;
}
