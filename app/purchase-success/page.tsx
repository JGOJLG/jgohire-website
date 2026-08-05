import Link from "next/link";
import CreateAccountForm from "./CreateAccountForm";
import "./purchase-success.css";

type PurchaseSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PurchaseSuccessPage({
  searchParams,
}: PurchaseSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  return (
    <main className="purchase-success-page">
      <div className="purchase-success-glow purchase-success-glow-one" />
      <div className="purchase-success-glow purchase-success-glow-two" />

      <section className="purchase-success-shell">
        <Link href="/" className="purchase-success-logo">
          <span>JGO HIRE</span>
          <small>Career Coach + Recruiter</small>
        </Link>

        <div className="purchase-success-grid">
          <div className="purchase-success-copy">
            <span className="purchase-success-pill">Purchase Complete</span>

            <h1>Your LinkedIn course is ready.</h1>

            <p>
              Create your member account using the same email address you used
              at checkout. Once your account is created, you will be taken
              directly to the course.
            </p>

            <div className="purchase-success-details">
              <div>
                <span>Included</span>
                <strong>Lifetime Access</strong>
              </div>

              <div>
                <span>Course</span>
                <strong>LinkedIn Optimization Guide</strong>
              </div>
            </div>

            <p className="purchase-success-login-copy">
              Already created your account?{" "}
              <Link href="/login?redirect=/course">Log in here.</Link>
            </p>
          </div>

          <CreateAccountForm sessionId={sessionId ?? ""} />
        </div>
      </section>
    </main>
  );
}
