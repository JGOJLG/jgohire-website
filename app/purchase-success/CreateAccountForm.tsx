"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type VerifyResponse = {
  valid?: boolean;
  email?: string | null;
  error?: string;
};

export default function CreateAccountForm({
  sessionId,
}: {
  sessionId: string;
}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [purchaseError, setPurchaseError] = useState("");
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function verifyPurchase() {
      if (!sessionId) {
        setPurchaseError(
          "We could not find your checkout confirmation. Please use the link shown after payment or contact JGO Hire for help."
        );
        setCheckingPurchase(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/verify-purchase?session_id=${encodeURIComponent(sessionId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result = (await response.json()) as VerifyResponse;

        if (!response.ok || !result.valid || !result.email) {
          setPurchaseError(
            result.error ||
              "We could not verify this purchase. Please contact JGO Hire for help."
          );
          setCheckingPurchase(false);
          return;
        }

        setVerifiedEmail(result.email);
        setEmail(result.email);
      } catch {
        setPurchaseError(
          "We could not verify this purchase right now. Please try again."
        );
      } finally {
        setCheckingPurchase(false);
      }
    }

    verifyPurchase();
  }, [sessionId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError("");
    setMessage("");

    if (!verifiedEmail) {
      setFormError("Your purchase must be verified before creating an account.");
      return;
    }

    if (email.trim().toLowerCase() !== verifiedEmail.toLowerCase()) {
      setFormError(
        "Please use the same email address that was used during checkout."
      );
      return;
    }

    if (password.length < 8) {
      setFormError("Your password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("The passwords do not match.");
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: verifiedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/course`,
      },
    });

    if (error) {
      const normalizedMessage = error.message.toLowerCase();

      if (
        normalizedMessage.includes("already registered") ||
        normalizedMessage.includes("already exists")
      ) {
        setFormError(
          "An account already exists for this email. Please use Member Login instead."
        );
      } else {
        setFormError(error.message);
      }

      setSaving(false);
      return;
    }

    if (data.session) {
      router.push("/course");
      router.refresh();
      return;
    }

    setMessage(
      "Account created. Check your email and click the confirmation link to access your course."
    );
    setSaving(false);
  }

  return (
    <section className="purchase-account-card">
      <div className="purchase-account-heading">
        <span>Member Access</span>
        <h2>Create your account</h2>
        <p>Use the checkout email shown below and choose your password.</p>
      </div>

      {checkingPurchase ? (
        <div className="purchase-account-status">
          Verifying your purchase...
        </div>
      ) : purchaseError ? (
        <div className="purchase-account-error">
          <strong>Purchase verification needed</strong>
          <p>{purchaseError}</p>
          <a href="mailto:jen@jgohire.com">Contact JGO Hire</a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="purchase-account-form">
          <label>
            <span>Email address</span>
            <input
              type="email"
              value={email}
              readOnly
              autoComplete="email"
            />
          </label>

          <label>
            <span>Create password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              required
            />
          </label>

          <label>
            <span>Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              autoComplete="new-password"
              placeholder="Enter your password again"
              required
            />
          </label>

          {formError ? (
            <p className="purchase-account-form-error">{formError}</p>
          ) : null}

          {message ? (
            <p className="purchase-account-form-message">{message}</p>
          ) : null}

          <button type="submit" disabled={saving}>
            {saving ? "Creating Account..." : "Create Account & Access Course"}
          </button>

          <p className="purchase-account-help">
            Already have an account?{" "}
            <a href="/login?redirect=/course">Member Login</a>
          </p>
        </form>
      )}
    </section>
  );
}
