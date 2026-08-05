import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";
import "./login.css";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect("/course");
  }

  return (
    <main className="course-login-page">
      <header className="course-login-header">
        <Link href="/" className="course-login-logo">
          <span>JGO HIRE</span>
          <small>Career Coach + Recruiter</small>
        </Link>

        <Link href="/guide" className="course-login-back">
          Back to Guide
        </Link>
      </header>

      <section className="course-login-shell">
        <div className="course-login-intro">
          <div className="course-login-badge">
            <span aria-hidden="true">✦</span>
            Member Access
          </div>

          <p className="course-login-eyebrow">LinkedIn Optimization Guide</p>

          <h1>
            Welcome
            <br />
            back.
          </h1>

          <p className="course-login-description">
            Log in to continue where you left off and access your complete
            LinkedIn Optimization Guide.
          </p>

          <div className="course-login-benefits">
            <div>
              <span aria-hidden="true">✓</span>
              <p>Continue your course anytime</p>
            </div>

            <div>
              <span aria-hidden="true">✓</span>
              <p>Access every lesson in one place</p>
            </div>

            <div>
              <span aria-hidden="true">✓</span>
              <p>Lifetime access to your guide</p>
            </div>
          </div>
        </div>

        <div className="course-login-card-wrap">
          <div className="course-login-glow" aria-hidden="true" />

          <div className="course-login-card">
            <div className="course-login-card-icon" aria-hidden="true">
              JGO
            </div>

            <p className="course-login-card-label">Member Login</p>
            <h2>Continue learning</h2>

            <LoginForm />

            <div className="course-login-divider">
              <span />
              <p>JGO Hire Members</p>
              <span />
            </div>

            <p className="course-login-help">
              Most access issues can be fixed instantly with a password reset.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
