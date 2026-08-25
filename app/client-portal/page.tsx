import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ClientPortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/client-access?next=/client-portal");

  const { data: profile } = await supabase
    .from("client_portal_profiles")
    .select("first_name,last_name")
    .eq("user_id", user.id)
    .maybeSingle();

  const firstName = profile?.first_name || user.user_metadata?.first_name || "there";

  return (
    <main className="min-h-screen bg-[#f5f1ea] px-5 py-10 text-[#223028]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#637a5b]">JGO Hire Client Portal</p><h1 className="mt-2 font-serif text-4xl">Hi, {firstName}.</h1><p className="mt-2 text-[#667168]">Everything for your job search, in one place.</p></div>
          <Link href="/auth/signout" className="text-sm font-semibold text-[#637a5b]">Sign out</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/client-portal/files" className="rounded-2xl border border-[#e0ddd5] bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-[#637a5b]">My Documents</p><h2 className="mt-2 font-serif text-2xl">Resume + Files</h2><p className="mt-2 text-sm leading-6 text-[#667168]">Your latest resume, cover letters, reports, and documents from JGO Hire.</p></Link>
          <Link href="/client-portal/jobs" className="rounded-2xl border border-[#d8dfd4] bg-[#eef2eb] p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-[#637a5b]">Job Search</p><h2 className="mt-2 font-serif text-2xl">Job Tracker</h2><p className="mt-2 text-sm leading-6 text-[#667168]">A simple spreadsheet-style place to track applications, interviews, follow-ups, and offers.</p></Link>
          <Link href="/client-portal/resources" className="rounded-2xl border border-[#e0ddd5] bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-[#637a5b]">JGO Library</p><h2 className="mt-2 font-serif text-2xl">Resources</h2><p className="mt-2 text-sm leading-6 text-[#667168]">Guides, templates, interview prep, and resources shared with you.</p></Link>
        </div>
      </div>
    </main>
  );
}
