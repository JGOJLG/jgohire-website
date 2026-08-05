import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function formatCurrency(
  amount: number | null | undefined,
  currency: string | null | undefined
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency || "usd").toUpperCase(),
  }).format(Number(amount ?? 0) / 100);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

type ExpandedDiscount = {
  discount?: {
    promotion_code?:
      | string
      | {
          code?: string | null;
        }
      | null;
    source?: {
      coupon?:
        | string
        | {
            name?: string | null;
          }
        | null;
    } | null;
  };
};

export async function POST(request: Request) {
  if (!stripe || !stripeSecretKey) {
    console.error("Missing STRIPE_SECRET_KEY.");
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json(
      { error: "Stripe webhook verification is not configured." },
      { status: 500 }
    );
  }

  if (!resend || !resendApiKey) {
    console.error("Missing RESEND_API_KEY.");
    return NextResponse.json(
      { error: "Purchase notification email is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid Stripe webhook signature." },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  try {
    const eventSession = event.data.object as Stripe.Checkout.Session;

    const session = await stripe.checkout.sessions.retrieve(eventSession.id, {
      expand: [
        "line_items",
        "total_details.breakdown.discounts.discount.promotion_code",
        "total_details.breakdown.discounts.discount.source.coupon",
      ],
    });

    const customerName =
      session.customer_details?.name?.trim() || "Not provided";
    const customerEmail =
      session.customer_details?.email ||
      session.customer_email ||
      "Not provided";
    const customerPhone =
      session.customer_details?.phone?.trim() || "Not provided";
    const productName =
      session.line_items?.data?.[0]?.description ||
      "LinkedIn Optimization Guide";

    const subtotal = formatCurrency(
      session.amount_subtotal,
      session.currency
    );
    const totalPaid = formatCurrency(
      session.amount_total,
      session.currency
    );
    const discountAmount = formatCurrency(
      session.total_details?.amount_discount,
      session.currency
    );

    const discounts =
      (
        session.total_details as
          | {
              breakdown?: {
                discounts?: ExpandedDiscount[];
              };
            }
          | null
          | undefined
      )?.breakdown?.discounts ?? [];

    const firstDiscount = discounts[0];

    const promotionCode =
      typeof firstDiscount?.discount?.promotion_code === "object"
        ? firstDiscount.discount.promotion_code?.code || null
        : null;

    const coupon =
      typeof firstDiscount?.discount?.source?.coupon === "object"
        ? firstDiscount.discount.source.coupon
        : null;

    const discountLabel =
      promotionCode ||
      coupon?.name ||
      (Number(session.total_details?.amount_discount ?? 0) > 0
        ? "Discount applied"
        : "No discount");

    const paymentDescription =
      session.payment_status === "no_payment_required"
        ? "No payment required"
        : session.payment_status === "paid"
          ? "Paid"
          : session.payment_status || "Unknown";

    const checkoutDate = new Date(
      Number(session.created) * 1000
    ).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    const { error: emailError } = await resend.emails.send(
      {
        from: "JGO Hire Purchases <website@jgohire.com>",
        to: ["jen@jgohire.com"],
        subject: `New LinkedIn Guide purchase from ${customerName}`,
        text: [
          "New LinkedIn Optimization Guide purchase",
          "",
          `Customer: ${customerName}`,
          `Email: ${customerEmail}`,
          `Phone: ${customerPhone}`,
          `Product: ${productName}`,
          `Subtotal: ${subtotal}`,
          `Discount: ${discountAmount}`,
          `Promotion: ${discountLabel}`,
          `Total paid: ${totalPaid}`,
          `Payment status: ${paymentDescription}`,
          `Checkout date: ${checkoutDate}`,
          `Stripe session: ${session.id}`,
        ].join("\n"),
        html: `
          <div style="background:#f4f1ea;padding:32px;font-family:Arial,sans-serif;color:#223028;">
            <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2ddd3;border-radius:20px;padding:36px;">
              <p style="margin:0 0 8px;color:#637a5b;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">JGO Hire Purchase</p>
              <h1 style="margin:0 0 26px;font-size:28px;">New LinkedIn Guide purchase</h1>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:9px 0;font-weight:700;">Customer</td><td style="padding:9px 0;">${escapeHtml(customerName)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Email</td><td style="padding:9px 0;">${escapeHtml(customerEmail)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Phone</td><td style="padding:9px 0;">${escapeHtml(customerPhone)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Product</td><td style="padding:9px 0;">${escapeHtml(productName)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Subtotal</td><td style="padding:9px 0;">${escapeHtml(subtotal)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Discount</td><td style="padding:9px 0;">${escapeHtml(discountAmount)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Promotion</td><td style="padding:9px 0;">${escapeHtml(discountLabel)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Total Paid</td><td style="padding:9px 0;font-weight:700;">${escapeHtml(totalPaid)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Payment Status</td><td style="padding:9px 0;">${escapeHtml(paymentDescription)}</td></tr>
                <tr><td style="padding:9px 0;font-weight:700;">Checkout Date</td><td style="padding:9px 0;">${escapeHtml(checkoutDate)}</td></tr>
              </table>
              <div style="margin-top:26px;padding:18px;background:#f5f7f2;border-radius:14px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#637a5b;text-transform:uppercase;letter-spacing:1px;">Stripe Session</p>
                <p style="margin:0;font-size:13px;word-break:break-all;">${escapeHtml(session.id)}</p>
              </div>
            </div>
          </div>
        `,
      },
      {
        idempotencyKey: `stripe-purchase/${event.id}`,
      }
    );

    if (emailError) {
      console.error("Resend purchase notification failed:", emailError);
      return NextResponse.json(
        { error: "Purchase notification email failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Unable to process Stripe purchase webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
