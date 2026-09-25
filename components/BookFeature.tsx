import Link from "next/link";

export function BookCover() {
  return <div className="book-mockup" role="img" aria-label="Found. Noticed. Hired. paperback book cover by Jennifer Gordon">
    <div className="book-cover">
      <span className="book-cover-kicker">A RECRUITER’S GUIDE TO A<br/>STRONGER LinkedIn® PROFILE</span>
      <strong>FOUND.<br/>NOTICED.<br/>HIRED.</strong>
      <span className="book-cover-rule" />
      <span className="book-cover-author">JENNIFER GORDON</span>
      <span className="book-cover-role">RECRUITER AND CAREER COACH</span>
      <span className="book-cover-footer">jgohire.com</span>
    </div>
  </div>;
}

export default function BookFeature() {
  return <section className="book-feature" aria-labelledby="book-feature-title">
    <div className="site-shell book-feature-grid">
      <div className="book-feature-copy">
        <p className="eyebrow">A new resource from JGO Hire · Coming soon</p>
        <h2 id="book-feature-title">Found. Noticed. Hired.</h2>
        <p className="book-feature-subtitle">A recruiter’s guide to a stronger LinkedIn® profile.</p>
        <p>Someone searched for you on LinkedIn today. You didn’t show up.</p>
        <p>Learn how recruiters search, what they notice, and how to build a profile that helps you get found.</p>
        <div className="book-feature-actions"><Link href="/book" className="button button-primary">Explore the Book <span aria-hidden="true">→</span></Link><span>Coming soon on Amazon</span></div>
      </div>
      <div className="book-feature-art"><BookCover /></div>
    </div>
  </section>;
}
