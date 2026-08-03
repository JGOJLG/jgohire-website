import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname === "/coreframework" ||
    pathname.startsWith("/coreframework/") ||
    pathname === "/interviewready" ||
    pathname.startsWith("/interviewready/");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasClientAccess =
    request.cookies.get("jgo_client_access")?.value === "granted";

  if (hasClientAccess) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();

  loginUrl.pathname = "/client-access";
  loginUrl.searchParams.set("redirect", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/coreframework/:path*", "/interviewready/:path*"],
};