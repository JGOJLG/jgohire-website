import { NextRequest, NextResponse } from "next/server";

const allowedDestinations = ["/coreframework", "/interviewready"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";
    const destination =
      typeof body.destination === "string" ? body.destination : "";

    if (!allowedDestinations.includes(destination)) {
      return NextResponse.json(
        { error: "This resource is not available." },
        { status: 400 }
      );
    }

    const expectedPassword =
      process.env.CLIENT_RESOURCES_PASSWORD?.trim() || "mindset";

    if (password.trim() !== expectedPassword) {
      return NextResponse.json(
        { error: "That password is not correct." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "jgo_client_access",
      value: "granted",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to unlock this resource." },
      { status: 500 }
    );
  }
}
