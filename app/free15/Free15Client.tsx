"use client";

import { useState } from "react";

const emailHref = "mailto:jen@jgohire.com?subject=Free%2015%20Minute%20Consultation&body=Hi%20Jen%2C%0A%0AI%20am%20interested%20in%20a%20free%2015%20minute%20consultation.%20Here%20are%20a%20few%20times%20that%20work%20for%20me%3A%0A%0A1.%20%0A2.%20%0A3.%20%0A%0AA%20little%20about%20what%20I%20am%20looking%20for%3A%0A%0AThank%20you%21";

type Modal = "availability" | "fit" | null;

export default function Free15Client() {
  const [modal, setModal] = useState<Modal>(null);

  return (
    <section className="jgo-consult-page">
      <div className="jgo-consult-hero">
        <div className="jgo-consult-hero-inner">
          <div className="jgo-consult-symbol">15</div>
          <div className="jgo-consult-pill">Complimentary Career Consultation</div>
          <h1>Free 15 Minute Call</h1>
          <p>A quick, complimentary conversation to understand what you need, where you are in your career, and whether working together feels like the right mutual fit.</p>
          <div className="jgo-consult-hero-actions">
            <a className="jgo-consult-button" href={emailHref}>Send Me A Few Times <span>→</span></a>
            <a className="jgo-consult-button secondary" href="/resources">View Free Resources <span>→</span></a>
          </div>
        </div>
      </div>

      <div className="jgo-consult-wrap">
        <p className="jgo-consult-intro">This call is meant to be simple. No pressure, no hard pitch, and no need to have everything figured out before reaching out. It is a quick introduction so we can talk through what you are looking for and decide if there is a clear way JGO Hire can support you.</p>

        <div className="jgo-consult-highlight">
          <div><h2>What is the free 15?</h2><p>The complimentary 15 minute consultation is a short fit call. We will talk through what brought you here, what kind of support you are considering, and what you are hoping to walk away with. If it feels aligned, I will recommend the best next step. If not, I will point you in the right direction.</p></div>
          <div className="jgo-consult-mini-list"><div className="jgo-consult-mini-item">Free, quick, and low pressure</div><div className="jgo-consult-mini-item">Designed to decide if it is a mutual fit</div><div className="jgo-consult-mini-item">Helpful for resumes, interviews, LinkedIn, or career direction</div></div>
        </div>

        <div className="jgo-consult-grid">
          <button className="jgo-consult-card" type="button" onClick={() => setModal("availability")}><div className="jgo-consult-card-top"><div className="jgo-consult-icon">✉</div><span className="jgo-consult-badge">Best option</span><h3>Send Your Availability</h3><p>Send 2 to 3 time windows that work for you, plus a short note about what you are looking for help with.</p></div><div className="jgo-consult-card-bottom">Draft Email <span className="jgo-consult-arrow">→</span></div></button>
          <button className="jgo-consult-card" type="button" onClick={() => setModal("fit")}><div className="jgo-consult-card-top"><div className="jgo-consult-icon">?</div><span className="jgo-consult-badge">Good to know</span><h3>Is This For Me?</h3><p>This is a good first step if you want support with your resume, interviews, LinkedIn, or job search strategy so you do not have to figure it all out alone.</p></div><div className="jgo-consult-card-bottom">Learn More <span className="jgo-consult-arrow">→</span></div></button>
          <a className="jgo-consult-card" href={emailHref}><div className="jgo-consult-card-top"><div className="jgo-consult-icon">@</div><span className="jgo-consult-badge">Fastest</span><h3>Email Directly</h3><p>Open a ready-to-edit email template and send me a few times that work for your schedule.</p></div><div className="jgo-consult-card-bottom">Open Email <span className="jgo-consult-arrow">→</span></div></a>
        </div>

        <div className="jgo-consult-section"><h2>How it works</h2><p>You do not need to book through a scheduling link here. Just send over a few times that work, and I will reply with what I have open.</p><div className="jgo-consult-steps"><div className="jgo-consult-step"><span>1</span><strong>Send a few times</strong>Share 2 to 3 windows that work for you, including your time zone if needed.</div><div className="jgo-consult-step"><span>2</span><strong>Tell me what you need</strong>Include a quick note about whether you are looking for resume help, interview prep, LinkedIn support, career clarity, or something else.</div><div className="jgo-consult-step"><span>3</span><strong>Decide next steps</strong>We will use the call to decide if working together makes sense and what support would be most helpful.</div></div></div>

        <div className="jgo-consult-split"><div className="jgo-consult-panel"><h3>This call is for</h3><ul><li>Job seekers who are not sure where to start.</li><li>Professionals preparing for interviews and wanting to feel more confident.</li><li>People who are applying, interviewing, or job searching and do not want to navigate it alone.</li><li>Professionals considering resume, LinkedIn, interview prep, or career coaching support.</li><li>Anyone who wants a quick conversation before deciding on 1:1 support.</li></ul></div><div className="jgo-consult-panel"><h3>This call is not</h3><ul><li>A full resume review.</li><li>A complete interview coaching session.</li><li>A job placement service.</li><li>A guaranteed strategy session with deliverables.</li></ul></div></div>

        <div className="jgo-consult-final"><h2>Ready to see if it is a fit?</h2><p>Send me a few times that work for you and a quick note about what you are looking for. I will reply with availability and we can go from there.</p><a className="jgo-consult-button" href={emailHref}>Send Me A Few Times <span>→</span></a></div>
      </div>

      {modal === "availability" && <div className="jgo-consult-modal show" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && setModal(null)}><div className="jgo-consult-modal-box"><button className="jgo-consult-close" type="button" onClick={() => setModal(null)}>×</button><div className="jgo-consult-modal-icon">✉</div><h2>Send your availability</h2><p>This will open an email draft you can edit before sending.</p><div className="jgo-consult-preview"><strong>Your email will include:</strong><br />A note that you are interested in the free 15 minute consultation, 2 to 3 times that work for you, and a short summary of what you are looking for help with.</div><a className="jgo-consult-modal-button" href={emailHref}>Open Email Draft</a><button className="jgo-consult-modal-button secondary" type="button" onClick={() => setModal(null)}>Close</button></div></div>}

      {modal === "fit" && <div className="jgo-consult-modal show" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && setModal(null)}><div className="jgo-consult-modal-box"><button className="jgo-consult-close" type="button" onClick={() => setModal(null)}>×</button><div className="jgo-consult-modal-icon">?</div><h2>Is this call right for you?</h2><p>The free 15 is a good fit if you are considering support but want to talk it through first.</p><div className="jgo-consult-preview"><strong>Good reasons to reach out:</strong><br />You are updating your resume, preparing for interviews, trying to improve your LinkedIn, feeling stuck in your search, or wanting someone in your corner so you do not have to navigate the process alone.</div><button className="jgo-consult-modal-button" type="button" onClick={() => setModal("availability")}>I Want To Send Times</button><button className="jgo-consult-modal-button secondary" type="button" onClick={() => setModal(null)}>Close</button></div></div>}
    </section>
  );
}
