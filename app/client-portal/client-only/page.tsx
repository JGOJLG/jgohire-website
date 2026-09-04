import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/client-portal/login");

  await supabase.rpc("claim_jgo_client_portal");

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("portal_user_id", user.id)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (client) redirect("/client-portal");

  return (
    <main className="cp-main">
      <div className="cp-shell">
        <section className="cp-access-only-card">
          <div className="cp-access-lock" aria-hidden="true">JGO</div>
          <p className="cp-eyebrow">Client Access Only</p>
          <h1>Ready for more support?</h1>
          <p>
            The Job Tracker, client documents, coaching resources, and full JGO client workspace are available to active JGO Hire coaching clients.
          </p>
          <p>
            To become a client, visit the JGO Hire contact page to set up your first session.
          </p>
          <div className="cp-access-actions">
            <a className="cp-button" href="https://jgohire.com/contact">Contact Jen</a>
            <Link className="cp-button secondary" href="/client-portal">Back to My Account</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
