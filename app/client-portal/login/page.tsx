import Link from "next/link";
import LoginForm from "./LoginForm";
import "../portal.css";
import "./login.css";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;

  return (
    <main className="cp-login">
      <div className="cp-auth-card">
        <p className="cp-eyebrow">JGO Hire</p>
        <h1>Log in to your account.</h1>
        <p style={{ marginBottom: 22 }}>
          One login gives you access to everything included with your JGO Hire account.
        </p>

        <LoginForm email={email} />

        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: "1px solid #e6e1d9",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "#68746b" }}>
            New here? Use the account setup link from your JGO Hire email to create your password.
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 12 }}>
            Need more help? <Link className="cp-link" href="/account-help">Account help</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
