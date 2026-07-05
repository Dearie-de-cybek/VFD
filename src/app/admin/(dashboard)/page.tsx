import Link from "next/link";
import { CalendarDays, Newspaper, Images, Image as ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

const WEEK_AGO = () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

export default async function AdminDashboardPage() {
  const since = WEEK_AGO();

  const [
    eventsCount,
    postsCount,
    projectsCount,
    mediaCount,
    eventsDelta,
    postsDelta,
    projectsDelta,
    recentEvents,
    recentPosts,
    recentProjects,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.post.count(),
    prisma.project.count(),
    prisma.media.count(),
    prisma.event.count({ where: { createdAt: { gte: since } } }),
    prisma.post.count({ where: { createdAt: { gte: since } } }),
    prisma.project.count({ where: { createdAt: { gte: since } } }),
    prisma.event.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.post.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  const activity = [
    ...recentEvents.map((e) => ({
      type: "Event",
      title: e.title,
      updatedAt: e.updatedAt,
      href: `/admin/events/${e.id}`,
    })),
    ...recentPosts.map((p) => ({
      type: "Blog",
      title: p.title,
      updatedAt: p.updatedAt,
      href: `/admin/blogs/${p.id}`,
    })),
    ...recentProjects.map((p) => ({
      type: "Project",
      title: p.title,
      updatedAt: p.updatedAt,
      href: `/admin/projects/${p.id}`,
    })),
  ]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarDays} label="Events" value={eventsCount} delta={eventsDelta} />
        <StatCard icon={Newspaper} label="Blog posts" value={postsCount} delta={postsDelta} />
        <StatCard icon={Images} label="Projects" value={projectsCount} delta={projectsDelta} />
        <StatCard icon={ImageIcon} label="Media files" value={mediaCount} delta={0} />
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
        <div className="border-b border-[#E5E7EB] px-6 py-5 dark:border-white/10">
          <h2 className="text-base font-bold text-[#111827] dark:text-white">Recent activity</h2>
        </div>
        {activity.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-[#6B7280]">
            Nothing yet — create your first event, blog post or project.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-[#6B7280]">
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((item, i) => (
                <tr
                  key={`${item.type}-${item.title}-${i}`}
                  className="h-14 border-t border-[#E5E7EB] transition-colors hover:bg-[#F3F4F6] dark:border-white/10 dark:hover:bg-white/5"
                >
                  <td className="px-6">
                    <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6">
                    <Link href={item.href} className="font-medium text-[#111827] hover:underline dark:text-white">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 text-[#6B7280]">
                    {item.updatedAt.toLocaleDateString("en-GB", {
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
