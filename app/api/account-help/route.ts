import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function cleanText(value: unknown, max = 3000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Account support is not configured." }, { status: 500 });
    }

    const body = await request.json();
    const name = cleanText(body.name, 150);
    const email = cleanText(body.email, 250).toLowerCase();
    const issueType = cleanText(body.issueType, 200);
    const details = cleanText(body.details, 3000);
    const website = cleanText(body.website, 250);

    if (website) return NextResponse.json({ success: true });

    if (!name || !email || !issueType || !details) {
      return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "JGO Hire Course Support <website@jgohire.com>",
      to: ["jen@jgohire.com"],
      replyTo: email,
      subject: `Course access issue: ${issueType}`,
      text: [
        "JGO Hire Course Access Request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Issue: ${issueType}`,
        "",
        "Details:",
        details,
      ].join("\n"),
      html: `
        <div style="background:#f4f1ea;padding:32px;font-family:Arial,sans-serif;color:#223028;">
          <div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2ddd3;border-radius:20px;padding:36px;">
            <p style="margin:0 0 8px;color:#637a5b;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">JGO Hire Course Support</p>
            <h1 style="margin:0 0 24px;font-size:28px;">Course access issue</h1>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Issue:</strong> ${escapeHtml(issueType)}</p>
            <div style="margin-top:24px;padding:18px;background:#f5f7f2;border-radius:14px;">
              <p style="margin:0;white-space:pre-wrap;line-height:1.7;">${escapeHtml(details)}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: "Your request could not be sent." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}