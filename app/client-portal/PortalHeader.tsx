"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = new Set([
  "/client-portal/login",
  "/client-portal/signup",
]);

export default function PortalHeader() {
  const pathname = usePathname();

  if (AUTH_ROUTES.has(pathname)) {
    return null;
  }

  return (
    <header className="cp-header">
      <div className="cp-shell cp-header-inner">
        <Link href="/client-portal" className="cp-brand">
          <strong>JGO HIRE</strong>
          <span>Client Portal</span>
        </Link>
        <nav className="cp-nav" aria-label="Client portal navigation">
          <Link href="/client-portal">Home</Link>
          <Link href="/client-portal/jobs">Job Tracker</Link>
          <Link href="/client-portal/files">Documents</Link>
          <Link href="/client-portal/resources">Resources</Link>
          <form action="/auth/signout" method="post" style={{ display: "contents" }}>
            <button
              type="submit"
              aria-label="Log out of client portal"
              style={{
                border: "1px solid #d7dfd2",
                background: "rgba(255,255,255,.78)",
                color: "#4d6247",
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: "999px",
                font: "inherit",
                fontSize: "13px",
                fontWeight: 700,
                lineHeight: 1,
                boxShadow: "0 5px 16px rgba(34,48,40,.06)",
              }}
            >
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
