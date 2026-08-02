import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactRequest = {
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  referralSource?: unknown;
  website?: unknown;
};

function cleanText(value: unknown, maximumLength = 5000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maximumLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        { error: "The contact form is not configured yet." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactRequest;

    const firstName = cleanText(body.firstName, 100);
    const lastName = cleanText(body.lastName, 100);
    const phone = cleanText(body.phone, 50);
    const email = cleanText(body.email, 250).toLowerCase();
    const service = cleanText(body.service, 150);
    const message = cleanText(body.message, 5000);
    const referralSource = cleanText(body.referralSource, 150);
    const website = cleanText(body.website, 250);

    // Hidden spam field. Real visitors will leave this blank.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    const { error } = await resend.emails.send({
      from: "JGO Hire Website <website@jgohire.com>",
      to: ["jen@jgohire.com"],
      replyTo: email,
      subject: `New JGO Hire inquiry from ${fullName}`,
      text: [
        `New JGO Hire website inquiry`,
        ``,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Service: ${service || "Not selected"}`,
        `How they found JGO Hire: ${referralSource || "Not provided"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      html: `
        <div style="background:#f5f1ea;padding:32px;font-family:Arial,sans-serif;color:#223028;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:18px;padding:36px;border:1px solid #e4dfd6;">
            <p style="margin:0 0 8px;color:#637a5b;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
              JGO Hire Website
            </p>

            <h1 style="margin:0 0 28px;font-size:28px;">
              New consultation inquiry
            </h1>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-weight:700;">Name</td>
                <td style="padding:10px 0;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;">Email</td>
                <td style="padding:10px 0;">${escapeHtml(email)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;">Phone</td>
                <td style="padding:10px 0;">${escapeHtml(
                  phone || "Not provided"
                )}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;">Service</td>
                <td style="padding:10px 0;">${escapeHtml(
                  service || "Not selected"
                )}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:700;">Found JGO Hire</td>
                <td style="padding:10px 0;">${escapeHtml(
                  referralSource || "Not provided"
                )}</td>
              </tr>
            </table>

            <div style="margin-top:26px;padding:22px;background:#f7f3ec;border-radius:14px;">
              <p style="margin:0 0 10px;font-weight:700;">What brought them here:</p>
              <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${escapeHtml(
                message
              )}</p>
            </div>

            <p style="margin:26px 0 0;color:#667168;font-size:13px;">
              Reply directly to this email to respond to ${escapeHtml(
                firstName
              )}.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend contact-form error:", error);

      return NextResponse.json(
        { error: "Your message could not be sent. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact-form error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}