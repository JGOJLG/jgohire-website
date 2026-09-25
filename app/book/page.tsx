import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function BookPage() {
  return (
    <main>
      <SiteHeader />
      <section className="book-page">
        <div className="site-shell book-page-grid">
          <div className="book-page-copy">
            <p className="eyebrow">Coming Soon</p>
            <h1>Found. Noticed. Hired.</h1>
            <p className="book-page-subtitle">A Recruiter’s Guide to a Stronger LinkedIn® Profile</p>
            <h2>Someone searched for you on LinkedIn today. You didn’t show up.</h2>
            <p>Recruiters search LinkedIn differently than job seekers use it. This step-by-step guide gives you an inside look at how recruiters search, what they notice, and how to build a profile that works.</p>
            <p className="book-page-amazon">Coming soon exclusively on Amazon.</p>
            <Link href="/" className="button button-primary">Explore JGO Hire</Link>
          </div>
          <div className="book-feature-art book-page-art" aria-label="Found. Noticed. Hired. book preview">
            <img className="book-cover-image" src="/found-noticed-hired.webp" alt="Found. Noticed. Hired. by Jennifer Gordon" />
          </div>
        </div>
      </section>
    </main>
  );
}
