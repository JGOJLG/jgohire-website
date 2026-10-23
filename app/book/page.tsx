import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const amazonBookUrl = "https://www.amazon.com/Found-Noticed-Hired-recruiters-LinkedIn%C2%AE/dp/B0HL4GTJ5H/ref=sr_1_1?crid=2ORU3CVB2NH26&dib=eyJ2IjoiMSJ9.Fhma0qDkTN5Y8k--v8stkg.hz--VKfid_k_IW8Eq0BUtFrMaq-m1GFIiU8T23TPFlE&dib_tag=se&keywords=found+noticed+hired+jen+gordon&qid=1790959922&sprefix=found+noticed+hired+jen+gotf%2Caps%2C137&sr=8-1";

const BookButton = ({ children = "Get the Book" }: { children?: React.ReactNode }) => (
  <Link href={amazonBookUrl} target="_blank" rel="noopener noreferrer" className="button button-primary book-buy-button">{children}</Link>
);

export default function BookPage() {
  return (
    <main>
      <SiteHeader />
      <section className="book-sales-hero">
        <div className="site-shell book-sales-hero-grid">
          <div className="book-sales-copy">
            <div className="book-sales-topline"><span>Now Available</span><span>On Amazon</span></div>
            <h1>Found.<br />Noticed.<br />Hired.</h1>
            <p className="book-sales-subtitle">A Recruiter’s Guide to a Stronger LinkedIn® Profile</p>
            <h2>Learn how recruiters search LinkedIn and make your profile easier to find.</h2>
            <p>Written by Jennifer Gordon, Principal Recruiter and Certified Career Coach, this practical guide walks you through optimizing your LinkedIn profile from a recruiter’s perspective.</p>
            <BookButton children="Get the Book on Amazon" />
          </div>
          <div className="book-sales-art">
            <Link href={amazonBookUrl} target="_blank" rel="noopener noreferrer" aria-label="View Found Noticed Hired on Amazon">
              <img src="/found-noticed-hired.png" alt="Found Noticed Hired book cover by Jennifer Gordon" />
            </Link>
          </div>
        </div>
      </section>

      <section className="book-inside">
        <div className="site-shell">
          <div className="book-section-heading">
            <p className="eyebrow">What you’ll learn</p>
            <h2>Practical LinkedIn advice you can put to work.</h2>
            <p>Understand what recruiters look for, then update your profile one section at a time.</p>
          </div>
          <div className="book-inside-grid">
            <article><h3>How recruiter searches work</h3><p>Understand how job titles, skills, keywords, location, and experience help recruiters discover candidates.</p></article>
            <article><h3>How to improve your profile</h3><p>Strengthen your headline, About section, Experience, Education, Skills, and other key sections.</p></article>
            <article><h3>How to build visibility</h3><p>Use networking, recommendations, Open to Work, and profile activity more intentionally.</p></article>
            <article><h3>How to use AI effectively</h3><p>Work with practical prompts while keeping your profile accurate, specific, and true to your voice.</p></article>
            <article><h3>How to put it into practice</h3><p>Follow exercises and recruiter tips as you make improvements to your profile.</p></article>
            <article><h3>How to audit your profile</h3><p>Review your finished profile from top to bottom before your next job search.</p></article>
          </div>
        </div>
      </section>

      <section className="book-for-you">
        <div className="site-shell">
          <p className="eyebrow">Who it’s for</p>
          <h2>For anyone who wants a stronger LinkedIn profile.</h2>
          <div className="book-for-grid">
            <span>Active Job Seekers</span><span>College Students &amp; Graduates</span><span>Career Changers</span><span>Professionals Open to Opportunities</span>
          </div>
        </div>
      </section>

      <section className="book-mid-cta">
        <div className="site-shell">
          <h2>Ready to make your LinkedIn profile work harder for you?</h2>
          <p>Recruiter-backed advice, practical exercises, and a final profile audit in one guide.</p>
          <BookButton children="Get Found. Noticed. Hired." />
        </div>
      </section>
      <section className="book-author-note">
        <div className="site-shell">
          <small>LinkedIn® is a registered trademark of LinkedIn Corporation. Found Noticed Hired, Jennifer Gordon, JGO Hire, and JG Collective LLC are not affiliated with, sponsored by, or endorsed by LinkedIn Corporation.</small>
        </div>
      </section>
    </main>
  );
}
