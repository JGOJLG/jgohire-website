import s from "./JgoJobLaunch.module.css";
export default function JgoJobLaunch(){
 const url="https://jgojob.com/?utm_source=jgohire&utm_medium=website&utm_campaign=jgojob_launch&utm_content=homepage";
 return <section className={s.section} aria-labelledby="jgojob-title"><div className={s.shell}>
  <div className={s.copy}>
   <div className={s.brand}><span>JGO JOB</span><i></i><small>JOB TRACKER</small></div>
   <h2 id="jgojob-title">Your job search,<br/>organized.</h2>
   <p>Applications. People. Interviews. Follow-ups.<br className={s.desktopBreak}/> Keep everything connected in one simple place.</p>
   <a className={s.cta} href={url}>Start your job tracker <span>→</span></a>
   <small className={s.note}>Free for a limited time. No credit card required.</small>
  </div>
  <div className={s.preview} aria-label="JGO Job dashboard preview">
   <div className={s.backplate}></div>
   <div className={s.frame} style={{fontFamily:"Arial, sans-serif",fontSize:"10px",color:"#173f33"}}>
    <div className={s.appTop}><b className={s.appIcon}>J</b><strong>JGO JOB</strong><nav><span className={s.active}>Job Tracker</span><span>Find Jobs</span><span>How It Works</span></nav></div>
    <div className={s.appHero}><div><small>WELCOME BACK</small><h3>Let’s keep this organized.</h3><p>Your applications, follow-ups, interviews and next moves — all in one place.</p></div><span className={s.fakeButton}>＋ Add a Job</span></div>
    <div className={s.stats}><div><small>▣ &nbsp; ALL JOBS</small><b>11</b><p>opportunities tracking</p></div><div><small>↗ &nbsp; APPLIED</small><b>8</b><p>You applied. Great. Now don’t disappear.</p></div><div><small>▯ &nbsp; INTERVIEWS</small><b>6</b><p>now we have something to work with</p></div><div><small>☆ &nbsp; OFFERS</small><b>2</b><p>okay, now we’re talking</p></div></div>
    <div className={s.appBottom}><div><b>▣ &nbsp; Upcoming Interviews</b><u>View all</u></div><div><b>☑ &nbsp; Tasks</b><u>View all</u></div></div>
   </div>
  </div>
 </div></section>
}