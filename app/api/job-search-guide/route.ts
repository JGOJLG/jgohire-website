import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

type GuideRequest = {
  firstName?: unknown;
  email?: unknown;
  resultType?: unknown;
  resultTitle?: unknown;
};

function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        {
          error: "Email delivery is not configured yet.",
        },
        {
          status: 500,
        },
      );
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(
        "Supabase server environment variables are not configured.",
      );

      return NextResponse.json(
        {
          error: "Lead storage is not configured yet.",
        },
        {
          status: 500,
        },
      );
    }

    const body = (await request.json()) as GuideRequest;

    const firstName = cleanText(body.firstName, 100);
    const email = cleanText(body.email, 250).toLowerCase();
    const resultType = cleanText(body.resultType, 100);
    const resultTitle = cleanText(body.resultTitle, 200);

    if (!firstName || !email) {
      return NextResponse.json(
        {
          error: "Please enter your first name and email.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    /*
     * SAVE / UPDATE THE LEAD IN SUPABASE
     *
     * Email is normalized to lowercase before saving.
     * If this email already exists, we update the person's
     * name and latest quiz result instead of creating a duplicate.
     */
    const { error: leadError } = await supabase
      .from("job_search_guide_leads")
      .upsert(
        {
          first_name: firstName,
          email,
          quiz_result_type: resultType || null,
          quiz_result_title: resultTitle || null,
        },
        {
          onConflict: "email",
        },
      );

    if (leadError) {
      console.error(
        "Supabase survival-guide lead error:",
        leadError,
      );

      return NextResponse.json(
        {
          error:
            "I couldn't save your information just yet. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    const guideUrl =
      "https://jgohire.com/job-seeker-survival-guide";

    const servicesUrl =
      "https://jgohire.com/#services";

    /*
     * EMAIL TO THE JOB SEEKER
     */
    const { error: guideEmailError } =
      await resend.emails.send({
        from: "JGO Hire <website@jgohire.com>",
        to: [email],
        replyTo: "jen@jgohire.com",
        subject: "Your Job Seeker Survival Guide is here",
        text: [
          `Hi ${firstName},`,
          "",
          "You survived the quiz. Now let’s make the actual job search a little easier.",
          "",
          "I put together the JGO Hire Job Seeker Survival Guide to help you cut through some of the noise around resumes, LinkedIn, applications, interviews, AI, and everything else that somehow became part of finding a job.",
          "",
          `Get My Survival Guide: ${guideUrl}`,
          "",
          "And yes, you can download the PDF from there too if you want to save it.",
          "",
          "One more thing...",
          "",
          "A guide can give you the strategy. But sometimes the hardest part is figuring out what’s actually not working in your job search.",
          "",
          "Is it your resume? Are you applying but not getting interviews? Getting interviews but not offers? Not sure what roles you should even be targeting anymore?",
          "",
          "That’s where I come in.",
          "",
          "I’m a recruiter and career coach, which means I’ve spent years on the other side of the hiring process. I work 1:1 with job seekers on resumes, interview prep, LinkedIn, and overall job search strategy.",
          "",
          "So if you get through the guide and think, “Okay Jen, but what do I do with MY situation?” I’ve got you.",
          "",
          `See How We Can Work Together: ${servicesUrl}`,
          "",
          "Happy job hunting,",
          "Jen",
          "JGO Hire",
        ].join("\n"),
        html: `
          <div
            style="
              margin:0;
              padding:40px 20px;
              background:#f5f1ea;
              font-family:Arial,Helvetica,sans-serif;
              color:#223028;
            "
          >
            <div
              style="
                max-width:620px;
                margin:0 auto;
                background:#ffffff;
                border:1px solid #e4dfd6;
                border-radius:22px;
                overflow:hidden;
              "
            >
              <div
                style="
                  padding:34px 38px 24px;
                  background:#f7f3ec;
                  border-bottom:1px solid #e4dfd6;
                "
              >
                <p
                  style="
                    margin:0 0 5px;
                    color:#637a5b;
                    font-size:12px;
                    font-weight:700;
                    letter-spacing:1.7px;
                    text-transform:uppercase;
                  "
                >
                  JGO HIRE
                </p>

                <p
                  style="
                    margin:0;
                    color:#667168;
                    font-size:12px;
                  "
                >
                  Career Coach + Recruiter
                </p>
              </div>

              <div style="padding:38px;">
                <h1
                  style="
                    margin:0 0 24px;
                    color:#223028;
                    font-family:Georgia,serif;
                    font-size:32px;
                    line-height:1.15;
                    font-weight:500;
                  "
                >
                  Your Job Seeker Survival Guide is here.
                </h1>

                <p
                  style="
                    margin:0 0 18px;
                    color:#536158;
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  Hi ${escapeHtml(firstName)},
                </p>

                <p
                  style="
                    margin:0 0 18px;
                    color:#536158;
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  You survived the quiz. Now let’s make the actual
                  job search a little easier.
                </p>

                <p
                  style="
                    margin:0 0 26px;
                    color:#536158;
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  I put together the
                  <strong style="color:#223028;">
                    JGO Hire Job Seeker Survival Guide
                  </strong>
                  to help you cut through some of the noise around
                  resumes, LinkedIn, applications, interviews, AI,
                  and everything else that somehow became part of
                  finding a job.
                </p>

                <div style="margin:30px 0;">
                  <a
                    href="${guideUrl}"
                    style="
                      display:inline-block;
                      padding:15px 24px;
                      border-radius:12px;
                      background:#4d6247;
                      color:#ffffff;
                      font-size:15px;
                      font-weight:700;
                      text-decoration:none;
                    "
                  >
                    Get My Survival Guide →
                  </a>
                </div>

                <p
                  style="
                    margin:0 0 30px;
                    color:#7a847c;
                    font-size:13px;
                    line-height:1.6;
                  "
                >
                  And yes, you can download the PDF from there too
                  if you want to save it.
                </p>

                <div
                  style="
                    height:1px;
                    margin:30px 0;
                    background:#e7e2da;
                  "
                ></div>

                <h2
                  style="
                    margin:0 0 16px;
                    color:#223028;
                    font-family:Georgia,serif;
                    font-size:23px;
                    font-weight:500;
                  "
                >
                  One more thing...
                </h2>

                <p
                  style="
                    margin:0 0 18px;
                    color:#536158;
                    font-size:15px;
                    line-height:1.7;
                  "
                >
                  A guide can give you the strategy. But sometimes
                  the hardest part is figuring out what’s actually
                  not working in <em>your</em> job search.
                </p>

                <p
                  style="
                    margin:0 0 18px;
                    color:#536158;
                    font-size:15px;
                    line-height:1.7;
                  "
                >
                  Is it your resume? Are you applying but not
                  getting interviews? Getting interviews but not
                  offers? Not sure what roles you should even be
                  targeting anymore?
                </p>

                <p
                  style="
                    margin:0 0 18px;
                    color:#223028;
                    font-size:16px;
                    line-height:1.7;
                    font-weight:700;
                  "
                >
                  That’s where I come in.
                </p>

                <p
                  style="
                    margin:0 0 18px;
                    color:#536158;
                    font-size:15px;
                    line-height:1.7;
                  "
                >
                  I’m a recruiter and career coach, which means
                  I’ve spent years on the other side of the hiring
                  process. I work 1:1 with job seekers on resumes,
                  interview prep, LinkedIn, and overall job search
                  strategy.
                </p>

                <div
                  style="
                    margin:26px 0;
                    padding:22px;
                    border-radius:16px;
                    background:#eef2eb;
                  "
                >
                  <p
                    style="
                      margin:0;
                      color:#334239;
                      font-family:Georgia,serif;
                      font-size:18px;
                      line-height:1.55;
                    "
                  >
                    So if you get through the guide and think,
                    <em>
                      “Okay Jen, but what do I do with MY situation?”
                    </em>
                    I’ve got you.
                  </p>
                </div>

                <div style="margin:26px 0 34px;">
                  <a
                    href="${servicesUrl}"
                    style="
                      display:inline-block;
                      padding:14px 22px;
                      border:1px solid #4d6247;
                      border-radius:12px;
                      color:#4d6247;
                      font-size:14px;
                      font-weight:700;
                      text-decoration:none;
                    "
                  >
                    See How We Can Work Together →
                  </a>
                </div>

                <p
                  style="
                    margin:0;
                    color:#536158;
                    font-size:15px;
                    line-height:1.65;
                  "
                >
                  Happy job hunting,<br />
                  <strong style="color:#223028;">Jen</strong><br />
                  JGO Hire
                </p>
              </div>
            </div>
          </div>
        `,
      });

    if (guideEmailError) {
      console.error(
        "Resend survival-guide email error:",
        guideEmailError,
      );

      return NextResponse.json(
        {
          error:
            "I couldn't send the guide just yet. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * INTERNAL LEAD NOTIFICATION TO YOU
     */
    const { error: internalEmailError } =
      await resend.emails.send({
        from: "JGO Hire Website <website@jgohire.com>",
        to: ["jen@jgohire.com"],
        replyTo: email,
        subject: `New Survival Guide lead: ${firstName}`,
        text: [
          "New JGO Hire Survival Guide lead",
          "",
          `First Name: ${firstName}`,
          `Email: ${email}`,
          `Quiz Result: ${resultTitle || resultType || "Not provided"}`,
        ].join("\n"),
        html: `
          <div
            style="
              padding:30px;
              background:#f5f1ea;
              font-family:Arial,sans-serif;
              color:#223028;
            "
          >
            <div
              style="
                max-width:600px;
                margin:0 auto;
                padding:30px;
                background:#ffffff;
                border-radius:18px;
                border:1px solid #e4dfd6;
              "
            >
              <p
                style="
                  margin:0 0 8px;
                  color:#637a5b;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                "
              >
                JGO Hire Quiz
              </p>

              <h1
                style="
                  margin:0 0 24px;
                  font-size:25px;
                "
              >
                New Survival Guide lead
              </h1>

              <p>
                <strong>Name:</strong>
                ${escapeHtml(firstName)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Quiz Result:</strong>
                ${escapeHtml(
                  resultTitle ||
                    resultType ||
                    "Not provided",
                )}
              </p>
            </div>
          </div>
        `,
      });

    if (internalEmailError) {
      /*
       * Do not fail the visitor's submission if your internal
       * notification has a problem. Their guide already sent.
       */
      console.error(
        "Resend internal lead notification error:",
        internalEmailError,
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Job-search-guide error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
