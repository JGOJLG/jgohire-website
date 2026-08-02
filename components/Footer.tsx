import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "LinkedIn Guide", href: "#linkedin-guide" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-content">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            JGO HIRE
          </Link>

          <p className="footer-subtitle">Career Coach + Recruiter</p>

          <p className="footer-description">
            Recruiter-backed career coaching, resume support, and interview
            strategy designed to help you move forward with confidence.
          </p>
        </div>

        <nav className="footer-main-nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-social-section">
          <p className="footer-social-heading">Follow @jgohired</p>

          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/jgohired/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow JGO Hire on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" className="social-dot" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/jgohired/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow JGO Hire on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@jgohired"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow JGO Hire on TikTok"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 4c.6 2.3 1.9 3.7 4 4.2v3.5c-1.6-.1-3-.6-4-1.4v5.2a5.5 5.5 0 1 1-5.5-5.5c.5 0 1 .1 1.5.2v3.6a2.2 2.2 0 1 0 .5 1.4V4H15Z" />
              </svg>
            </a>

            <a
              href="https://www.youtube.com/@jgohired"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow JGO Hire on YouTube"
              title="YouTube"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2.5" y="6" width="19" height="12" rx="4" />
                <path d="m10 9 5 3-5 3Z" className="social-play" />
              </svg>
            </a>

            <a
              href="https://jgohire.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read JGO Hire on Substack"
              title="Substack"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16M4 9h16M5.5 13h13v7l-6.5-3.6L5.5 20Z" />
              </svg>
            </a>
          </div>

          <Link href="/contact" className="footer-cta">
            Book a Consultation
          </Link>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} JGO Hire. All rights reserved.</p>

          <p>Career strategy backed by real recruiting experience.</p>
        </div>
      </div>
    </footer>
  );
}