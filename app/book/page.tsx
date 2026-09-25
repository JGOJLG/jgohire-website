import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const BookButton = ({ children = "Get the Book" }: { children?: React.ReactNode }) => (
  <Link href="/book" className="button button-primary book-buy-button">{children}</Link>
);

export default function BookPage() {
  return (
    <main>
      <SiteHeader />

      <section className="book-sales-hero">
        <div className="site-shell book-sales-hero-grid">
          <div className="book-sales-copy">
            <div className="book-sales-topline"><span>Coming Soon</span><span>Exclusively on Amazon</span></div>
            <h1>Found.<br />Noticed.<br />Hired.</h1>
            <p className="book-sales-subtitle">A Recruiter’s Guide to a Stronger LinkedIn® Profile</p>
            <h2>You have a LinkedIn® profile. But is it actually helping recruiters find you?</h2>
            <p>Most people build their profile based on what they <em>think</em> recruiters want to see. But recruiters are on the other side searching.</p>
            <p><strong>This book shows you that side.</strong></p>
            <BookButton />
            <p className="book-button-note">Amazon link coming soon</p>
          </div>
          <div className="book-sales-art">
            <img src="/found-noticed-hired.webp" alt="Found. Noticed. Hired. by Jennifer Gordon" />
          </div>
        </div>
      </section>

      <section className="book-search-strip">
        <div className="site-shell">
          <p>Recruiters search by</p>
          <div className="book-search-tags">
            <span>Job Title</span><span>Skills</span><span>Keywords</span><span>Location</span><span>Experience</span><span>Industry</span><span>Tools</span><span>Certifications</span>
          </div>
          <h2>You can be a great candidate and still get overlooked if your profile does not clearly show what you do and what you are qualified for.</h2>
        </div>
      </section>

      <section className="book-story-section">
        <div className="site-shell book-story-grid">
          <div>
            <p className="eyebrow">The recruiter side of LinkedIn®</p>
            <h2>A better LinkedIn® profile starts with understanding how recruiters search.</h2>
          </div>
          <div className="book-story-copy">
            <p><strong>Found, Noticed, Hired</strong> was written to show you the side of LinkedIn® most job seekers never see.</p>
            <p>I’m Jennifer Gordon, a Recruiter, Certified Career Coach, and Founder of JGO Hire. I have spent years recruiting, interviewing candidates, reviewing resumes and LinkedIn® profiles, working with hiring managers, and seeing firsthand why some people are easy to find and understand while others get lost in the search.</p>
            <p className="book-pullquote">This is the LinkedIn® book I wish every job seeker could read before starting their job search.</p>
          </div>
        </div>
      </section>

      <section className="book-not-magic">
        <div className="site-shell">
          <div className="book-not-grid">
            <div><span>01</span><h3>There is no one perfect LinkedIn® profile.</h3><p>Your profile should make sense for your experience, goals, and the opportunities you want to be found for.</p></div>
            <div><span>02</span><h3>Keywords are not magic.</h3><p>Adding a few keywords is not going to magically get you hired. Strategy and context matter.</p></div>
            <div><span>03</span><h3>Understanding the search changes how you build.</h3><p>Once you understand how recruiters actually use LinkedIn®, you can make much smarter decisions about your profile.</p></div>
          </div>
        </div>
      </section>

      <section className="book-inside">
        <div className="site-shell">
          <div className="book-section-heading">
            <p className="eyebrow">Inside the book</p>
            <h2>Build a profile recruiters can find, understand, and keep reading.</h2>
            <p>We go section by section through your LinkedIn® profile and focus on what actually matters.</p>
          </div>
          <div className="book-inside-grid">
            <article><span>01</span><h3>Get Found</h3><p>Understand recruiter search and identify the job titles, skills, keywords, location, industry, tools, and experience that may help the right searches lead to you.</p></article>
            <article><span>02</span><h3>Strengthen Your Profile</h3><p>Write a stronger headline and About section, then improve your Experience, Education, Skills, and other profile sections so your background is easier to understand.</p></article>
            <article><span>03</span><h3>Build Credibility & Visibility</h3><p>Use Open to Work, recommendations, networking, and profile activity more intentionally so your profile supports your job search beyond the basics.</p></article>
            <article><span>04</span><h3>Use AI Better</h3><p>Use practical AI prompts without pasting generic copy that sounds like everyone else. AI can give you options. You still decide what represents you.</p></article>
            <article><span>05</span><h3>Put It Into Practice</h3><p>Work through practical exercises, recruiter tips, and prompts you can actually use as you update your own profile.</p></article>
            <article><span>06</span><h3>Audit the Final Profile</h3><p>Finish with a full LinkedIn® profile audit so you can review your profile from top to bottom before putting it to work.</p></article>
          </div>
          <div className="book-center-cta"><BookButton children="Explore the Book" /><p>Coming soon exclusively on Amazon</p></div>
        </div>
      </section>

      <section className="book-ai-section">
        <div className="site-shell book-ai-grid">
          <div>
            <p className="eyebrow">AI for job seekers</p>
            <h2>ChatGPT can give you words. This book gives you recruiter-backed strategy.</h2>
          </div>
          <div>
            <p>Yes, AI can help. But if you give it a generic prompt and paste the first thing it gives you into LinkedIn®, you are probably going to sound exactly like everyone else using AI.</p>
            <p>The book includes prompts you can actually use, while helping you understand what you are trying to accomplish before you ask AI to write it.</p>
            <div className="book-ai-card"><span>RECRUITER TIP</span><p>Use AI to create options, organize your thinking, and improve what is already true. Your profile still needs to sound like you.</p></div>
          </div>
        </div>
      </section>

      <section className="book-for-you">
        <div className="site-shell">
          <p className="eyebrow">Who this is for</p>
          <h2>Your experience may already be there. The goal is to make sure it is actually coming across.</h2>
          <div className="book-for-grid">
            <span>Job Searching</span><span>Changing Careers</span><span>College Students & Recent Graduates</span><span>Returning to the Workforce</span><span>Trying to Get Noticed by Recruiters</span><span>Ready to Improve Your LinkedIn® Profile</span>
          </div>
        </div>
      </section>

      <section className="book-final-sales">
        <div className="site-shell book-final-grid">
          <div className="book-final-art"><img src="/found-noticed-hired.webp" alt="Found. Noticed. Hired. book cover" /></div>
          <div>
            <p className="eyebrow">Found. Noticed. Hired.</p>
            <h2>Before a recruiter can decide whether you might be right for a job, they have to find you.</h2>
            <p>And once they find you, they need to understand you.</p>
            <p className="book-final-line">Get found. Get understood. Give them a reason to keep reading.</p>
            <BookButton children="Get the Book" />
            <p className="book-button-note">Coming soon exclusively on Amazon. The button will take you directly to Amazon once the book is available.</p>
          </div>
        </div>
      </section>

      <section className="book-author-note">
        <div className="site-shell">
          <p>Learn more about JGO Hire, career coaching, and additional job-search resources at <Link href="/">jgohire.com</Link>.</p>
          <small>LinkedIn® is a registered trademark of LinkedIn Corporation. Found, Noticed, Hired, Jennifer Gordon, JGO Hire, and JG Collective LLC are not affiliated with, sponsored by, or endorsed by LinkedIn Corporation.</small>
        </div>
      </section>
    </main>
  );
}
