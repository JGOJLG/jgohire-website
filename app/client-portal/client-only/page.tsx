import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
      <div className="cp-shell" style={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 160px)" }}>
        <section
          style={{
            width: "min(100%, 620px)",
            background: "#fff",
            border: "1px solid #dfdbd3",
            borderRadius: 24,
            padding: "clamp(24px, 5vw, 42px)",
            boxShadow: "0 18px 48px rgba(34,48,40,.08)",
            textAlign: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 54,
              height: 54,
              margin: "0 auto 18px",
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              background: "#edf2e9",
              color: "#4d6247",
              fontWeight: 900,
              fontSize: 14,
            }}
          >
            JGO
          </div>
          <p className="cp-eyebrow">Client Access Only</p>
          <h1 style={{ margin: "10px 0 14px", fontFamily: "Georgia, serif", fontSize: "clamp(32px, 6vw, 46px)", fontWeight: 500, color: "#223028" }}>
            Want access to coaching tools?
          </h1>
          <p style={{ margin: "0 auto", maxWidth: 500, color: "#68746b", lineHeight: 1.7, fontSize: 14 }}>
            The Job Tracker, documents, and coaching resources are included with active JGO Hire coaching services. Your current account and any course access stay exactly as they are.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a className="cp-button" href="https://jgohire.com/contact">Contact Jen</a>
            <Link className="cp-button secondary" href="/client-portal">Back to My Account</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
