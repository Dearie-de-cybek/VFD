"use client";

import { useActionState, useMemo, useState } from "react";
import { inputClass, textareaClass, labelClass } from "@/components/admin/form-styles";
import { MEMBER_ROLES } from "@/lib/member-roles";
import { sendCampaign, type CampaignFormState } from "./actions";

const initialState: CampaignFormState = {};

export default function ComposeForm({
  audienceCounts,
}: {
  audienceCounts: Record<string, { withEmail: number; withPhone: number; total: number }>;
}) {
  const [state, formAction, pending] = useActionState(sendCampaign, initialState);
  const [channel, setChannel] = useState<"EMAIL" | "SMS">("EMAIL");
  const [audience, setAudience] = useState("ALL");

  const audienceOptions = [
    { value: "ALL", label: "Everyone" },
    ...MEMBER_ROLES.map((r) => ({ value: r.value, label: r.label })),
  ];

  const reachable = useMemo(() => {
    const counts = audienceCounts[audience] ?? { withEmail: 0, withPhone: 0, total: 0 };
    return channel === "EMAIL" ? counts.withEmail : counts.withPhone;
  }, [audience, channel, audienceCounts]);

  return (
    <form action={formAction} key={state.success ? "reset" : "form"} className="flex max-w-2xl flex-col gap-5">
      <div className="flex gap-2">
        {(["EMAIL", "SMS"] as const).map((c) => (
          <label
            key={c}
            className={`flex h-10 flex-1 cursor-pointer items-center justify-center rounded-[10px] border text-sm font-semibold transition-colors ${
              channel === c
                ? "border-[#22C55E] bg-[#DCFCE7] text-[#16A34A]"
                : "border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6] dark:border-white/10 dark:text-white/80"
            }`}
          >
            <input
              type="radio"
              name="channel"
              value={c}
              checked={channel === c}
              onChange={() => setChannel(c)}
              className="hidden"
            />
            {c === "EMAIL" ? "Email" : "SMS"}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="audience" className={labelClass}>
          Audience
        </label>
        <select
          id="audience"
          name="audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className={inputClass}
        >
          {audienceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-[#6B7280]">
          {reachable} {reachable === 1 ? "member" : "members"} reachable by {channel === "EMAIL" ? "email" : "SMS"}
        </p>
      </div>

      {channel === "EMAIL" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <input id="subject" name="subject" required placeholder="July newsletter" className={inputClass} />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="body" className={labelClass}>
          Message
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={8}
          placeholder={
            channel === "SMS"
              ? "Keep it short — SMS is billed per 160 characters."
              : "Write your newsletter…"
          }
          className={textareaClass}
        />
      </div>

      {state.error && (
        <p className="rounded-[10px] bg-[#DC2626]/10 px-3.5 py-2.5 text-sm text-[#DC2626]">{state.error}</p>
      )}
      {state.success && (
        <p className="rounded-[10px] bg-[#DCFCE7] px-3.5 py-2.5 text-sm text-[#16A34A]">{state.success}</p>
      )}

      <button
        type="submit"
        disabled={pending || reachable === 0}
        className="mt-1 h-10 w-fit rounded-[10px] bg-[#22C55E] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : `Send to ${reachable} ${reachable === 1 ? "member" : "members"}`}
      </button>
    </form>
  );
}
