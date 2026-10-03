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
   <div className={s.preview}><div className={s.backplate}></div><div className={s.frame}><img src="/jgo-job-homepage-promo.webp" alt="JGO Job dashboard preview" /></div></div>
 </div></section>
}