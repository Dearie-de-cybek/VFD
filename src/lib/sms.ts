import "server-only";

export type SendResult = { ok: true } | { ok: false; error: string };

/** Sends one SMS via Termii. Requires TERMII_API_KEY and TERMII_SENDER_ID to be set. */
export async function sendSms(to: string, body: string): Promise<SendResult> {
  const apiKey = process.env.TERMII_API_KEY;
  const senderId = process.env.TERMII_SENDER_ID;

  if (!apiKey || !senderId) {
    return {
      ok: false,
      error: "SMS is not configured — add TERMII_API_KEY and TERMII_SENDER_ID to .env.",
    };
  }

  try {
    const res = await fetch("https://api.ng.termii.com/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        from: senderId,
        sms: body,
        type: "plain",
        channel: "generic",
        api_key: apiKey,
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return { ok: false, error: data?.message || `Termii request failed (${res.status}).` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "SMS send failed." };
  }
}
