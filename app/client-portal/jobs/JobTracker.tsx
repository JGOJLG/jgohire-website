"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import QuickStatus from "./QuickStatus";

type InterviewPerson = {
  id: string;
  name: string;
  title: string;
  linkedin: string;
};

type InterviewRound = {
  id: string;
  label: string;
  format: string;
  date: string;
  status: string;
  notes: string;
  people?: InterviewPerson[];
};

type MessageLog = {
  id: string;
  to: string;
  via: string;
  via_other: string;
  content: string;
  date_sent: string;
  created_at: string;
};

type Job = {
  id: number;
  user_id: string;
  company: string | null;
  job_title: string | null;
  job_url: string | null;
  job_description: string | null;
  location: string | null;
  status: string;
  date_applied: string | null;
  next_step: string | null;
  next_step_date: string | null;
  notes: string | null;
  source: string | null;
  recruiter_name: string | null;
  recruiter_email: string | null;
  recruiter_phone: string | null;
  follow_up_date: string | null;
  interview_date: string | null;
  compensation: string | null;
  remote_type: string | null;
  priority: string | null;
  interview_rounds?: InterviewRound[];
  message_history?: MessageLog[];
  followed_company_linkedin: boolean;
  archived_at: string | null;
};

type Contact = {
  id: number;
  job_id: number;
  user_id: string;
  name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  linkedin_url: string | null;
  outreach_method: string | null;
  outreach_date: string | null;
  outreach_note: string | null;
  connected_on_linkedin: boolean;
  message_sent: boolean;
  follow_up_sent: boolean;
};

const statuses = [
  "Open / Interested",
  "Application Submitted",
  "Messaged Contact",
  "Recruiter Screen",
  "Interviewing",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
  "Closed",
];

const methods = [
  "LinkedIn message",
  "LinkedIn connection request",
  "Email",
  "Phone call",
  "Text message",
  "Referral / introduction",
  "In person",
  "Other",
];

const formats = ["Virtual", "Phone", "In Person", "Video", "Other"];
const roundStatuses = ["Upcoming", "Completed", "Cancelled"];
const nullable = (v: string | null) => (v && v.trim() ? v.trim() : null);
const ordinal = (n: number) => {
  if (n === 1) return "1st Interview";
  if (n === 2) return "2nd Interview";
  if (n === 3) return "3rd Interview";
  return `${n}th Interview`;
};

