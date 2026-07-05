import { prisma } from "@/lib/prisma";
import { MEMBER_ROLES, memberRoleLabel } from "@/lib/member-roles";
import ComposeForm from "./ComposeForm";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const members = await prisma.member.findMany({ select: { role: true, email: true, phone: true } });

  const audienceCounts: Record<string, { withEmail: number; withPhone: number; total: number }> = {};
  const buckets = ["ALL", ...MEMBER_ROLES.map((r) => r.value)];
  for (const bucket of buckets) {
    const group = bucket === "ALL" ? members : members.filter((m) => m.role === bucket);
    audienceCounts[bucket] = {
      withEmail: group.filter((m) => m.email).length,
      withPhone: group.filter((m) => m.phone).length,
      total: group.length,
    };
  }

  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: "desc" }, take: 10 });

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <h2 className="text-base font-bold text-[#111827] dark:text-white">Compose</h2>
        <p className="mt-1 text-sm text-[#6B7280]">
          Send an email or SMS blast to your ambassadors, parents, school owners or teachers.
        </p>
        <div className="mt-6">
          <ComposeForm audienceCounts={audienceCounts} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <div className="border-b border-[#E5E7EB] px-6 py-5 dark:border-white/10">
          <h2 className="text-base font-bold text-[#111827] dark:text-white">Recent campaigns</h2>
        </div>
        {campaigns.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-[#6B7280]">No campaigns sent yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-[#6B7280]">
                <th className="px-6 py-3 font-medium">Channel</th>
                <th className="px-6 py-3 font-medium">Audience</th>
                <th className="px-6 py-3 font-medium">Subject / message</th>
                <th className="px-6 py-3 font-medium">Result</th>
                <th className="px-6 py-3 font-medium">Sent</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="h-14 border-t border-[#E5E7EB] dark:border-white/10"
                >
                  <td className="px-6">
                    <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
                      {c.channel}
                    </span>
                  </td>
                  <td className="px-6 text-[#6B7280]">
                    {c.audience ? memberRoleLabel(c.audience) : "Everyone"}
                  </td>
                  <td className="max-w-xs truncate px-6 text-[#111827] dark:text-white">
                    {c.subject || c.body}
                  </td>
                  <td className="px-6 text-[#6B7280]">
                    {c.sentCount} sent{c.failedCount > 0 ? `, ${c.failedCount} failed` : ""}
                  </td>
                  <td className="px-6 text-[#6B7280]">
                    {c.sentAt?.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
