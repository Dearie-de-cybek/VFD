import { prisma } from "@/lib/prisma";
import { Trash2 } from "lucide-react";
import { deleteMessage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-5">
      {messages.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white py-14 text-center text-sm text-[#6B7280] dark:border-white/10 dark:bg-[#0F1512]">
          No messages yet — submissions from the contact form will show up here.
        </div>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-[#111827] dark:text-white">{m.subject}</p>
                <p className="mt-0.5 text-sm text-[#6B7280]">
                  {m.name} &lt;{m.email}&gt;
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-[#6B7280]">
                  {m.createdAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button
                    type="submit"
                    aria-label="Delete message"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:bg-[#DC2626]/10 hover:text-[#DC2626]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#374151] dark:text-white/80">
              {m.body}
            </p>
            <a
              href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + m.subject)}`}
              className="mt-4 inline-block text-sm font-semibold text-[#22C55E] hover:underline"
            >
              Reply by email
            </a>
          </div>
        ))
      )}
    </div>
  );
}
