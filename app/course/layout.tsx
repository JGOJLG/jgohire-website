import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function CourseLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/course");

  const { data: access } = await supabase
    .from("member_entitlements")
    .select("id")
    .eq("user_id", user.id)
    .eq("entitlement", "linkedin_guide")
    .maybeSingle();

  if (!access) redirect("/portal");
  return children;
}
