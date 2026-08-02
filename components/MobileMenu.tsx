"use client";

import Link from "next/link";
import { useEffect } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const navigation = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Results", href: "#results" },
];

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="mobile-menu-layer">
      <button
        type="button"
        className="mobile-menu-backdrop"
        onClick={onClose}
        aria-label="Close menu"
      />

      <aside className="mobile-menu-panel" aria-label="Mobile navigation">
        <div className="mobile-menu-top">
          <div>
            <p className="mobile-menu-brand">JGO HIRE</p>
            <p className="mobile-menu-subtitle">Career Coach + Recruiter</p>
          </div>

          <button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <span>{item.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="button button-primary mobile-menu-cta"
          onClick={onClose}
        >
          Book a Consultation
        </Link>

        <p className="mobile-menu-note">
          Recruiter-backed strategy for resumes, LinkedIn, interviews, and
          career clarity.
        </p>
      </aside>
    </div>
  );
}
