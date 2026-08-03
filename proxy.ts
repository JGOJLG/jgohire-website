import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/coreframework", "/interviewready"];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasClientAccess =
    request.cookies.get("jgo_client_access")?.value === "granted";

  if (hasClientAccess) {
    return NextResponse.next();
  }

  const resourcesUrl = request.nextUrl.clone();
  resourcesUrl.pathname = "/resources";
  resourcesUrl.search = "";
  resourcesUrl.searchParams.set("unlock", pathname);
  resourcesUrl.hash = "client-exclusive";

  return NextResponse.redirect(resourcesUrl);
}

export const config = {
  matcher: ["/coreframework/:path*", "/interviewready/:path*"],
};
