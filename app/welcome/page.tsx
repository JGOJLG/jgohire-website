import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import "./welcome.css";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.3A4.7 4.7 0 1 1 12 16.7a4.7 4.7 0 0 1 0-9.4Zm0 2A2.7 2.7 0 1 0 12 14.7a2.7 2.7 0 0 0 0-5.4Zm5.1-2.45a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.7 2c.3 2.6 1.8 4.2 4.3 4.4v3.2c-1.5.1-2.8-.3-4.2-1.1v6.1c0 5.2-5.6 7.2-9.1 4.2-3.3-2.8-2.1-8.3 2.1-9.1.8-.2 1.5-.1 2.2.1v3.4c-.3-.1-.6-.2-.9-.2-2.1-.2-3.5 2.1-2.2 3.7 1.3 1.6 4.3.9 4.3-1.8V2h3.5Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.8v1.7c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.4.2 6.4.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.7c0-1.8-.2-3.6-.2-3.6ZM10.1 14.6V8.4l5.8 3.1-5.8 3.1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.3 8.5V6.7c0-.8.5-1 1-1h2.5V2.2S16.6 2 14.9 2c-3.5 0-5.4 2.1-5.4 5.8v.7H6v3.9h3.5V22h4.2v-9.6h3.4l.6-3.9h-4.1Z" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h14v2H5V3Zm0 4h14v2H5V7Zm0 4h14v10l-7-4-7 4V11Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 10h4v12H3V10Zm7 0h3.8v1.6h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V22h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V22h-4V10Z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", detail: "@jgohired", href: "https://www.instagram.com/jgohired", icon: <InstagramIcon /> },
  { label: "TikTok", detail: "@jgohired", href: "https://www.tiktok.com/@jgohired", icon: <TikTokIcon /> },
  { label: "YouTube", detail: "@jgohired", href: "https://www.youtube.com/@jgohired", icon: <YouTubeIcon /> },
  { label: "Facebook", detail: "@jgohired", href: "https://www.facebook.com/jgohired", icon: <FacebookIcon /> },
  { label: "Substack", detail: "@jgohired", href: "https://substack.com/@jgohired?utm_source=user-menu", icon: <SubstackIcon /> },
  { label: "LinkedIn", detail: "JGO Hire", href: "https://www.linkedin.com/company/jgohire/", icon: <LinkedInIcon /> },
];

export default function WelcomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="jgo-welcome-page">
        <div className="jgo-orb orb-one" />
        <div className="jgo-orb orb-two" />
        <div className="jgo-orb orb-three" />

        <div className="jgo-welcome-wrap">
          <div className="jgo-pill"><span className="jgo-spark">✦</span> JGO Hire</div>

          <h1>Welcome!</h1>
          <div className="subhead">Happy you’re here.</div>

          <div className="jgo-path-card">
            <h2>Choose your next step</h2>
            <p>Not sure where to start? Pick what feels most helpful right now.</p>

            <Link className="jgo-button jgo-primary" href="/resources">
              <strong>Free Resources</strong>
              <span className="jgo-arrow">→</span>
            </Link>

            <Link className="jgo-button" href="/freesurvivalguide">
              <strong>Free Job Seekers Survival Guide</strong>
              <span className="jgo-arrow">→</span>
            </Link>

            <Link className="jgo-button" href="/">
              <strong>Explore JGO Hire</strong>
              <span className="jgo-arrow">→</span>
            </Link>
          </div>

          <div className="jgo-section-card">
            <h2>Let’s stay connected</h2>
            <p>Follow along for resume tips, interview strategy, job search reminders, and real recruiter insight.</p>

            <div className="jgo-social-grid">
              {socials.map((social) => (
                <a key={social.label} className="jgo-social" href={social.href} target="_blank" rel="noopener noreferrer">
                  <div className="jgo-icon">{social.icon}</div>
                  {social.label}
                  <small>{social.detail}</small>
                </a>
              ))}
            </div>

            <div className="jgo-mini-note">
              <strong>✦</strong>
              <span>Career tips, interview prep, job search strategy, and the reminders you need before you hit submit.</span>
            </div>
          </div>

          <div className="jgo-section-card">
            <h2>Connect with Jen</h2>

            <a className="jgo-button" href="https://www.linkedin.com/in/jennifergordon23/" target="_blank" rel="noopener noreferrer">
              <strong>Connect with Jen</strong>
              <span className="jgo-arrow">→</span>
            </a>
          </div>

          <p className="jgo-footer-note">
            JGO Hire helps job seekers show up stronger, communicate with confidence, and navigate the job search with more clarity.
          </p>
        </div>
      </section>
    </main>
  );
}
