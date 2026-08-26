"use client";

import Link from "next/link";
import { useEffect } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Free Survival Guide", href: "/freesurvivalguide" },
  { label: "Resources", href: "/resources" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "LinkedIn Guide", href: "/guide" },
  { label: "Contact", href: "/contact" },
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

      <aside
        className="mobile-menu-panel"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-top">
          <Link
            href="/"
            className="mobile-menu-brand-wrap"
            onClick={onClose}
          >
            <span className="mobile-menu-brand">
              JGO HIRE
            </span>

            <span className="mobile-menu-subtitle">
              Career Coach + Recruiter
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-actions">
          <Link
            href="/client-portal/login"
            className="button button-primary mobile-menu-cta"
            onClick={onClose}
          >
            Member Login
          </Link>

          <Link
            href="/contact"
            className="mobile-menu-member-link"
            onClick={onClose}
          >
            Book a Consultation
          </Link>
        </div>

        <p className="mobile-menu-note">
          Recruiter-backed strategy for resumes, LinkedIn,
          interviews, and career clarity.
        </p>
      </aside>
    </div>
  );
}