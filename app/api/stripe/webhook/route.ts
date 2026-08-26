import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const memberLoginUrl = "https://www.jgohire.com/client-portal/login";

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;

function formatCurrency(amount: number | null | undefined, currency: string | null | undefined) { return new Intl.NumberFormat("en-US", { style: "currency", currency: (currency || "usd").toUpperCase() }).format(Number(amount ?? 0) / 100); }
function escapeHtml(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
function getErrorMessage(error: unknown) { if (error instanceof Error) return error.message; if (typeof error === "string") return error; try { return JSON.stringify(error); } catch { return "Unknown error"; } }

export async function POST(request: Request) {
  if (!stripe || !webhookSecret || !resend) return NextResponse.json({ error: "Purchase webhook is not fully configured." }, { status: 500 });
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret); }
  catch (error) { return NextResponse.json({ error: "Invalid Stripe webhook signature.", detail: getErrorMessage(error) }, { status: 400 }); }
  if (event.type !== "checkout.session.completed") return NextResponse.json({ received: true, ignored: event.type });

  try {
    const eventSession = event.data.object as Stripe.Checkout.Session;
    const session = await stripe.checkout.sessions.retrieve(eventSession.id);
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
    const firstLineItem = lineItems.data[0];
    const customerName = session.customer_details?.name?.trim() || "Not provided";
    const firstName = customerName !== "Not provided" ? customerName.split(" ")[0] : "there";
    const rawEmail = session.customer_details?.email || session.customer_email || "";
    const customerEmail = rawEmail.trim().toLowerCase();
    const customerPhone = session.customer_details?.phone?.trim() || "Not provided";
    const productName = firstLineItem?.description || "LinkedIn Optimization Guide";
    const subtotal = formatCurrency(session.amount_subtotal, session.currency);
    const discountAmount = formatCurrency(session.total_details?.amount_discount, session.currency);
    const totalPaid = formatCurrency(session.amount_total, session.currency);
    const discountLabel = Number(session.total_details?.amount_discount ?? 0) > 0 ? "Discount or promotion applied" : "No discount";
    const paymentDescription = session.payment_status === "no_payment_required" ? "Free checkout, no payment required" : session.payment_status === "paid" ? "Paid" : session.payment_status || "Unknown";
    const checkoutDate = new Date(Number(session.created) * 1000).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/New_York" });

    let entitlementRecorded = false;
    if (supabase && customerEmail && (session.payment_status === "paid" || session.payment_status === "no_payment_required")) {
      const { error: grantError } = await supabase.from("member_entitlement_grants").upsert({ email: customerEmail, entitlement: "linkedin_guide", source: "stripe_checkout", external_reference: session.id }, { onConflict: "email,entitlement,external_reference", ignoreDuplicates: true });
      if (grantError) throw new Error(`Unable to record LinkedIn Guide entitlement: ${grantError.message}`);
      const { error: directGrantError } = await supabase.rpc("grant_member_entitlement_by_email", { p_email: customerEmail, p_entitlement: "linkedin_guide", p_source: "stripe_checkout" });
      if (directGrantError) throw new Error(`Unable to attach LinkedIn Guide entitlement: ${directGrantError.message}`);
      entitlementRecorded = true;
    } else if (!supabase) console.error("LinkedIn Guide entitlement was not recorded because SUPABASE_SERVICE_ROLE_KEY is missing.");

    let customerEmailId: string | null = null;
    if (customerEmail && entitlementRecorded) {
      const welcome = await resend.emails.send({
        from: "JGO Hire <jen@jgohire.com>", to: [customerEmail], subject: "Your JGO Hire LinkedIn Guide is ready",
        text: [`Hi ${firstName},`, "", "Your LinkedIn Optimization Guide is ready.", "", "Your purchase is connected to the email address you used at checkout. To access it:", `1. Go to ${memberLoginUrl}`, `2. Enter this email: ${customerEmail}`, "3. Use the secure sign-in link sent to your inbox.", "4. Once you are in your JGO Hire member account, open LinkedIn Optimization Guide.", "", "You can return to the same member login anytime to continue where you left off.", "", "Questions? Just reply to this email.", "", "Best,", "Jen", "JGO Hire"].join("\n"),
        html: `<div style="background:#f4f1ea;padding:32px;font-family:Arial,sans-serif;color:#243128"><div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e2ddd3;border-radius:20px;padding:38px"><p style="margin:0 0 8px;color:#647d5b;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">JGO Hire Member Access</p><h1 style="margin:0 0 18px;font-size:30px">Your LinkedIn Guide is ready.</h1><p>Hi ${escapeHtml(firstName)},</p><p>Your purchase is connected to <strong>${escapeHtml(customerEmail)}</strong>. You can access the LinkedIn Optimization Guide through your JGO Hire member account.</p><div style="margin:26px 0;padding:22px;background:#f5f7f2;border-radius:14px"><strong>How to get in</strong><ol style="padding-left:20px;line-height:1.7"><li>Open the JGO Hire Member Login.</li><li>Enter the same email you used at checkout.</li><li>Use the secure sign-in link sent to your inbox.</li><li>Open <strong>LinkedIn Optimization Guide</strong> from your member dashboard.</li></ol></div><a href="${memberLoginUrl}" style="display:inline-block;background:#647d5b;color:#fff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px">Open Member Login</a><p style="margin-top:28px">You can use this same login anytime to come back and continue where you left off.</p><p>Questions? Reply to this email and I’ll help.</p><p style="margin-top:26px">Best,<br>Jen<br>JGO Hire</p></div></div>`,
      }, { idempotencyKey: `linkedin-guide-welcome/${session.id}` });
      if (welcome.error) throw new Error(`Customer access email failed: ${getErrorMessage(welcome.error)}`);
      customerEmailId = welcome.data?.id ?? null;
    }

    const emailResult = await resend.emails.send({
      from: "JGO Hire Purchases <website@jgohire.com>", to: ["jen@jgohire.com"], subject: session.payment_status === "no_payment_required" ? `New free LinkedIn Guide signup from ${customerName}` : `New LinkedIn Guide purchase from ${customerName}`,
      text: ["New LinkedIn Optimization Guide order", "", `Customer: ${customerName}`, `Email: ${customerEmail || "Not provided"}`, `Phone: ${customerPhone}`, `Product: ${productName}`, `Subtotal: ${subtotal}`, `Discount: ${discountAmount}`, `Promotion: ${discountLabel}`, `Total paid: ${totalPaid}`, `Payment status: ${paymentDescription}`, `Member access: ${entitlementRecorded ? "LinkedIn Guide access recorded" : "Access record pending"}`, `Customer access email: ${customerEmailId ? "Sent" : "Not sent"}`, `Checkout date: ${checkoutDate}`, `Stripe session: ${session.id}`, `Stripe event: ${event.id}`].join("\n"),
      html: `<div style="background:#f4f1ea;padding:32px;font-family:Arial,sans-serif;color:#223028"><div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2ddd3;border-radius:20px;padding:36px"><p style="margin:0 0 8px;color:#637a5b;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">JGO Hire Purchase</p><h1 style="margin:0 0 26px;font-size:28px">New LinkedIn Guide order</h1><p><strong>Customer:</strong> ${escapeHtml(customerName)}</p><p><strong>Email:</strong> ${escapeHtml(customerEmail || "Not provided")}</p><p><strong>Phone:</strong> ${escapeHtml(customerPhone)}</p><p><strong>Product:</strong> ${escapeHtml(productName)}</p><p><strong>Total paid:</strong> ${escapeHtml(totalPaid)}</p><p><strong>Payment status:</strong> ${escapeHtml(paymentDescription)}</p><p><strong>Member access:</strong> ${entitlementRecorded ? "LinkedIn Guide access recorded" : "Access record pending"}</p><p><strong>Customer access email:</strong> ${customerEmailId ? "Sent" : "Not sent"}</p><div style="margin-top:26px;padding:18px;background:#f5f7f2;border-radius:14px"><strong>Stripe Session</strong><p style="word-break:break-all">${escapeHtml(session.id)}</p></div></div></div>`,
    }, { idempotencyKey: `stripe-purchase-notification/${event.id}` });
    if (emailResult.error) throw new Error(`Purchase notification email failed: ${getErrorMessage(emailResult.error)}`);
    return NextResponse.json({ received: true, emailSent: true, customerAccessEmailSent: Boolean(customerEmailId), entitlementRecorded, emailId: emailResult.data?.id ?? null });
  } catch (error) {
    const detail = getErrorMessage(error); console.error("Unable to process Stripe purchase webhook:", detail); return NextResponse.json({ error: "Webhook processing failed.", detail }, { status: 500 });
  }
}
