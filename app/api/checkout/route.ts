import { NextResponse } from "next/server";

const STRIPE_CHECKOUT_URL =
  "https://buy.stripe.com/00w14o7ZbasUh2cgL0dwc02";

export async function POST() {
  return NextResponse.redirect(STRIPE_CHECKOUT_URL, 303);
}

export async function GET() {
  return NextResponse.redirect(STRIPE_CHECKOUT_URL, 307);
}