export default function JobTracker({ userId, initialJobs, initialContacts }: { userId: string; initialJobs: Job[]; initialContacts: Contact[] }) {
  const s = createClient();
  const [jobs, setJobs] = useState(initialJobs);
  const [contacts, setContacts] = useState(initialContacts);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [saveState, setSaveState] = useState<Record<number, string>>({});
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [messageVia, setMessageVia] = useState<Record<number, string>>({});

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || null;
  const activeJobs = useMemo(() => jobs.filter((j) => !j.archived_at), [jobs]);
  const archivedJobs = useMemo(() => jobs.filter((j) => !!j.archived_at), [jobs]);
  const stats = useMemo(() => ({
    out: activeJobs.filter((j) => !["Open / Interested", "Rejected", "Withdrawn", "Closed"].includes(j.status)).length,
    contacts: contacts.filter((c) => c.outreach_method && activeJobs.some((j) => j.id === c.job_id)).length,
    interviewing: activeJobs.filter((j) => ["Recruiter Screen", "Interviewing", "Final Interview"].includes(j.status)).length,
    offers: activeJobs.filter((j) => j.status === "Offer").length,
  }), [activeJobs, contacts]);

  function patch(id: number, key: keyof Job, value: string | InterviewRound[]) {
    setJobs((v) => v.map((j) => (j.id === id ? { ...j, [key]: value } : j)));
    setSaveState((v) => ({ ...v, [id]: "" }));
  }

  function syncStatus(id: number, status: string) {
    setJobs((v) => v.map((j) => (j.id === id ? { ...j, status } : j)));
  }

  async function addJob(fd: FormData) {
    setBusy(true);
    setMessage("");
    const payload = {
      user_id: userId,
      company: String(fd.get("company") || "").trim() || null,
      job_title: String(fd.get("title") || "").trim() || null,
      job_url: String(fd.get("url") || "").trim() || null,
      job_description: String(fd.get("job_description") || "").trim() || null,
      status: String(fd.get("status") || statuses[0]),
      location: String(fd.get("location") || "").trim() || null,
      compensation: String(fd.get("compensation") || "").trim() || null,
      remote_type: String(fd.get("remote_type") || "").trim() || null,
      recruiter_name: String(fd.get("recruiter_name") || "").trim() || null,
      recruiter_email: String(fd.get("recruiter_email") || "").trim() || null,
      recruiter_phone: String(fd.get("recruiter_phone") || "").trim() || null,
      follow_up_date: String(fd.get("follow_up_date") || "").trim() || null,
      next_step_date: String(fd.get("next_step_date") || "").trim() || null,
      next_step: String(fd.get("next_step") || "").trim() || null,
      notes: String(fd.get("notes") || "").trim() || null,
    };

    const { data, error } = await s.from("client_job_applications").insert(payload).select("*").single();
    if (error || !data) {
      setMessage("Something went wrong. Please try again.");
      setBusy(false);
      return;
    }

    setJobs((v) => [data as Job, ...v]);

    const contactName = String(fd.get("contact_name") || "").trim();
    if (contactName) {
      const { data: contact } = await s.from("client_job_contacts").insert({
        job_id: data.id,
        user_id: userId,
        name: contactName,
        title: String(fd.get("contact_title") || "").trim() || null,
        email: String(fd.get("contact_email") || "").trim() || null,
        phone: String(fd.get("contact_phone") || "").trim() || null,
        linkedin_url: String(fd.get("contact_linkedin") || "").trim() || null,
        outreach_method: String(fd.get("contact_method") || "").trim() || null,
        outreach_date: String(fd.get("contact_date") || "").trim() || null,
        outreach_note: String(fd.get("contact_outreach_note") || "").trim() || null,
        notes: String(fd.get("contact_notes") || "").trim() || null,
        connected_on_linkedin: false,
        message_sent: false,
        follow_up_sent: false,
      }).select("*").single();
      if (contact) setContacts((v) => [...v, contact as Contact]);
    }

    setMessage("Job added.");
    setShowAddDetails(false);
    setBusy(false);
  }

  async function save(job: Job) {
    setBusy(true);
    setSaveState((v) => ({ ...v, [job.id]: "Saving..." }));
    const payload = {
      company: nullable(job.company),
      job_title: nullable(job.job_title),
      job_url: nullable(job.job_url),
      job_description: nullable(job.job_description),
      location: nullable(job.location),
      status: job.status,
      date_applied: nullable(job.date_applied),
      next_step: nullable(job.next_step),
      next_step_date: nullable(job.next_step_date),
      notes: nullable(job.notes),
      source: nullable(job.source),
      recruiter_name: nullable(job.recruiter_name),
      recruiter_email: nullable(job.recruiter_email),
      recruiter_phone: nullable(job.recruiter_phone),
      follow_up_date: nullable(job.follow_up_date),
      interview_date: nullable(job.interview_date),
      compensation: nullable(job.compensation),
      remote_type: nullable(job.remote_type),
      priority: nullable(job.priority),
      interview_rounds: job.interview_rounds || [],
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await s.from("client_job_applications").update(payload).eq("id", job.id).eq("user_id", userId).select("*").single();
    if (error || !data) {
      setSaveState((v) => ({ ...v, [job.id]: "Couldn’t save. Please try again." }));
    } else {
      setJobs((v) => v.map((x) => (x.id === job.id ? data as Job : x)));
      setSaveState((v) => ({ ...v, [job.id]: "Saved!" }));
      setTimeout(() => setSaveState((v) => ({ ...v, [job.id]: "" })), 2200);
    }
    setBusy(false);
  }

  async function remove(job: Job) {
    if (!confirm(`Remove ${job.company || job.job_title || "this job"}?`)) return;
    setBusy(true);
    const { error } = await s.from("client_job_applications").delete().eq("id", job.id).eq("user_id", userId);
    if (!error) {
      setJobs((v) => v.filter((x) => x.id !== job.id));
      setContacts((v) => v.filter((x) => x.job_id !== job.id));
      setSelectedJobId(null);
    }
    setBusy(false);
  }

  async function archiveJob(job: Job) {
    if (!confirm(`Archive ${job.company || job.job_title || "this job"}? You can restore it anytime from Archived Jobs.`)) return;
    setBusy(true);
    const archivedAt = new Date().toISOString();
    const { error } = await s.from("client_job_applications")
      .update({ archived_at: archivedAt, archived_by: userId, updated_at: archivedAt })
      .eq("id", job.id)
      .eq("user_id", userId);
    if (!error) {
      setJobs((v) => v.map((x) => x.id === job.id ? { ...x, archived_at: archivedAt } : x));
      setSelectedJobId(null);
    } else {
      setSaveState((v) => ({ ...v, [job.id]: "Couldn’t archive. Please try again." }));
    }
    setBusy(false);
  }

  async function restoreJob(job: Job) {
    setBusy(true);
    const { error } = await s.from("client_job_applications")
      .update({ archived_at: null, archived_by: null, archive_reason: null, updated_at: new Date().toISOString() })
      .eq("id", job.id)
      .eq("user_id", userId);
    if (!error) {
      setJobs((v) => v.map((x) => x.id === job.id ? { ...x, archived_at: null } : x));
    }
    setBusy(false);
  }

  async function toggleCompanyLinkedIn(job: Job) {
    const next = !job.followed_company_linkedin;
    setJobs((v) => v.map((j) => j.id === job.id ? { ...j, followed_company_linkedin: next } : j));
    const { error } = await s.from("client_job_applications")
      .update({ followed_company_linkedin: next, updated_at: new Date().toISOString() })
      .eq("id", job.id)
      .eq("user_id", userId);
    if (error) {
      setJobs((v) => v.map((j) => j.id === job.id ? { ...j, followed_company_linkedin: !next } : j));
      setSaveState((v) => ({ ...v, [job.id]: "Couldn’t save. Please try again." }));
    }
  }

  async function toggleContactProgress(contact: Contact, key: "connected_on_linkedin" | "message_sent" | "follow_up_sent") {
    const next = !contact[key];
    setContacts((v) => v.map((x) => x.id === contact.id ? { ...x, [key]: next } : x));
    const { error } = await s.from("client_job_contacts")
      .update({ [key]: next })
      .eq("id", contact.id)
      .eq("user_id", userId)
      .eq("job_id", contact.job_id);
    if (error) {
      setContacts((v) => v.map((x) => x.id === contact.id ? { ...x, [key]: !next } : x));
    }
  }

  async function addContact(jobId: number, fd: FormData) {
    const name = String(fd.get("name") || "").trim();
    if (!name) return;
    setBusy(true);
    const { data, error } = await s.from("client_job_contacts").insert({
      job_id: jobId,
      user_id: userId,
      name,
      title: String(fd.get("title") || "").trim() || null,
      email: String(fd.get("email") || "").trim() || null,
      phone: String(fd.get("phone") || "").trim() || null,
      linkedin_url: String(fd.get("linkedin") || "").trim() || null,
      outreach_method: String(fd.get("method") || "").trim() || null,
      outreach_date: String(fd.get("date") || "").trim() || null,
      outreach_note: String(fd.get("outreach_note") || "").trim() || null,
      notes: String(fd.get("notes") || "").trim() || null,
      connected_on_linkedin: false,
      message_sent: false,
      follow_up_sent: false,
    }).select("*").single();
    if (!error && data) setContacts((v) => [...v, data as Contact]);
    setBusy(false);
  }

  async function addJobMessage(job: Job, fd: FormData) {
    setBusy(true);
    const entry: MessageLog = {
      id: crypto.randomUUID(),
      to: String(fd.get("message_to") || "").trim(),
      via: String(fd.get("via") || "").trim(),
      via_other: String(fd.get("via_other") || "").trim(),
      content: String(fd.get("content") || "").trim(),
      date_sent: String(fd.get("date_sent") || "").trim(),
      created_at: new Date().toISOString(),
    };
    const next = [...(job.message_history || []), entry];
    const { data, error } = await s.from("client_job_applications")
      .update({ message_history: next, updated_at: new Date().toISOString() })
      .eq("id", job.id)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (!error && data) {
      setJobs((v) => v.map((x) => x.id === job.id ? data as Job : x));
      setMessageVia((v) => ({ ...v, [job.id]: "" }));
      const form = document.getElementById(`job-message-form-${job.id}`) as HTMLFormElement | null;
      form?.reset();
    } else {
      setSaveState((v) => ({ ...v, [job.id]: "Couldn’t save message. Please try again." }));
    }
    setBusy(false);
  }

  async function removeJobMessage(job: Job, messageId: string) {
    const next = (job.message_history || []).filter((m) => m.id !== messageId);
    const { data, error } = await s.from("client_job_applications")
      .update({ message_history: next, updated_at: new Date().toISOString() })
      .eq("id", job.id)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (!error && data) setJobs((v) => v.map((x) => x.id === job.id ? data as Job : x));
  }

  function addInterviewRound(job: Job) {
    const rounds = job.interview_rounds || [];
    patch(job.id, "interview_rounds", [...rounds, {
      id: crypto.randomUUID(),
      label: ordinal(rounds.length + 1),
      format: "Virtual",
      date: "",
      status: "Upcoming",
      notes: "",
      people: [{ id: crypto.randomUUID(), name: "", title: "", linkedin: "" }],
    }]);
    if (job.status === "Open / Interested" || job.status === "Application Submitted" || job.status === "Messaged Contact") {
      patch(job.id, "status", "Interviewing");
    }
  }

  function updateRound(job: Job, roundId: string, key: keyof InterviewRound, value: string) {
    const rounds = (job.interview_rounds || []).map((r) => r.id === roundId ? { ...r, [key]: value } : r);
    patch(job.id, "interview_rounds", rounds);
  }

  function addInterviewPerson(job: Job, roundId: string) {
    const rounds = (job.interview_rounds || []).map((r) => {
      if (r.id !== roundId) return r;
      const people = r.people || [];
      return { ...r, people: [...people, { id: crypto.randomUUID(), name: "", title: "", linkedin: "" }] };
    });
    patch(job.id, "interview_rounds", rounds);
  }

  function updateInterviewPerson(job: Job, roundId: string, personId: string, key: keyof InterviewPerson, value: string) {
    const rounds = (job.interview_rounds || []).map((r) => {
      if (r.id !== roundId) return r;
      return { ...r, people: (r.people || []).map((p) => p.id === personId ? { ...p, [key]: value } : p) };
    });
    patch(job.id, "interview_rounds", rounds);
  }

  function removeInterviewPerson(job: Job, roundId: string, personId: string) {
    const rounds = (job.interview_rounds || []).map((r) => {
      if (r.id !== roundId) return r;
      return { ...r, people: (r.people || []).filter((p) => p.id !== personId) };
    });
    patch(job.id, "interview_rounds", rounds);
  }

  const contactFields = (prefix = "") => <>
    <div className="cp-form-row">
      <label className="cp-label">Contact name<input className="cp-input" name={`${prefix}name`} placeholder="Name" /></label>
      <label className="cp-label">Title / relationship<input className="cp-input" name={`${prefix}title`} placeholder="Recruiter, hiring manager, referral..." /></label>
    </div>
    <label className="cp-label">LinkedIn URL<input className="cp-input" name={`${prefix}linkedin`} placeholder="LinkedIn profile" /></label>
    <div className="cp-form-row">
      <label className="cp-label">Email<input className="cp-input" name={`${prefix}email`} /></label>
      <label className="cp-label">Phone<input className="cp-input" name={`${prefix}phone`} /></label>
    </div>
    <div className="cp-form-row">
      <label className="cp-label">How did you reach out?<select className="cp-select" name={`${prefix}method`} defaultValue=""><option value="">Not yet / choose method</option>{methods.map((m) => <option key={m}>{m}</option>)}</select></label>
      <label className="cp-label">Date reached out<input className="cp-input" name={`${prefix}date`} type="date" /></label>
    </div>
    <label className="cp-label">What happened?<textarea className="cp-textarea" name={`${prefix}outreach_note`} /></label>
    <label className="cp-label">Contact notes<input className="cp-input" name={`${prefix}notes`} /></label>
  </>;

  return <div className="cp-jobtracker-ui">
    <section className="cp-grid cp-grid-4 cp-jobtracker-stats">
      <div className="cp-card cp-stat"><strong>{stats.out}</strong><span>Applications out</span></div>
      <div className="cp-card cp-stat"><strong>{stats.contacts}</strong><span>Outreach logged</span></div>
      <div className="cp-card cp-stat"><strong>{stats.interviewing}</strong><span>Interviewing</span></div>
      <div className="cp-card cp-stat"><strong>{stats.offers}</strong><span>Offers</span></div>
    </section>

    <section className="cp-section cp-card cp-job-add-panel">
      <div className="cp-section-head"><div><p className="cp-eyebrow">Quick add</p><h2>Add a job</h2><p className="cp-muted">Company and job title are all you need to start. Everything else is optional.</p></div></div>
      <form action={addJob} className="cp-form">
        <div className="cp-form-row">
          <label className="cp-label">Company<input className="cp-input" name="company" required /></label>
          <label className="cp-label">Job title<input className="cp-input" name="title" required /></label>
        </div>
        <button type="button" className="cp-button secondary" onClick={() => setShowAddDetails((v) => !v)} style={{ width: "fit-content" }}>{showAddDetails ? "Hide additional details" : "+ Additional details"}</button>
        {showAddDetails ? <div className="cp-card" style={{ padding: 16, background: "#f8faf7" }}><div className="cp-form">
          <label className="cp-label">Job posting link <span className="cp-muted">(optional)</span><input className="cp-input" name="url" placeholder="Paste anything here" /></label>
          <div className="cp-form-row"><label className="cp-label">Status<select className="cp-select" name="status">{statuses.map((x) => <option key={x}>{x}</option>)}</select></label><label className="cp-label">Location<input className="cp-input" name="location" /></label></div>
          <div className="cp-form-row"><label className="cp-label">Compensation<input className="cp-input" name="compensation" /></label><label className="cp-label">Work setup<input className="cp-input" name="remote_type" placeholder="Remote, Hybrid, Onsite" /></label></div>
          <div className="cp-form-row"><label className="cp-label">Recruiter name<input className="cp-input" name="recruiter_name" /></label><label className="cp-label">Recruiter email<input className="cp-input" name="recruiter_email" /></label></div>
          <div className="cp-form-row"><label className="cp-label">Recruiter phone<input className="cp-input" name="recruiter_phone" /></label><label className="cp-label">Follow-up date<input className="cp-input" name="follow_up_date" type="date" /></label></div>
          <div className="cp-form-row"><label className="cp-label">Next step<input className="cp-input" name="next_step" /></label><label className="cp-label">Next step date<input className="cp-input" name="next_step_date" type="date" /></label></div>
          <label className="cp-label">Notes<textarea className="cp-textarea" name="notes" /></label>
          <label className="cp-label">Copy and paste the full job description<span className="cp-muted" style={{ display: "block", margin: "4px 0 8px" }}>Paste the actual posting here so you still have it if the posting closes or disappears.</span><textarea className="cp-textarea" name="job_description" rows={10} /></label>
          <details className="cp-card" style={{ padding: 14 }}><summary style={{ cursor: "pointer", fontWeight: 800 }}>+ Add a contact</summary><div className="cp-form" style={{ marginTop: 12 }}>{contactFields("contact_")}</div></details>
        </div></div> : null}
        <div><button className="cp-button" disabled={busy}>{busy ? "Adding..." : "Add to tracker"}</button>{message ? <span className="cp-muted" style={{ marginLeft: 12, fontWeight: 700 }}>{message}</span> : null}</div>
      </form>
    </section>

    <section className="cp-section cp-job-list-section">
      <div className="cp-section-head"><div><p className="cp-eyebrow">Your jobs</p><h2>Job tracker</h2><p className="cp-muted">One short row per job. Click any row to open the full details and interview board.</p></div></div>
      {activeJobs.length ? <div className="cp-card cp-job-table" style={{ padding: 0, overflowX: "auto" }}><div style={{ minWidth: 760 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1fr 1.2fr 110px", gap: 12, padding: "10px 16px", borderBottom: "1px solid #e4e8e2", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "#68736a" }}><span>Company</span><span>Job title</span><span>Status</span><span>Next step</span><span /></div>
        {activeJobs.map((job) => <div key={job.id} role="button" tabIndex={0} onClick={() => setSelectedJobId(job.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedJobId(job.id); }} style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1fr 1.2fr 110px", gap: 12, alignItems: "center", padding: "11px 16px", borderBottom: "1px solid #edf0eb", cursor: "pointer", minHeight: 48 }}>
          <strong style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.company || "Company not added"}</strong>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.job_title || "Job title not added"}</span>
          <QuickStatus jobId={job.id} userId={userId} status={job.status} onStatusSaved={(status) => syncStatus(job.id, status)} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#68736a" }}>{job.next_step || "—"}</span>
          <button type="button" className="cp-button secondary" style={{ padding: "7px 10px" }} onClick={(e) => { e.stopPropagation(); setSelectedJobId(job.id); }}>View</button>
        </div>)}
      </div></div> : <div className="cp-card cp-empty">No jobs yet. Add your first one above.</div>}
    </section>

    {archivedJobs.length ? <section className="cp-section cp-job-list-section" style={{ marginTop: 28 }}>
      <details className="cp-card" style={{ padding: 0, overflow: "hidden" }}>
        <summary style={{ cursor: "pointer", padding: "16px 18px", fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span>Archived Jobs</span>
          <span className="cp-muted" style={{ fontSize: 12 }}>{archivedJobs.length} archived</span>
        </summary>
        <div style={{ borderTop: "1px solid #e4e8e2" }}>
          {archivedJobs.map((job) => <div key={job.id} style={{ display: "grid", gridTemplateColumns: "1.3fr 1.5fr 1fr auto", gap: 12, alignItems: "center", padding: "11px 16px", borderBottom: "1px solid #edf0eb" }}>
            <strong style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.company || "Company not added"}</strong>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.job_title || "Job title not added"}</span>
            <span className="cp-muted" style={{ fontSize: 12 }}>{job.status}</span>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="cp-button secondary" style={{ padding: "7px 10px" }} onClick={() => setSelectedJobId(job.id)}>View</button>
              <button type="button" className="cp-button secondary" style={{ padding: "7px 10px" }} onClick={() => restoreJob(job)} disabled={busy}>Restore</button>
            </div>
          </div>)}
        </div>
      </details>
    </section> : null}

    {selectedJob ? <div className="cp-job-modal-backdrop" role="dialog" aria-modal="true" aria-label={`${selectedJob.company || "Job"} details`} onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedJobId(null); }} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(20,30,22,.52)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
      <div className="cp-card" style={{ width: "min(980px, 100%)", maxHeight: "92vh", overflowY: "auto", padding: 22, boxShadow: "0 24px 70px rgba(0,0,0,.22)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 18 }}><div><p className="cp-eyebrow">Job details</p><h2 style={{ marginBottom: 4 }}>{selectedJob.company || "Company not added"}</h2><p className="cp-muted">{selectedJob.job_title || "Job title not added"}</p></div><button type="button" className="cp-button secondary" onClick={() => setSelectedJobId(null)}>Close</button></div>

        <section className="cp-card" style={{ padding: 16, background: "#f8faf7", marginBottom: 18 }}>
          <div className="cp-section-head"><div><p className="cp-eyebrow">Interview board</p><h3>See every interview step</h3><p className="cp-muted">Add each round, who it is with, how it is happening, the date, and your notes afterward.</p></div><button type="button" className="cp-button secondary" onClick={() => addInterviewRound(selectedJob)}>+ Add interview</button></div>
          {(selectedJob.interview_rounds || []).length ? <div style={{ display: "flex", gap: 10, overflowX: "auto", alignItems: "stretch", paddingBottom: 6 }}>
            {(selectedJob.interview_rounds || []).map((round, i) => <div key={round.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div className="cp-card" style={{ width: 300, flex: "0 0 300px", padding: 14 }}>
                <label className="cp-label">Round<input className="cp-input" value={round.label} onChange={(e) => updateRound(selectedJob, round.id, "label", e.target.value)} /></label>
                <label className="cp-label">Type<select className="cp-select" value={round.format} onChange={(e) => updateRound(selectedJob, round.id, "format", e.target.value)}>{formats.map((x) => <option key={x}>{x}</option>)}</select></label>
                <label className="cp-label">Date / time<input className="cp-input" type="datetime-local" value={round.date} onChange={(e) => updateRound(selectedJob, round.id, "date", e.target.value)} /></label>

                <div style={{ marginTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <strong style={{ fontSize: 12 }}>Who is this interview with?</strong>
                    <button type="button" className="cp-link" onClick={() => addInterviewPerson(selectedJob, round.id)}>+ Add person</button>
                  </div>
                  {(round.people || []).length ? (round.people || []).map((person, personIndex) => <div key={person.id} className="cp-card" style={{ padding: 10, marginBottom: 8, background: "#fff" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}><span className="cp-muted" style={{ fontSize: 11, fontWeight: 800 }}>Person {personIndex + 1}</span>{(round.people || []).length > 1 ? <button type="button" className="cp-link" onClick={() => removeInterviewPerson(selectedJob, round.id, person.id)}>Remove</button> : null}</div>
                    <label className="cp-label">Name<input className="cp-input" value={person.name} onChange={(e) => updateInterviewPerson(selectedJob, round.id, person.id, "name", e.target.value)} placeholder="Name" /></label>
                    <label className="cp-label">Title<input className="cp-input" value={person.title} onChange={(e) => updateInterviewPerson(selectedJob, round.id, person.id, "title", e.target.value)} placeholder="Hiring Manager, Recruiter, VP..." /></label>
                    <label className="cp-label">LinkedIn profile<input className="cp-input" value={person.linkedin} onChange={(e) => updateInterviewPerson(selectedJob, round.id, person.id, "linkedin", e.target.value)} placeholder="Paste LinkedIn profile" /></label>
                  </div>) : <button type="button" className="cp-button secondary" onClick={() => addInterviewPerson(selectedJob, round.id)} style={{ width: "100%" }}>+ Add interviewer</button>}
                </div>

                <label className="cp-label">Status<select className="cp-select" value={round.status} onChange={(e) => updateRound(selectedJob, round.id, "status", e.target.value)}>{roundStatuses.map((x) => <option key={x}>{x}</option>)}</select></label>
                <label className="cp-label">Notes after interview<textarea className="cp-textarea" rows={5} value={round.notes} onChange={(e) => updateRound(selectedJob, round.id, "notes", e.target.value)} placeholder="What they asked, how it went, what to remember, follow-up notes..." /></label>
              </div>
              {i < (selectedJob.interview_rounds || []).length - 1 ? <div style={{ fontSize: 26, fontWeight: 900, color: "#82907f" }}>›››</div> : null}
            </div>)}
          </div> : <div className="cp-muted">No interview rounds added yet. When you get an interview, add the first round here.</div>}
        </section>

        <div className="cp-form">
          <div className="cp-form-row"><label className="cp-label">Company<input className="cp-input" value={selectedJob.company || ""} onChange={(e) => patch(selectedJob.id, "company", e.target.value)} /></label><label className="cp-label">Job title<input className="cp-input" value={selectedJob.job_title || ""} onChange={(e) => patch(selectedJob.id, "job_title", e.target.value)} /></label></div>
          <label className="cp-label">Job posting link <span className="cp-muted">(optional, anything can be entered)</span><input className="cp-input" value={selectedJob.job_url || ""} onChange={(e) => patch(selectedJob.id, "job_url", e.target.value)} /></label>
          <div className="cp-form-row"><label className="cp-label">Status<select className="cp-select" value={selectedJob.status} onChange={(e) => patch(selectedJob.id, "status", e.target.value)}>{statuses.map((x) => <option key={x}>{x}</option>)}</select></label><label className="cp-label">Location<input className="cp-input" value={selectedJob.location || ""} onChange={(e) => patch(selectedJob.id, "location", e.target.value)} /></label></div>
          <div className="cp-form-row"><label className="cp-label">Compensation<input className="cp-input" value={selectedJob.compensation || ""} onChange={(e) => patch(selectedJob.id, "compensation", e.target.value)} /></label><label className="cp-label">Work setup<input className="cp-input" value={selectedJob.remote_type || ""} onChange={(e) => patch(selectedJob.id, "remote_type", e.target.value)} /></label></div>
          <div className="cp-form-row"><label className="cp-label">Recruiter name<input className="cp-input" value={selectedJob.recruiter_name || ""} onChange={(e) => patch(selectedJob.id, "recruiter_name", e.target.value)} /></label><label className="cp-label">Recruiter email<input className="cp-input" value={selectedJob.recruiter_email || ""} onChange={(e) => patch(selectedJob.id, "recruiter_email", e.target.value)} /></label></div>
          <div className="cp-form-row"><label className="cp-label">Follow-up date<input className="cp-input" type="date" value={selectedJob.follow_up_date || ""} onChange={(e) => patch(selectedJob.id, "follow_up_date", e.target.value)} /></label><label className="cp-label">Next step date<input className="cp-input" type="date" value={selectedJob.next_step_date || ""} onChange={(e) => patch(selectedJob.id, "next_step_date", e.target.value)} /></label></div>
          <label className="cp-label">Next step<input className="cp-input" value={selectedJob.next_step || ""} onChange={(e) => patch(selectedJob.id, "next_step", e.target.value)} placeholder="2nd interview, follow up, prep, send thank-you..." /></label>
          <label className="cp-label">General notes<textarea className="cp-textarea" value={selectedJob.notes || ""} onChange={(e) => patch(selectedJob.id, "notes", e.target.value)} /></label>
          <details className="cp-card" style={{ padding: 14, background: "#f8faf7" }}><summary style={{ cursor: "pointer", fontWeight: 800 }}>{selectedJob.job_description ? "View / edit saved job description" : "Add the full job description"}</summary><div style={{ marginTop: 12 }}><p className="cp-muted" style={{ marginBottom: 8 }}>Keep the full posting here in case the job disappears online.</p><textarea className="cp-textarea" rows={18} value={selectedJob.job_description || ""} onChange={(e) => patch(selectedJob.id, "job_description", e.target.value)} /></div></details>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}><button type="button" className="cp-button" onClick={() => save(selectedJob)} disabled={busy}>{saveState[selectedJob.id] === "Saving..." ? "Saving..." : "Save changes"}</button>{selectedJob.job_url?.startsWith("http") ? <a className="cp-button secondary" href={selectedJob.job_url} target="_blank" rel="noreferrer">Open posting</a> : null}{selectedJob.archived_at
            ? <button type="button" className="cp-button secondary" onClick={() => restoreJob(selectedJob)} disabled={busy}>Restore job</button>
            : <button type="button" className="cp-button secondary" onClick={() => archiveJob(selectedJob)} disabled={busy}>Archive job</button>}
          <button type="button" className="cp-button secondary" onClick={() => remove(selectedJob)}>Remove</button>{saveState[selectedJob.id] ? <span className="cp-muted" style={{ fontWeight: 700 }}>{saveState[selectedJob.id]}</span> : null}</div>
        </div>

        <section className="cp-section cp-card" style={{ padding: 18, background: "#fbfcfa", border: "1px solid #dde5db" }}>
          <div className="cp-section-head" style={{ marginBottom: 12 }}>
            <div>
              <p className="cp-eyebrow">Messages</p>
              <h3 style={{ marginBottom: 4 }}>Message history</h3>
              <p className="cp-muted">Keep messages you sent for this job in one place so you can reference them later.</p>
            </div>
          </div>

          {(selectedJob.message_history || []).length ? <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
            {[...(selectedJob.message_history || [])].reverse().map((m) => (
              <details className="cp-card" key={m.id} style={{ padding: 14, background: "#fff" }}>
                <summary style={{ cursor: "pointer", fontWeight: 800 }}>
                  {m.to || "Message"}{m.via ? ` · ${m.via === "Other" && m.via_other ? m.via_other : m.via}` : ""}{m.date_sent ? ` · ${m.date_sent}` : ""}
                </summary>
                <div style={{ marginTop: 12 }}>
                  {m.content ? <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{m.content}</div> : <p className="cp-muted">No message content added.</p>}
                  <button type="button" className="cp-button secondary" style={{ marginTop: 12 }} onClick={() => removeJobMessage(selectedJob, m.id)}>Remove message</button>
                </div>
              </details>
            ))}
          </div> : <p className="cp-muted" style={{ marginBottom: 12 }}>No messages logged yet.</p>}

          <details className="cp-card" style={{ padding: 14, background: "#fff" }}>
            <summary style={{ cursor: "pointer", fontWeight: 800 }}>+ Add message</summary>
            <form id={`job-message-form-${selectedJob.id}`} action={(fd) => addJobMessage(selectedJob, fd)} className="cp-form" style={{ marginTop: 12 }}>
              <div className="cp-form-row">
                <label className="cp-label">Message to<input className="cp-input" name="message_to" placeholder="Name or person" /></label>
                <label className="cp-label">Via
                  <select className="cp-select" name="via" defaultValue="" onChange={(e) => setMessageVia((v) => ({ ...v, [selectedJob.id]: e.target.value }))}>
                    <option value="">Choose</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
              {messageVia[selectedJob.id] === "Other" ? <label className="cp-label">Other method<input className="cp-input" name="via_other" placeholder="Text, referral, company portal..." /></label> : null}
              <label className="cp-label">Message content<textarea className="cp-textarea" name="content" rows={6} placeholder="Paste or type the message you sent" /></label>
              <label className="cp-label">Date sent<input className="cp-input" name="date_sent" type="date" /></label>
              <button className="cp-button secondary" disabled={busy}>Save message</button>
            </form>
          </details>
        </section>

        <section className="cp-section cp-card" style={{ padding: 18, background: "#fbfcfa", border: "1px solid #dde5db" }}>
          <div className="cp-section-head" style={{ marginBottom: 14 }}>
            <div>
              <p className="cp-eyebrow">Networking</p>
              <h3 style={{ marginBottom: 4 }}>LinkedIn & outreach</h3>
              <p className="cp-muted">Keep the relationship steps simple. Check each item as you complete it.</p>
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid #dfe6dd", borderRadius: 12, background: "#fff", cursor: "pointer", fontWeight: 800 }}>
            <input
              type="checkbox"
              checked={!!selectedJob.followed_company_linkedin}
              onChange={() => toggleCompanyLinkedIn(selectedJob)}
              style={{ width: 18, height: 18, accentColor: "#294936" }}
            />
            Followed {selectedJob.company || "company"} on LinkedIn
          </label>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            {contacts.filter((c) => c.job_id === selectedJob.id).map((c) => (
              <div className="cp-card" key={c.id} style={{ padding: 14, background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div>
                    <strong style={{ fontSize: 15 }}>{c.name}</strong>
                    {c.title ? <div className="cp-muted" style={{ marginTop: 2 }}>{c.title}</div> : null}
                    {c.linkedin_url ? <a className="cp-link" href={c.linkedin_url} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 4 }}>Open LinkedIn</a> : null}
                  </div>
                  {(c.email || c.phone) ? <div className="cp-muted" style={{ fontSize: 12, textAlign: "right" }}>{c.email ? <div>{c.email}</div> : null}{c.phone ? <div>{c.phone}</div> : null}</div> : null}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginTop: 12 }}>
                  {[
                    ["connected_on_linkedin", "Connected"],
                    ["message_sent", "Message sent"],
                    ["follow_up_sent", "Follow-up sent"],
                  ].map(([key, label]) => (
                    <label key={key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px", border: "1px solid #e2e8e0", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 800, background: c[key as "connected_on_linkedin" | "message_sent" | "follow_up_sent"] ? "#eef5ef" : "#fff" }}>
                      <input
                        type="checkbox"
                        checked={!!c[key as "connected_on_linkedin" | "message_sent" | "follow_up_sent"]}
                        onChange={() => toggleContactProgress(c, key as "connected_on_linkedin" | "message_sent" | "follow_up_sent")}
                        style={{ width: 16, height: 16, accentColor: "#294936" }}
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {(c.outreach_note || c.notes) ? <details style={{ marginTop: 10 }}>
                  <summary className="cp-link" style={{ cursor: "pointer" }}>Contact notes</summary>
                  <div style={{ marginTop: 8 }}>
                    {c.outreach_note ? <div className="cp-contact-note">{c.outreach_note}</div> : null}
                    {c.notes ? <div className="cp-muted" style={{ marginTop: 6 }}>{c.notes}</div> : null}
                  </div>
                </details> : null}
              </div>
            ))}
          </div>

          <details className="cp-card" style={{ padding: 14, marginTop: 12, background: "#fff" }}>
            <summary style={{ cursor: "pointer", fontWeight: 800 }}>+ Add contact</summary>
            <form action={(fd) => addContact(selectedJob.id, fd)} className="cp-form" style={{ marginTop: 12 }}>
              {contactFields()}
              <button className="cp-button secondary" disabled={busy}>Add person</button>
            </form>
          </details>
        </section>
      </div>
    </div> : null}
  </div>;
}
