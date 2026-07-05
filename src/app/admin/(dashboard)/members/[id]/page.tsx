import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberForm from "@/components/admin/MemberForm";
import { updateMember } from "../actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) notFound();

  return <MemberForm action={updateMember.bind(null, id)} defaultValues={member} />;
}
