import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const activeInterviewStatuses = ["Recruiter Screen", "Interview", "Final Interview"];

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "America/New_York",
    }).format(new Date())
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function prettyDate(value: string | null | undefined) {
  if (!value) return null;
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

export default async function Portal() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/portal");

  await supabase.rpc("claim_jgo_client_portal");

  const [{ data: client }, { data: guide }] = await Promise.all([
    supabase.from("clients").select("id,name").eq("portal_user_id", user.id).maybeSingle(),
    supabase.from("member_entitlements").select("id").eq("user_id", user.id).eq("entitlement", "linkedin_guide").maybeSingle(),
  ]);

  let jobs: Array<{ id: number; company: string; job_title: string; status: string; next_step: string | null; next_step_date: string | null; updated_at: string }> = [];
  let fileCount = 0;
  let resourceCount = 0;

  if (client) {
    const [jobResult, fileResult, resourceResult] = await Promise.all([
      supabase.from("client_job_applications").select("id,company,job_title,status,next_step,next_step_date,updated_at").order("updated_at", { ascending: false }).limit(8),
      supabase.from("client_files").select("id", { count: "exact", head: true }).eq("visible_in_portal", true).eq("archived", false),
      supabase.from("client_portal_resources").select("id", { count: "exact", head: true }),
    ]);
    jobs = jobResult.data ?? [];
    fileCount = fileResult.count ?? 0;
    resourceCount = resourceResult.count ?? 0;
  }

  const first = client?.name?.trim().split(/\s+/)[0] || user.email?.split("@")[0] || "there";
  const applications = jobs.filter((job) => job.status !== "Interested").length;
  const interviewing = jobs.filter((job) => activeInterviewStatuses.includes(job.status)).length;
  const offers = jobs.filter((job) => job.status === "Offer").length;
  const nextJob = [...jobs]
    .filter((job) => job.next_step_date)
    .sort((a, b) => String(a.next_step_date).localeCompare(String(b.next_step_date)))[0];

  const primaryAction = client
    ? jobs.length === 0
      ? { href: "/client-portal/jobs", eyebrow: "Start here", title: "Add your first job", body: "Build your tracker as you browse so applications, interviews, and follow-ups never get lost.", cta: "Open Job Tracker" }
      : nextJob
        ? { href: "/client-portal/jobs", eyebrow: "Your next move", title: nextJob.next_step || `Follow up with ${nextJob.company}`, body: `${nextJob.company} · ${nextJob.job_title}${nextJob.next_step_date ? ` · ${prettyDate(nextJob.next_step_date)}` : ""}`, cta: "View in Job Tracker" }
        : guide
          ? { href: "/course", eyebrow: "Keep your momentum", title: "Continue your LinkedIn Guide", body: "Pick up your profile optimization course where you left off.", cta: "Continue Guide" }
          : { href: "/client-portal/files", eyebrow: "Your workspace", title: "Review your latest documents", body: "Your JGO Hire files and deliverables are organized and ready whenever you need them.", cta: "Open Documents" }
    : guide
      ? { href: "/course", eyebrow: "Your next move", title: "Continue your LinkedIn Guide", body: "Your complete LinkedIn optimization course is ready whenever you are.", cta: "Continue Guide" }
      : null;

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#213027]">
      <div className="mx-auto max-w-[1280px] px-4 pb-20 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-[#ddd8cf]/80 bg-[#f4f1ea]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <Link href="/portal" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4f6449] text-sm font-black tracking-wide text-white">JGO</span>
            <div className="hidden sm:block">
              <p className="font-serif text-lg leading-none">JGO Hire</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#758071]">Member Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[260px] truncate text-sm text-[#6f796f] md:block">{user.email}</span>
            <form action="/auth/signout" method="post">
              <button className="rounded-xl border border-[#d7d3ca] bg-white px-4 py-2 text-sm font-bold text-[#4f6449] shadow-sm transition hover:-translate-y-0.5">Log out</button>
            </form>
          </div>
        </header>

        <section className="pt-9 sm:pt-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#708267]">Your JGO workspace</p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{greeting()}, {first}.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#68746a] sm:text-lg">Everything you have with JGO Hire lives here. One login, one place, and a clear next step every time you come back.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {client ? <Link href="/client-portal/jobs" className="rounded-xl bg-[#4f6449] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5">+ Add a job</Link> : null}
              {client ? <Link href="/client-portal/files" className="rounded-xl border border-[#d7d3ca] bg-white px-4 py-2.5 text-sm font-bold text-[#4f6449] shadow-sm">Documents</Link> : null}
              {guide ? <Link href="/course" className="rounded-xl border border-[#d7d3ca] bg-white px-4 py-2.5 text-sm font-bold text-[#4f6449] shadow-sm">LinkedIn Guide</Link> : null}
            </div>
          </div>

          {primaryAction ? (
            <Link href={primaryAction.href} className="group mt-8 block overflow-hidden rounded-[28px] border border-[#cad5c5] bg-[#e8eee3] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-[#617357]">{primaryAction.eyebrow}</p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{primaryAction.title}</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-[#617064]">{primaryAction.body}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-xl bg-[#4f6449] px-5 py-3 text-sm font-bold text-white">
                  {primaryAction.cta}<span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ) : null}

          {client ? (
            <section className="mt-8">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-[#758071]">Job search snapshot</p>
                  <h2 className="mt-1 font-serif text-2xl">Know where things stand at a glance.</h2>
                </div>
                <Link href="/client-portal/jobs" className="hidden text-sm font-bold text-[#4f6449] sm:block">Open full tracker →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Link href="/client-portal/jobs" className="rounded-2xl border border-[#dedbd3] bg-white p-5 shadow-sm transition hover:-translate-y-0.5"><p className="text-xs font-bold uppercase tracking-wide text-[#7d877e]">Applications</p><p className="mt-2 text-3xl font-black">{applications}</p><p className="mt-1 text-xs text-[#8a938b]">roles in motion</p></Link>
                <Link href="/client-portal/jobs" className="rounded-2xl border border-[#dedbd3] bg-white p-5 shadow-sm transition hover:-translate-y-0.5"><p className="text-xs font-bold uppercase tracking-wide text-[#7d877e]">Interviewing</p><p className="mt-2 text-3xl font-black">{interviewing}</p><p className="mt-1 text-xs text-[#8a938b]">active conversations</p></Link>
                <Link href="/client-portal/jobs" className="rounded-2xl border border-[#dedbd3] bg-white p-5 shadow-sm transition hover:-translate-y-0.5"><p className="text-xs font-bold uppercase tracking-wide text-[#7d877e]">Offers</p><p className="mt-2 text-3xl font-black">{offers}</p><p className="mt-1 text-xs text-[#8a938b]">offer stage</p></Link>
                <Link href="/client-portal/jobs" className="rounded-2xl border border-[#dedbd3] bg-white p-5 shadow-sm transition hover:-translate-y-0.5"><p className="text-xs font-bold uppercase tracking-wide text-[#7d877e]">Next step</p><p className="mt-2 text-xl font-black">{nextJob?.next_step_date ? prettyDate(nextJob.next_step_date) : "Clear"}</p><p className="mt-1 truncate text-xs text-[#8a938b]">{nextJob ? nextJob.company : "nothing scheduled"}</p></Link>
              </div>
            </section>
          ) : null}

          <section className="mt-9">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#758071]">Your workspace</p>
              <h2 className="mt-1 font-serif text-2xl">Everything you have access to.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {client ? <Link href="/client-portal/jobs" className="group rounded-[24px] border border-[#d8ded4] bg-[#edf2e9] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between"><span className="rounded-xl bg-white px-3 py-2 text-lg shadow-sm">⌁</span><span className="text-xs font-black uppercase tracking-wide text-[#6c7b66]">Career Portal</span></div><h3 className="mt-6 font-serif text-3xl">Job Tracker</h3><p className="mt-2 leading-6 text-[#69746b]">Track every role, interview, follow-up, and offer in one simple workspace.</p><p className="mt-6 text-sm font-black text-[#4f6449]">Open tracker <span className="transition group-hover:translate-x-1">→</span></p></Link> : null}
              {client ? <Link href="/client-portal/files" className="group rounded-[24px] border border-[#dedbd3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between"><span className="rounded-xl bg-[#f4f1ea] px-3 py-2 text-lg">▤</span><span className="rounded-full bg-[#f4f1ea] px-3 py-1 text-xs font-black">{fileCount}</span></div><h3 className="mt-6 font-serif text-3xl">Documents</h3><p className="mt-2 leading-6 text-[#69746b]">Resumes, cover letters, reports, and final deliverables shared with you.</p><p className="mt-6 text-sm font-black text-[#4f6449]">View documents →</p></Link> : null}
              {client ? <Link href="/client-portal/resources" className="group rounded-[24px] border border-[#dedbd3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between"><span className="rounded-xl bg-[#f4f1ea] px-3 py-2 text-lg">✦</span><span className="rounded-full bg-[#f4f1ea] px-3 py-1 text-xs font-black">{resourceCount}</span></div><h3 className="mt-6 font-serif text-3xl">Resources</h3><p className="mt-2 leading-6 text-[#69746b]">Templates, interview prep, guides, and tools selected for your search.</p><p className="mt-6 text-sm font-black text-[#4f6449]">Browse resources →</p></Link> : null}
              {guide ? <Link href="/course" className="group rounded-[24px] border border-[#cfd9c9] bg-[#253329] p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between"><span className="rounded-xl bg-white/10 px-3 py-2 text-lg">in</span><span className="text-xs font-black uppercase tracking-wide text-[#c8d5c3]">Lifetime access</span></div><h3 className="mt-6 font-serif text-3xl">LinkedIn Optimization Guide</h3><p className="mt-2 leading-6 text-[#c8d1ca]">Build a stronger profile with the complete JGO Hire LinkedIn course.</p><p className="mt-6 text-sm font-black text-white">Continue guide →</p></Link> : null}
            </div>
          </section>

          {client && jobs.length > 0 ? (
            <section className="mt-9 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
              <div className="rounded-[24px] border border-[#dedbd3] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#758071]">Recent activity</p><h2 className="mt-1 font-serif text-2xl">Your search is moving.</h2></div><Link href="/client-portal/jobs" className="text-sm font-black text-[#4f6449]">See all</Link></div>
                <div className="mt-5 divide-y divide-[#eeeae2]">{jobs.slice(0, 4).map((job) => <Link href="/client-portal/jobs" key={job.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div className="min-w-0"><p className="truncate font-bold">{job.job_title}</p><p className="mt-1 truncate text-sm text-[#778079]">{job.company}</p></div><span className="shrink-0 rounded-full bg-[#f1f4ee] px-3 py-1.5 text-xs font-bold text-[#5f7158]">{job.status}</span></Link>)}</div>
              </div>
              <div className="rounded-[24px] bg-[#e9e2d5] p-6"><p className="text-xs font-black uppercase tracking-[.16em] text-[#756b5c]">Need a reset?</p><h2 className="mt-2 font-serif text-2xl">Use the portal as your job-search home base.</h2><p className="mt-3 text-sm leading-6 text-[#746d62]">Update the tracker after every application or interview. Future-you will thank you.</p><Link href="/client-portal/jobs" className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-black text-[#4f6449] shadow-sm">Update tracker</Link></div>
            </section>
          ) : null}

          {!client && !guide ? (
            <div className="mt-8 rounded-[24px] border border-[#dedbd3] bg-white p-8 shadow-sm"><p className="text-xs font-black uppercase tracking-[.18em] text-[#758071]">Account ready</p><h2 className="mt-2 font-serif text-3xl">Your JGO account is active.</h2><p className="mt-3 max-w-2xl leading-7 text-[#69746b]">There are no client services or purchased products connected to this email yet. If you expected access, contact JGO Hire and we&apos;ll get it connected.</p></div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
