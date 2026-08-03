import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get("jgo_client_access")?.value === "granted";

  if (hasAccess) {
    return NextResponse.next();
  }

  const unlockUrl = new URL("/client-access", request.url);
  unlockUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/coreframework/:path*", "/interviewready/:path*"],
};
