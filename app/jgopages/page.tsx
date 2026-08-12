import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import "./jgopages.css";

export const metadata: Metadata = {
  title: "JGO Pages | JGO Hire",
  robots: {
    index: false,
    follow: false,
  },
};

const pages = [
  {
    title: "Welcome Page",
    description: "Private welcome / link hub page for JGO Hire.",
    href: "/welcome",
    tag: "Hidden Page",
  },
  {
    title: "Job Seeker Survival Guide",
    description: "The quiz and free Job Seeker Survival Guide experience.",
    href: "/job-seeker-survival-guide",
    tag: "Hidden Page",
  },
  {
    title: "LinkedIn Guide Course",
    description: "The member course dashboard customers land in after purchase and account creation.",
    href: "/course",
    tag: "Member Page",
  },
];

export default function JgoPagesPage() {
  return (
    <main>
      <SiteHeader />

      <section className="jgo-pages-page">
        <div className="jgo-pages-orb jgo-pages-orb-one" />
        <div className="jgo-pages-orb jgo-pages-orb-two" />

        <div className="jgo-pages-wrap">
          <div className="jgo-pages-pill">✦ JGO Hire Internal</div>

          <div className="jgo-pages-heading">
            <p className="jgo-pages-eyebrow">JGO Pages</p>
            <h1>Hidden + internal pages.</h1>
            <p>
              One place to keep track of JGO Hire pages that are not part of the main public site navigation.
            </p>
          </div>

          <div className="jgo-pages-grid">
            {pages.map((page) => (
              <Link href={page.href} className="jgo-pages-card" key={page.href}>
                <div className="jgo-pages-card-top">
                  <span className="jgo-pages-tag">{page.tag}</span>
                  <span className="jgo-pages-arrow" aria-hidden="true">→</span>
                </div>

                <h2>{page.title}</h2>
                <p>{page.description}</p>
                <code>jgohire.com{page.href}</code>
              </Link>
            ))}
          </div>

          <div className="jgo-pages-note">
            <span>✦</span>
            <p>
              This page is intentionally not linked in the public navigation. New hidden pages can be added here as they are built.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
