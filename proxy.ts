import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const clientResourceRoutes = ["/coreframework", "/interviewready"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isClientResource = clientResourceRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isClientResource) {
    const hasClientAccess =
      request.cookies.get("jgo_client_access")?.value === "granted";

    if (!hasClientAccess) {
      const resourcesUrl = request.nextUrl.clone();
      resourcesUrl.pathname = "/resources";
      resourcesUrl.search = "";
      resourcesUrl.searchParams.set("unlock", pathname);
      resourcesUrl.hash = "client-exclusive";

      return NextResponse.redirect(resourcesUrl);
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
