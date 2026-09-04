"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({ email = "" }: { email?: string }) {
  const router = useRouter();
  const [mail, setMail] = useState(email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const normalizedEmail = mail.trim().toLowerCase();
    const s = createClient();
    const { error: signError } = await s.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (signError) {
      setError("That password did not work. Your account may still be active. Try again or reset your password below.");
      setBusy(false);
      return;
    }

    await Promise.all([
      s.rpc("claim_jgo_client_portal"),
      s.rpc("claim_member_entitlements"),
    ]);
    router.replace("/client-portal");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="cp-form">
      <label className="cp-label">
        Email
        <input
          className="cp-input"
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          autoComplete="email"
          autoFocus
        />
      </label>

      <label className="cp-label">
        Password
        <div style={{ position: "relative" }}>
          <input
            className="cp-input"
            style={{ paddingRight: 72 }}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              border: 0,
              background: "transparent",
              color: "#526052",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              padding: "6px 8px",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      {error ? (
        <div className="cp-alert" role="alert">
          <strong style={{ display: "block", marginBottom: 6 }}>Couldn’t log you in.</strong>
          <span>{error}</span>
          <div style={{ marginTop: 10 }}>
            <Link className="cp-link" href={`/forgot-password${mail ? `?email=${encodeURIComponent(mail.trim().toLowerCase())}` : ""}`}>
              Reset password
            </Link>
          </div>
        </div>
      ) : null}

      <button className="cp-button" disabled={busy}>
        {busy ? "Logging in..." : "Log in"}
      </button>

      <Link
        className="cp-link"
        style={{ textAlign: "center", fontSize: 12, marginTop: 2 }}
        href={`/forgot-password${mail ? `?email=${encodeURIComponent(mail.trim().toLowerCase())}` : ""}`}
      >
        Forgot your password?
      </Link>
    </form>
  );
}
