import { NextResponse } from "next/server";

const allowedDestinations = ["/coreframework", "/interviewready"];

export async function POST(request: Request) {
  try {
    const { password, destination } = await request.json();
    const correctPassword = process.env.CLIENT_RESOURCES_PASSWORD || "mindset";

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: "That password is not correct." },
        { status: 401 }
      );
    }

    const redirectTo = allowedDestinations.includes(destination)
      ? destination
      : "/coreframework";

    const response = NextResponse.json({ redirectTo });

    response.cookies.set("jgo_client_access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}
