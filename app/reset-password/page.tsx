"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "../login/login.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [passwordHint, setPasswordHint] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      const hint = data.user?.user_metadata?.password_hint;
      if (typeof hint === "string") setPasswordHint(hint.trim());
    });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password.length < 8) { setStatus("error"); setMessage("Your password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setStatus("error"); setMessage("The passwords do not match."); return; }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setStatus("error"); setMessage("This reset link may have expired. Please request a new one."); return; }

    await Promise.all([supabase.rpc("claim_jgo_client_portal"), supabase.rpc("claim_member_entitlements")]);
    setStatus("success");
    setMessage("Password updated. Taking you to your member portal...");
    setTimeout(() => { router.push("/client-portal"); router.refresh(); }, 800);
  }

  return (
    <main className="course-login-page">
      <header className="course-login-header">
        <Link href="/" className="course-login-logo"><span>JGO HIRE</span><small>Career Coach + Recruiter</small></Link>
        <Link href="/login" className="course-login-back">Back to Login</Link>
      </header>
      <section className="course-login-shell course-login-shell-single">
        <div className="course-login-intro">
          <div className="course-login-badge"><span aria-hidden="true">✦</span> Secure Reset</div>
          <p className="course-login-eyebrow">Member Access</p>
          <h1 className="course-login-single-heading">Choose a new password.</h1>
          <p className="course-login-description">Create a secure password. You will be taken directly to your member portal after it is saved.</p>
        </div>
        <div className="course-login-card-wrap">
          <div className="course-login-glow" aria-hidden="true" />
          <div className="course-login-card">
            <div className="course-login-card-icon" aria-hidden="true">JGO</div><p className="course-login-card-label">New Password</p><h2>Update access</h2>
            {passwordHint ? (
              <div style={{ marginBottom: 18, padding: "13px 15px", borderRadius: 14, background: "#f3f5f0", border: "1px solid #dfe5da" }}>
                <strong style={{ display: "block", fontSize: 12, color: "#3e5041", marginBottom: 5 }}>Your password hint</strong>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: "#68746b" }}>{passwordHint}</span>
              </div>
            ) : null}
            <form className="course-login-form" onSubmit={handleSubmit}>
              <label htmlFor="reset-password"><span>New password</span><input id="reset-password" type="password" name="password" minLength={8} autoComplete="new-password" placeholder="At least 8 characters" required /></label>
              <label htmlFor="reset-confirm-password"><span>Confirm new password</span><input id="reset-confirm-password" type="password" name="confirmPassword" minLength={8} autoComplete="new-password" placeholder="Enter it again" required /></label>
              {message ? <p className={status === "success" ? "course-login-success" : "course-login-error"}>{message}</p> : null}
              <button type="submit" disabled={status === "saving" || status === "success"}>{status === "saving" ? "Updating..." : status === "success" ? "Updated" : "Save New Password"}</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
