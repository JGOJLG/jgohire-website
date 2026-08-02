import Link from "next/link";

const options = [
  {
    title: "I need a stronger resume.",
    description: "Show your value clearly and make a stronger first impression.",
    href: "#services",
    tone: "sage",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h7l3 3v15H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h5M10 16h5" />
      </svg>
    ),
  },
  {
    title: "I can't get past the first interview.",
    description: "Build stronger answers and interview with more confidence.",
    href: "#services",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="8" y="3" width="8" height="12" rx="4" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
    ),
  },
  {
    title: "I'm applying but not hearing back.",
    description: "Find what is slowing down your search and fix the strategy.",
    href: "#services",
    tone: "sand",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </svg>
    ),
  },
  {
    title: "I don't know my next career move.",
    description: "Get clarity on your goals and create a practical plan forward.",
    href: "#services",
    tone: "mint",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </svg>
    ),
  },
];

export default function HowCanIHelp() {
  return (
    <section className="support-section" id="support">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">Career Support</p>
          <h2>How can I help?</h2>
          <p>Start with the challenge that feels most familiar.</p>
        </div>

        <div className="support-grid">
          {options.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className={`support-card support-card-${option.tone}`}
            >
              <div className="support-icon">{option.icon}</div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <span>Explore support</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
