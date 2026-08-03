import Link from "next/link";

const navigation = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "LinkedIn Guide", href: "/guide" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jennifergordon23/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jgohired",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              JGO HIRE
            </Link>

            <p className="footer-tagline">
              Career Coach + Recruiter helping professionals build stronger
              resumes, interviews, and career strategies.
            </p>

            <Link href="/contact" className="footer-cta">
              Book a Consultation
            </Link>
          </div>

          <div className="footer-column">
            <p className="footer-column-label">Explore</p>

            <nav className="footer-nav" aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <p className="footer-column-label">Connect</p>

            <div className="footer-nav">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ))}

              <a href="mailto:hello@jgohire.com">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} JGO Hire. All rights reserved.</p>

          <p>Career coaching backed by real recruiting experience.</p>
        </div>
      </div>
    </footer>
  );
}