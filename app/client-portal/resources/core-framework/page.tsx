import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CoreFrameworkPage from "@/app/coreframework/page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect("/client-portal/login");

  await s.rpc("claim_jgo_client_portal");
  const { data: client } = await s
    .from("clients")
    .select("id")
    .eq("portal_user_id", user.id)
    .maybeSingle();

  if (!client) redirect("/client-portal/client-only");

  return (
    <main className="cp-resource-wrap">
      <div className="cp-resource-toolbar">
        <Link href="/client-portal" className="cp-button secondary">← Portal Home</Link>
        <Link href="/client-portal/resources" className="cp-button secondary">All Resources</Link>
      </div>
      <div className="cp-resource-embedded"><CoreFrameworkPage /></div>
    </main>
  );
}
