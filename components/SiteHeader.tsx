"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-shell header-inner">
          <Link href="/" className="brand">
            <span className="brand-name">JGO HIRE</span>
            <span className="brand-tagline">Career Coach + Recruiter</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/about">About</Link>
            <Link href="/#services">Services</Link>
            <Link href="/freesurvivalguide">Free Survival Guide</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/guide">LinkedIn Guide</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link href="/contact" className="button button-primary header-button">
            Book a Consultation
          </Link>

          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
