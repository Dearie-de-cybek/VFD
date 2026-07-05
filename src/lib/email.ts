import "server-only";
import { Resend } from "resend";

export type SendResult = { ok: true } | { ok: false; error: string };

/** Sends one email via Resend. Requires RESEND_API_KEY and RESEND_FROM_EMAIL to be set. */
export async function sendEmail(to: string, subject: string, body: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      ok: false,
      error: "Email is not configured — add RESEND_API_KEY and RESEND_FROM_EMAIL to .env.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_NAME ? `${process.env.RESEND_FROM_NAME} <${from}>` : from,
      to,
      subject,
      text: body,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Email send failed." };
  }
}
