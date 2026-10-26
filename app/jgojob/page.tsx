import SiteHeader from "@/components/SiteHeader";
import JgoJobPreview from "@/components/JgoJobPreview";
import styles from "./page.module.css";

const url = "https://jgojob.com/?utm_source=jgohire.com&utm_medium=referral&utm_campaign=jgo_job&utm_content=jgo-hire-website";
const essentials = [
  ["01", "Applications", "Save jobs, salaries, links, status updates, and next steps together."],
  ["02", "Outreach", "Keep track of recruiters, hiring managers, connections, and follow-ups."],
  ["03", "Interviews", "Manage interview rounds, schedules, notes, and thank-you reminders."],
  ["04", "Your dashboard", "See your opportunities and what needs your attention without digging through notes."],
];
export default function JGOJobPage(){
 return <main className={styles.page}>
  <SiteHeader />
  <section className={styles.hero}>
   <div className={styles.wrap}>
    <div className={styles.heroCopy}>
     <span className={styles.overline}>JGO JOB / THE JOB SEARCH ORGANIZER</span>
     <h1>Make your job search a little more simple, <em>a lot more organized.</em></h1>
     <p>Applications. Recruiter messages. Interviews. Follow-ups. Job searching is a lot to keep track of. JGO Job gives everything its own place, so you can spend less time managing the process.</p>
     <div className={styles.actions}><a className={styles.button} href={url} target="_blank" rel="noopener noreferrer">Start for free <span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div>
     <small>Free job tracker. No credit card required.</small>
    </div>
    <div className={styles.preview}><JgoJobPreview /></div>
   </div>
  </section>
  <section className={styles.intro} id="how-it-works"><div className={styles.wrap}>
   <div className={styles.introTop}><span className={styles.overline}>WHAT YOU CAN DO</span><h2>More than a list of jobs.</h2><p>Applying is just the beginning. Stay organized through every conversation, interview, and next step.</p></div>
   <div className={styles.rows}>{essentials.map(([number,title,description])=><div className={styles.featureRow} key={number}><span className={styles.number}>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
  </div></section>
  <section className={styles.premium}><div className={styles.wrap}>
   <div className={styles.premiumLayout}><div><span className={styles.goldLabel}>JGO JOB+ / OPTIONAL UPGRADE</span><h2>A recruiter and career coach in your corner, whenever you need one.</h2><p>Get extra help with the parts of the job search that are hardest to figure out on your own.</p><a className={styles.buttonGold} href={url} target="_blank" rel="noopener noreferrer">Explore JGO Job+ <span aria-hidden="true">↗</span></a><div className={styles.price}>$9.23/month <span>· Built to be canceled.</span></div></div>
   <div className={styles.premiumDetails}><div><strong>150+ message templates</strong><p>Networking, recruiter outreach, follow-ups, referrals, and more.</p></div><div><strong>Interview preparation</strong><p>Tools to help you prepare your answers and tell your story.</p></div><div><strong>Job insights and your next move</strong><p>Understand your progress and decide where to focus next.</p></div></div></div>
  </div></section>
  <section className={styles.close}><div className={styles.wrap}><span className={styles.overline}>BUILT BY JGO HIRE</span><h2>Job searching is enough work. Tracking it shouldn't be.</h2><p>Created by a recruiter and Certified Career Coach to make the process easier to manage, from the first saved job to the final interview.</p><a className={styles.button} href={url} target="_blank" rel="noopener noreferrer">Get started free <span aria-hidden="true">↗</span></a></div></section>
 </main>;
}
