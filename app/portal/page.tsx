import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Job = {
  id: number;
  company: string;
  job_title: string;
  status: string;
  next_step: string | null;
  next_step_date: string | null;
  updated_at: string | null;
};

const interviewStatuses = ["Recruiter Screen", "Interview", "Final Interview"];

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

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/portal");

  await Promise.all([
    supabase.rpc("claim_jgo_client_portal"),
    supabase.rpc("claim_member_entitlements"),
  ]);

  const [{ data: client }, { data: guide }] = await Promise.all([
    supabase
      .from("clients")
      .select("id,name")
      .eq("portal_user_id", user.id)
      .maybeSingle(),
    supabase
      .from("member_entitlements")
      .select("id")
      .eq("user_id", user.id)
      .eq("entitlement", "linkedin_guide")
      .maybeSingle(),
  ]);

  let jobs: Job[] = [];
  let fileCount = 0;
  let resourceCount = 0;

  if (client) {
    const [jobsResult, filesResult, resourcesResult] = await Promise.all([
      supabase
        .from("client_job_applications")
        .select("id,company,job_title,status,next_step,next_step_date,updated_at")
        .order("updated_at", { ascending: false })
        .limit(8),
      supabase
        .from("client_files")
        .select("id", { count: "exact", head: true })
        .eq("visible_in_portal", true)
        .eq("archived", false),
      supabase
        .from("client_portal_resources")
        .select("id", { count: "exact", head: true }),
    ]);

    jobs = (jobsResult.data ?? []) as Job[];
    fileCount = filesResult.count ?? 0;
    resourceCount = resourcesResult.count ?? 0;
  }

  const firstName =
    client?.name?.trim().split(/\s+/)[0] || user.email?.split("@")[0] || "there";

  const applications = jobs.filter((job) => job.status !== "Interested").length;
  const interviewing = jobs.filter((job) => interviewStatuses.includes(job.status)).length;
  const offers = jobs.filter((job) => job.status === "Offer").length;
  const upcoming = [...jobs]
    .filter((job) => job.next_step_date)
    .sort((a, b) => String(a.next_step_date).localeCompare(String(b.next_step_date)))[0];

  const nextAction = client
    ? jobs.length === 0
      ? {
          eyebrow: "Start here",
          title: "Add your first opportunity",
          body: "Keep every role, follow-up, and interview in one place from the moment it catches your eye.",
          href: "/client-portal/jobs",
          cta: "Start my tracker",
        }
      : upcoming
        ? {
            eyebrow: "Next up",
            title: upcoming.next_step || `Follow up with ${upcoming.company}`,
            body: `${upcoming.company} · ${upcoming.job_title}${upcoming.next_step_date ? ` · ${formatDate(upcoming.next_step_date)}` : ""}`,
            href: "/client-portal/jobs",
            cta: "View next step",
          }
        : guide
          ? {
              eyebrow: "Keep going",
              title: "Continue your LinkedIn Guide",
              body: "Jump back into your profile optimization course and keep building momentum.",
              href: "/course",
              cta: "Continue guide",
            }
          : {
              eyebrow: "Your workspace",
              title: "Review your latest documents",
              body: "Your JGO Hire files and deliverables are ready whenever you need them.",
              href: "/client-portal/files",
              cta: "Open documents",
            }
    : guide
      ? {
          eyebrow: "Continue learning",
          title: "Your LinkedIn Guide is ready",
          body: "Pick up your LinkedIn optimization course exactly where you left off.",
          href: "/course",
          cta: "Continue guide",
        }
      : null;

  const statCards = [
    { label: "Applications", value: applications, detail: "roles in motion" },
    { label: "Interviewing", value: interviewing, detail: "active conversations" },
    { label: "Offers", value: offers, detail: "offer stage" },
    {
      label: "Next step",
      value: upcoming?.next_step_date ? formatDate(upcoming.next_step_date) : "Clear",
      detail: upcoming?.company || "nothing scheduled",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1f2c24]">
      <div className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-30 -mx-4 flex items-center justify-between border-b border-[#e4e0d8]/90 bg-[#f7f5f0]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <Link href="/portal" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#40563f] text-[11px] font-black tracking-[0.12em] text-white shadow-sm">
              JGO
            </div>
            <div>
              <p className="font-serif text-lg leading-none text-[#26352a]">JGO Hire</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a9188]">
                Member Portal
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden max-w-[260px] truncate text-sm text-[#7a837a] md:block">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <button className="rounded-xl border border-[#d9d5cd] bg-white px-4 py-2 text-sm font-bold text-[#40563f] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                Log out
              </button>
            </form>
          </div>
        </header>

        <section className="pt-10 sm:pt-14">
          <div className="grid gap-8 xl:grid-cols-[1.5fr_.8fr] xl:items-end">
            <div>
              <span className="inline-flex rounded-full border border-[#dce4d8] bg-[#edf2e9] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#60725c]">
                Your JGO workspace
              </span>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                {greeting()}, {firstName}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#6d776e] sm:text-lg">
                Everything you have with JGO Hire lives here. One login, one place, and a clear next move every time you come back.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#e2ded6] bg-white p-5 shadow-[0_16px_45px_rgba(49,63,51,0.05)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8a9188]">Account access</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {client ? (
                  <span className="rounded-full bg-[#edf2e9] px-3 py-2 text-xs font-bold text-[#52674f]">Career Portal</span>
                ) : null}
                {guide ? (
                  <span className="rounded-full bg-[#26352a] px-3 py-2 text-xs font-bold text-white">LinkedIn Guide</span>
                ) : null}
                {!client && !guide ? (
                  <span className="rounded-full bg-[#f2efe9] px-3 py-2 text-xs font-bold text-[#777d76]">Member account</span>
                ) : null}
              </div>
            </div>
          </div>

          {nextAction ? (
            <Link
              href={nextAction.href}
              className="group mt-10 grid overflow-hidden rounded-[32px] border border-[#cad6c6] bg-[#e9efe5] shadow-[0_18px_55px_rgba(61,79,60,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_65px_rgba(61,79,60,0.12)] lg:grid-cols-[1fr_auto]"
            >
              <div className="p-7 sm:p-9 lg:p-10">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#60725c]">{nextAction.eyebrow}</p>
                <h2 className="mt-3 max-w-3xl font-serif text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl">{nextAction.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#617064]">{nextAction.body}</p>
              </div>
              <div className="flex items-end justify-between gap-5 border-t border-[#d6dfd2] bg-white/35 p-7 lg:w-[260px] lg:flex-col lg:items-start lg:justify-between lg:border-l lg:border-t-0 lg:p-8">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#758172]">Recommended</span>
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#40563f]">
                  {nextAction.cta}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ) : null}

          {client ? (
            <section className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a9188]">Job search snapshot</p>
                  <h2 className="mt-1 font-serif text-2xl sm:text-3xl">See where things stand at a glance.</h2>
                </div>
                <Link href="/client-portal/jobs" className="hidden text-sm font-black text-[#40563f] sm:block">Open tracker →</Link>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {statCards.map((card) => (
                  <Link
                    href="/client-portal/jobs"
                    key={card.label}
                    className="rounded-[24px] border border-[#e2ded6] bg-white p-5 shadow-[0_10px_30px_rgba(49,63,51,0.04)] transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8b928b]">{card.label}</p>
                    <p className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#26352a] sm:text-4xl">{card.value}</p>
                    <p className="mt-1 truncate text-xs text-[#929991]">{card.detail}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a9188]">Your space</p>
              <h2 className="mt-1 font-serif text-3xl tracking-[-0.02em] sm:text-4xl">Jump into what you need.</h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {client ? (
                <>
                  <Link href="/client-portal/jobs" className="group rounded-[28px] border border-[#d3ddd0] bg-[#eaf0e6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-[#4a6048] shadow-sm">↗</div>
                    <h3 className="mt-7 font-serif text-3xl">Job Tracker</h3>
                    <p className="mt-2 text-sm leading-6 text-[#667266]">Track opportunities, applications, interviews, next steps, and offers.</p>
                    <p className="mt-7 text-sm font-black text-[#40563f]">Open tracker <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                  </Link>

                  <Link href="/client-portal/files" className="group rounded-[28px] border border-[#e2ded6] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3f1eb] text-lg">▤</div>
                      <span className="rounded-full bg-[#f3f1eb] px-3 py-1.5 text-xs font-black text-[#6f786f]">{fileCount} files</span>
                    </div>
                    <h3 className="mt-7 font-serif text-3xl">Documents</h3>
                    <p className="mt-2 text-sm leading-6 text-[#737b74]">Your resumes, cover letters, reports, and final deliverables.</p>
                    <p className="mt-7 text-sm font-black text-[#40563f]">View documents <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                  </Link>

                  <Link href="/client-portal/resources" className="group rounded-[28px] border border-[#e2ded6] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3f1eb] text-lg">✦</div>
                      <span className="rounded-full bg-[#f3f1eb] px-3 py-1.5 text-xs font-black text-[#6f786f]">{resourceCount} resources</span>
                    </div>
                    <h3 className="mt-7 font-serif text-3xl">Resources</h3>
                    <p className="mt-2 text-sm leading-6 text-[#737b74]">Guides, templates, interview prep, and tools selected for you.</p>
                    <p className="mt-7 text-sm font-black text-[#40563f]">Browse library <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                  </Link>
                </>
              ) : null}

              {guide ? (
                <Link href="/course" className="group rounded-[28px] bg-[#26352a] p-6 text-white shadow-[0_16px_45px_rgba(38,53,42,0.18)] transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg">◎</div>
                  <p className="mt-7 text-[11px] font-black uppercase tracking-[0.15em] text-[#bdcbbb]">Lifetime access</p>
                  <h3 className="mt-2 font-serif text-3xl">LinkedIn Guide</h3>
                  <p className="mt-2 text-sm leading-6 text-[#c8d1ca]">Your complete LinkedIn profile optimization course.</p>
                  <p className="mt-7 text-sm font-black">Continue guide <span className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                </Link>
              ) : (
                <div className="rounded-[28px] border border-[#d8e0d3] bg-[#edf2e9] p-6 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#60725c]">Available to purchase</p>
                  <h3 className="mt-4 font-serif text-3xl">LinkedIn Guide</h3>
                  <p className="mt-2 text-sm leading-6 text-[#667266]">A complete, step-by-step LinkedIn optimization course with lifetime access.</p>
                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-base font-bold text-[#8d958c] line-through">$500</span>
                    <span className="text-3xl font-black text-[#31452f]">$150</span>
                  </div>
                  <form action="/api/checkout" method="post">
                    <button className="mt-5 w-full rounded-xl bg-[#40563f] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      Purchase guide →
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>

          {client && jobs.length > 0 ? (
            <section className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
              <div className="rounded-[30px] border border-[#e2ded6] bg-white p-6 shadow-[0_12px_35px_rgba(49,63,51,0.05)] sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8a9188]">Recent activity</p>
                    <h2 className="mt-1 font-serif text-3xl">Your search is moving.</h2>
                  </div>
                  <Link href="/client-portal/jobs" className="text-sm font-black text-[#40563f]">View all →</Link>
                </div>
                <div className="mt-5 divide-y divide-[#efebe4]">
                  {jobs.slice(0, 4).map((job) => (
                    <Link href="/client-portal/jobs" key={job.id} className="flex items-center justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#26352a]">{job.company}</p>
                        <p className="mt-0.5 truncate text-sm text-[#818981]">{job.job_title}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#eef2ea] px-3 py-1.5 text-xs font-black text-[#5e705a]">{job.status}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] bg-[#e8dfd2] p-7 text-[#4d4439] shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#807565]">Built to keep things simple</p>
                <h2 className="mt-3 font-serif text-3xl">Your career search should feel organized, not overwhelming.</h2>
                <p className="mt-4 text-sm leading-6 text-[#6e6458]">Use the portal as your home base. Track the role, take the next step, grab your documents, and keep moving.</p>
              </div>
            </section>
          ) : null}
        </section>
      </div>
    </main>
  );
}
