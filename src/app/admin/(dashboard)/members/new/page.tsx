import MemberForm from "@/components/admin/MemberForm";
import { createMember } from "../actions";

export default function NewMemberPage() {
  return <MemberForm action={createMember} />;
}
