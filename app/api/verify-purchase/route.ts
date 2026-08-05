import { NextRequest, NextResponse } from "next/server";

type StripeCheckoutSession = {
  id?: string;
  customer_details?: {
    email?: string | null;
  } | null;
  customer_email?: string | null;
  payment_status?: "paid" | "unpaid" | "no_payment_required";
  status?: "open" | "complete" | "expired";
};

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json(
      {
        valid: false,
        error: "Missing or invalid checkout session.",
      },
      { status: 400 }
    );
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error("Missing STRIPE_SECRET_KEY.");
    return NextResponse.json(
      {
        valid: false,
        error: "Purchase verification is not configured yet.",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(
        sessionId
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
        cache: "no-store",
      }
    );

    const session = (await response.json()) as StripeCheckoutSession & {
      error?: {
        message?: string;
      };
    };

    if (!response.ok) {
      console.error("Stripe session lookup failed:", session.error);
      return NextResponse.json(
        {
          valid: false,
          error:
            session.error?.message ||
            "We could not verify this checkout session.",
        },
        { status: response.status }
      );
    }

    const purchaseComplete =
      session.status === "complete" &&
      (session.payment_status === "paid" ||
        session.payment_status === "no_payment_required");

    const email =
      session.customer_details?.email || session.customer_email || null;

    if (!purchaseComplete || !email) {
      return NextResponse.json(
        {
          valid: false,
          error:
            "This purchase is not complete or does not include a customer email.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      email,
    });
  } catch (error) {
    console.error("Unable to verify Stripe purchase:", error);

    return NextResponse.json(
      {
        valid: false,
        error: "We could not verify this purchase right now.",
      },
      { status: 500 }
    );
  }
}
