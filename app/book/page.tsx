import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { BookCover } from "@/components/BookFeature";

export const metadata: Metadata = {
  title: "Found. Noticed. Hired. | Coming Soon | JGO Hire",
  description: "Found. Noticed. Hired. by Jennifer Gordon. A recruiter’s guide to a stronger LinkedIn profile. Coming soon on Amazon.",
};

export default function BookPage() {
  return <main><SiteHeader /><section className="book-detail"><div className="site-shell book-detail-grid">
    <div className="book-detail-art"><BookCover /></div>
    <div className="book-detail-copy">
      <p className="eyebrow">JGO Hire presents · Coming soon</p>
      <h1>Found. Noticed. Hired.</h1>
      <p className="book-feature-subtitle">A recruiter’s guide to a stronger LinkedIn® profile.</p>
      <p className="book-detail-quote">Someone searched for you on LinkedIn today. You didn’t show up.</p>
      <p>Written by recruiter and career coach Jennifer Gordon, this step-by-step guide shares how recruiters search for candidates, what they notice, and how to build a LinkedIn profile that helps you get found.</p>
      <p className="book-detail-status">Coming soon on Amazon. Purchase link will be added when the book is available.</p>
      <Link href="/" className="button button-primary">Explore JGO Hire <span aria-hidden="true">→</span></Link>
    </div>
  </div></section></main>;
}
