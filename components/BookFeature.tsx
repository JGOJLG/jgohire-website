import Link from "next/link";

export default function BookFeature() {
  return (
    <section className="book-feature" aria-labelledby="book-feature-title">
      <div className="site-shell book-feature-inner">
        <div className="book-feature-copy">
          <div className="book-feature-topline">
            <span className="book-feature-kicker">A new resource from JGO Hire</span>
            <span className="book-feature-status">Coming Soon</span>
          </div>
          <h2 id="book-feature-title">Found. Noticed. Hired.</h2>
          <p className="book-feature-subtitle">A Recruiter’s Guide to a Stronger LinkedIn® Profile</p>
          <p className="book-feature-hook">Someone searched for you on LinkedIn today. <strong>You didn’t show up.</strong></p>
          <p className="book-feature-body">Learn how recruiters search for candidates, what they notice, and how to build a profile designed to get found.</p>
          <div className="book-feature-actions">
            <Link href="/book" className="button button-primary">Explore the Book</Link>
            <span>Coming soon exclusively on Amazon</span>
          </div>
        </div>
        <div className="book-feature-art" aria-label="Found. Noticed. Hired. book preview">
          <div className="book-cover">
            <small>A RECRUITER’S GUIDE TO A<br/>STRONGER LinkedIn® PROFILE</small>
            <div className="book-cover-title">FOUND.<br/>NOTICED.<br/>HIRED.</div>
            <i />
            <b>JENNIFER GORDON</b>
            <span>RECRUITER AND CAREER COACH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
