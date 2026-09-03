"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm({ email }: { email: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    if (password !== confirm) {
      setError("The passwords do not match.");
      return;
    }

    const hint = passwordHint.trim();
    if (hint && hint.toLowerCase().includes(password.toLowerCase())) {
      setError("For your security, your password hint cannot contain your actual password.");
      return;
    }

    setBusy(true);
    const s = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=/client-portal`;
    const { data, error: signError } = await s.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: hint ? { password_hint: hint.slice(0, 160) } : {},
      },
    });

    if (signError) {
      const msg = signError.message.toLowerCase();
      setError(msg.includes("already") ? "An account already exists for this email. Use Log in instead." : signError.message);
      setBusy(false);
      return;
    }

    if (data.session) {
      await s.rpc("claim_jgo_client_portal");
      router.replace("/client-portal");
      router.refresh();
      return;
    }

    setSent(true);
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="cp-alert" style={{ background: "#edf2e9", color: "#4d6247" }}>
        Check your email and confirm your account. After confirmation, you will go directly to your JGO Hire Client Portal.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="cp-form">
      <label className="cp-label">
        Email
        <input className="cp-input" value={email} readOnly type="email" />
      </label>
      <label className="cp-label">
        Create password
        <input className="cp-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength={8} required />
      </label>
      <label className="cp-label">
        Confirm password
        <input className="cp-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" minLength={8} required />
      </label>
      <label className="cp-label">
        Password hint <span style={{ fontWeight: 400, opacity: 0.7 }}>(optional)</span>
        <input
          className="cp-input"
          value={passwordHint}
          onChange={(e) => setPasswordHint(e.target.value)}
          type="text"
          maxLength={160}
          autoComplete="off"
          placeholder="Example: the place I went on my favorite trip"
        />
        <span style={{ display: "block", marginTop: 6, fontSize: 11, lineHeight: 1.45, opacity: 0.72 }}>
          Add a reminder only you will understand. Do not enter your actual password.
        </span>
      </label>
      {error ? <div className="cp-alert">{error}</div> : null}
      <button className="cp-button" disabled={busy}>{busy ? "Creating account..." : "Create my portal account"}</button>
    </form>
  );
}
