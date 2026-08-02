import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="site-shell">
        <div className="final-cta-card">
          <p className="eyebrow">Ready When You Are</p>
          <h2>Let’s build your next move.</h2>
          <p>Start with a consultation and leave with a clearer strategy.</p>
          <Link href="/contact" className="button button-light">
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}