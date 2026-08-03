"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ClientResourceUnlockProps = {
  resourceTitle: string;
  destination: string;
};

export default function ClientResourceUnlock({
  resourceTitle,
  destination,
}: ClientResourceUnlockProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const requestedGuide = searchParams.get("unlock");

    if (requestedGuide === destination) {
      setIsOpen(true);
    }
  }, [destination, searchParams]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  function openModal() {
    setPassword("");
    setError("");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setPassword("");
    setError("");

    if (searchParams.get("unlock")) {
      router.replace("/resources#client-exclusive");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      setError("Enter the client password.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/client-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          destination,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "That password is not correct.");
        return;
      }

      router.push(destination);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="button button-primary"
        onClick={openModal}
      >
        Unlock the Guide
      </button>

      {isOpen && (
        <div
          className="client-unlock-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className="client-unlock-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`unlock-${destination.replaceAll("/", "-")}`}
          >
            <button
              type="button"
              className="client-unlock-close"
              aria-label="Close password window"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="client-unlock-lock" aria-hidden="true">
              <span>JGO</span>
            </div>

            <p className="client-unlock-eyebrow">Client Exclusive</p>

            <h2 id={`unlock-${destination.replaceAll("/", "-")}`}>
              Unlock {resourceTitle}
            </h2>

            <p className="client-unlock-copy">
              Enter the password provided by JGO Hire to access this client
              resource.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor={`password-${destination.replaceAll("/", "-")}`}>
                Client password
              </label>

              <input
                ref={inputRef}
                id={`password-${destination.replaceAll("/", "-")}`}
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                autoComplete="current-password"
              />

              {error && (
                <p className="client-unlock-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="client-unlock-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Unlocking..." : "Unlock Resource"}
              </button>
            </form>

            <p className="client-unlock-help">
              Need access?{" "}
              <a href="/contact">Contact JGO Hire</a>
            </p>
          </section>

          <style>{`
            .client-unlock-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: grid;
              place-items: center;
              padding: 20px;
              background: rgba(15, 15, 13, 0.56);
              backdrop-filter: blur(14px);
              -webkit-backdrop-filter: blur(14px);
              animation: clientOverlayIn 180ms ease-out;
            }

            .client-unlock-modal {
              position: relative;
              width: min(100%, 470px);
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, 0.66);
              border-radius: 32px;
              padding: 42px;
              background:
                radial-gradient(circle at top right, rgba(184, 199, 176, 0.38), transparent 38%),
                rgba(255, 250, 244, 0.96);
              box-shadow: 0 32px 100px rgba(15, 15, 13, 0.28);
              animation: clientModalIn 220ms ease-out;
            }

            .client-unlock-close {
              position: absolute;
              top: 16px;
              right: 18px;
              width: 38px;
              height: 38px;
              border: 0;
              border-radius: 999px;
              background: rgba(15, 15, 13, 0.07);
              color: #0f0f0d;
              font-size: 26px;
              line-height: 1;
              cursor: pointer;
            }

            .client-unlock-lock {
              width: 64px;
              height: 64px;
              display: grid;
              place-items: center;
              margin-bottom: 24px;
              border-radius: 20px;
              background: #0f0f0d;
              color: white;
              box-shadow: 0 14px 35px rgba(15, 15, 13, 0.18);
            }

            .client-unlock-lock span {
              font-size: 17px;
              font-weight: 900;
              letter-spacing: -0.04em;
            }

            .client-unlock-eyebrow {
              margin: 0 0 10px;
              color: #7f9277;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.16em;
              text-transform: uppercase;
            }

            .client-unlock-modal h2 {
              margin: 0;
              color: #0f0f0d;
              font-size: clamp(30px, 7vw, 43px);
              line-height: 0.98;
              letter-spacing: -0.05em;
            }

            .client-unlock-copy {
              margin: 16px 0 26px;
              color: #6f6a63;
              font-size: 16px;
              line-height: 1.6;
            }

            .client-unlock-modal label {
              display: block;
              margin-bottom: 9px;
              color: #2a2723;
              font-size: 13px;
              font-weight: 800;
            }

            .client-unlock-modal input {
              width: 100%;
              height: 54px;
              border: 1px solid rgba(15, 15, 13, 0.16);
              border-radius: 16px;
              padding: 0 16px;
              outline: none;
              background: rgba(255, 255, 255, 0.8);
              color: #0f0f0d;
              font: inherit;
              transition: border-color 160ms ease, box-shadow 160ms ease;
            }

            .client-unlock-modal input:focus {
              border-color: #7f9277;
              box-shadow: 0 0 0 4px rgba(127, 146, 119, 0.16);
            }

            .client-unlock-error {
              margin: 10px 0 0;
              color: #9a3636;
              font-size: 13px;
              font-weight: 700;
            }

            .client-unlock-submit {
              width: 100%;
              min-height: 54px;
              margin-top: 16px;
              border: 0;
              border-radius: 999px;
              background: #0f0f0d;
              color: #fff;
              font: inherit;
              font-weight: 800;
              cursor: pointer;
              transition: transform 160ms ease, opacity 160ms ease;
            }

            .client-unlock-submit:hover:not(:disabled) {
              transform: translateY(-1px);
            }

            .client-unlock-submit:disabled {
              cursor: wait;
              opacity: 0.7;
            }

            .client-unlock-help {
              margin: 18px 0 0;
              color: #6f6a63;
              font-size: 13px;
              text-align: center;
            }

            .client-unlock-help a {
              color: #0f0f0d;
              font-weight: 800;
            }

            @keyframes clientOverlayIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes clientModalIn {
              from {
                opacity: 0;
                transform: translateY(14px) scale(0.98);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @media (max-width: 560px) {
              .client-unlock-modal {
                border-radius: 26px;
                padding: 34px 24px 28px;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
