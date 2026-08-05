import { NextResponse } from "next/server";

const STRIPE_CHECKOUT_URL =
  "https://buy.stripe.com/dRmeVe5R3gRi6ny1Q6dwc01";

export async function POST() {
  return NextResponse.redirect(STRIPE_CHECKOUT_URL, 303);
}

export async function GET() {
  return NextResponse.redirect(STRIPE_CHECKOUT_URL, 307);
}