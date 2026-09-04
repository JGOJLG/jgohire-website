import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const TWENTY_FOUR_HOURS = 60 * 60 * 24;

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, {
              ...options,
              maxAge: value ? TWENTY_FOUR_HOURS : 0,
            });
          });
        },
      },
    }
  );

  await supabase.auth.getClaims();

  return response;
}
