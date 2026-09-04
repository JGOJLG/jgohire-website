import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const TWENTY_FOUR_HOURS = 60 * 60 * 24;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                maxAge: value ? TWENTY_FOUR_HOURS : 0,
              });
            });
          } catch {
            // Server Components cannot always write cookies directly.
          }
        },
      },
    }
  );
}
