import "server-only";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Wraps a plain-text email body in the VDL-branded HTML shell. Paragraphs split on blank lines. */
export function renderEmailHtml({
  heading,
  body,
  ctaLabel,
  ctaUrl,
}: {
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}): string {
  const paragraphs = body
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#122a1e;">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`
    )
    .join("");

  const cta =
    ctaLabel && ctaUrl
      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
          <tr>
            <td style="border-radius:999px;background:#c9a227;">
              <a href="${ctaUrl}" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#0c2b1d;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">
                ${escapeHtml(ctaLabel)}
              </a>
            </td>
          </tr>
        </table>`
      : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f2e8;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2e8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fbf9f2;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#0c2b1d;padding:28px 32px;text-align:center;">
                <span style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#e2c56d;font-family:Arial,Helvetica,sans-serif;">
                  Values for Daily Living
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:#122a1e;font-family:Georgia,'Times New Roman',serif;">
                  ${escapeHtml(heading)}
                </h1>
                ${paragraphs}
                ${cta}
              </td>
            </tr>
            <tr>
              <td style="background:#efe8d8;padding:20px 32px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#3e6b52;font-family:Arial,Helvetica,sans-serif;">
                  127 Chime Avenue, New Haven, Enugu, Nigeria &middot; hello@valuesfordailyliving.org
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
