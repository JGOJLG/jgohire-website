"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link href="/" className="brand">
          <span className="brand-name">JGO HIRE</span>
          <span className="brand-tagline">Career Coach + Recruiter</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="#support">Support</Link>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        <Link href="/contact" className="button button-primary header-button">
          Book a Consultation
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <div className="mobile-nav">
          <div className="site-shell mobile-nav-inner">
            <Link href="#support" onClick={() => setOpen(false)}>Support</Link>
            <Link href="#about" onClick={() => setOpen(false)}>About</Link>
            <Link href="#services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Book a Consultation</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
