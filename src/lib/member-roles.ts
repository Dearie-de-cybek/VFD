export const MEMBER_ROLES = [
  { value: "AMBASSADOR", label: "VDL Ambassador" },
  { value: "PARENT", label: "Parent" },
  { value: "SCHOOL_OWNER", label: "School Owner" },
  { value: "TEACHER", label: "Teacher" },
] as const;

export type MemberRoleValue = (typeof MEMBER_ROLES)[number]["value"];

export function memberRoleLabel(value: string): string {
  return MEMBER_ROLES.find((r) => r.value === value)?.label ?? value;
}
