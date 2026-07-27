"use client";

import { useActionState } from "react";
import { inputClass, textareaClass, labelClass } from "./form-styles";
import type { EventUpdateState } from "@/app/admin/(dashboard)/events/actions";

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
};

const initialState: EventUpdateState = {};

export default function EventRegistrations({
  registrations,
  sendAction,
}: {
  registrations: Registration[];
  sendAction: (prevState: EventUpdateState, formData: FormData) => Promise<EventUpdateState>;
}) {
  const [state, formAction, pending] = useActionState(sendAction, initialState);

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.05)] dark:border-white/10 dark:bg-[#0F1512]">
      <h2 className="text-base font-bold text-[#111827] dark:text-white">
        Registrations ({registrations.length})
      </h2>
      <p className="mt-1 text-sm text-[#6B7280]">
        Everyone who registered their interest on the public event page.
      </p>

      {registrations.length === 0 ? (
        <p className="mt-6 rounded-[10px] border border-dashed border-[#E5E7EB] py-10 text-center text-sm text-[#6B7280] dark:border-white/10">
          No registrations yet.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-[#6B7280]">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Phone</th>
                <th className="py-2 pr-4 font-medium">Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-t border-[#E5E7EB] dark:border-white/10">
                  <td className="py-3 pr-4 font-medium text-[#111827] dark:text-white">{r.name}</td>
                  <td className="py-3 pr-4 text-[#6B7280]">{r.email}</td>
                  <td className="py-3 pr-4 text-[#6B7280]">{r.phone || "—"}</td>
                  <td className="py-3 pr-4 text-[#6B7280]">
                    {r.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 border-t border-[#E5E7EB] pt-6 dark:border-white/10">
        <h3 className="text-sm font-bold text-[#111827] dark:text-white">
          Email registrants
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          Send event details or a reminder to everyone registered above.
        </p>

        <form action={formAction} key={state.success ? "reset" : "form"} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className={labelClass}>
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              required
              placeholder="Reminder: the conference is next week"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="body" className={labelClass}>
              Message
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={6}
              placeholder="Write the update or reminder…"
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
            disabled={pending || registrations.length === 0}
            className="h-10 w-fit rounded-[10px] bg-[#22C55E] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Sending…" : `Send to ${registrations.length} registrant${registrations.length === 1 ? "" : "s"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
