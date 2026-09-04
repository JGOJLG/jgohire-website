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
          <Link href="/auth/signout">Log out</Link>
        </nav>
      </div>
    </header>
  );
}
