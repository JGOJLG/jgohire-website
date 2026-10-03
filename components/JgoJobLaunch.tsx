import s from "./JgoJobLaunch.module.css";
export default function JgoJobLaunch(){
 return <section className={s.section} aria-labelledby="jgojob-title"><div className={s.shell}>
  <h2 id="jgojob-title" className={s.productTitle}><span>JGO JOB</span><small>TRACKER</small></h2>
  <div className={s.grid}>
   <div className={s.copy}><p className={s.positioning}>The job tracker I wish every candidate had.</p><p className={s.body}>Your job search has a lot of moving pieces. JGO Job gives your applications, contacts, interviews, follow-ups and next steps one organized home.</p><a className={s.cta} href="https://jgojob.com/?utm_source=jgohire&utm_medium=website&utm_campaign=jgojob_launch&utm_content=homepage">Start your free tracker <span>→</span></a><small>No credit card required.</small></div>
   <div className={s.card}><div className={s.cardTop}><span className={s.mark}>J</span><div><b>JGO JOB</b><small>YOUR JOB SEARCH, ORGANIZED.</small></div></div><div className={s.rule}></div><p>The best job searches start with a system.</p><div className={s.lines}><span>Applications</span><span>People + outreach</span><span>Interviews</span><span>Follow-ups + next steps</span></div><a href="https://jgojob.com/?utm_source=jgohire&utm_medium=website&utm_campaign=jgojob_launch&utm_content=homepage_card">jgojob.com <b>↗</b></a></div>
  </div>
 </div></section>
}