import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FreeResourceRequest = {
  fullName?: unknown;
  email?: unknown;
  website?: unknown;
};

function cleanText(value: unknown, maximumLength = 500) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maximumLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
      return NextResponse.json(
        { error: "The free resources form is not configured yet." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as FreeResourceRequest;

    const fullName = cleanText(body.fullName, 150);
    const email = cleanText(body.email, 250).toLowerCase();
    const website = cleanText(body.website, 250);

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Please enter your full name and email address." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "JGO Hire Website <website@jgohire.com>",
      to: ["jen@jgohire.com"],
      replyTo: email,
      subject: `New free guide request from ${fullName}`,
      text: [
        "New JGO Hire free guide request",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        "",
        "The visitor was redirected to the free guides download page.",
      ].join("\n"),
      html: `
        <div style="background:#f5f1ea;padding:32px;font-family:Arial,sans-serif;color:#223028;">
          <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;padding:34px;border:1px solid #e4dfd6;">
            <p style="margin:0 0 8px;color:#637a5b;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
              JGO Hire Resources
            </p>

            <h1 style="margin:0 0 26px;font-size:27px;">
              New free guide request
            </h1>

            <p style="margin:0 0 12px;">
              <strong>Name:</strong>
              ${escapeHtml(fullName)}
            </p>

            <p style="margin:0 0 12px;">
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </p>

            <p style="margin:24px 0 0;color:#667168;font-size:14px;line-height:1.6;">
              This visitor was redirected to the downloadable guides page.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Free resources Resend error:", error);

      return NextResponse.json(
        { error: "Unable to unlock the guides. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Free resources form error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}