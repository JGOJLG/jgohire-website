import Link from "next/link";

export default function FreeSurvivalGuide() {
  return (
    <section
      style={{
        padding: "96px 20px",
        background:
          "linear-gradient(135deg, #edf2eb 0%, #f8f5ef 55%, #eef2eb 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1160px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "32px",
            border: "1px solid rgba(93, 116, 91, 0.18)",
            background: "rgba(255, 255, 255, 0.72)",
            boxShadow:
              "0 30px 80px rgba(43, 61, 47, 0.08)",
            padding: "clamp(36px, 6vw, 72px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "330px",
              height: "330px",
              borderRadius: "999px",
              right: "-120px",
              top: "-150px",
              background:
                "rgba(99, 122, 91, 0.10)",
              filter: "blur(3px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              maxWidth: "820px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#637a5b",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Free JGO Hire Resource
            </p>

            <h2
              style={{
                margin: "16px 0 0",
                color: "#223028",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(42px, 6vw, 68px)",
                lineHeight: 1,
                fontWeight: 500,
                letterSpacing: "-0.045em",
              }}
            >
              Your job search could use a{" "}
              <em
                style={{
                  color: "#637a5b",
                  fontWeight: 400,
                }}
              >
                survival guide.
              </em>
            </h2>

            <p
              style={{
                margin: "24px 0 0",
                maxWidth: "720px",
                color: "#5e6a62",
                fontSize: "17px",
                lineHeight: 1.75,
              }}
            >
              The modern job search is a lot.
              Conflicting resume advice, AI, endless
              applications, ghosting, interviews that go
              nowhere. I put together 7 recruiter-backed
              rules to help you cut through the noise and
              focus on what actually matters.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              {[
                "7 Survival Rules",
                "Recruiter Perspective",
                "30-Second Quiz",
                "Free PDF",
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "9px 13px",
                    borderRadius: "999px",
                    background: "#eef2eb",
                    border:
                      "1px solid rgba(99, 122, 91, 0.14)",
                    color: "#4d6247",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: "34px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <Link
                href="/freesurvivalguide"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "52px",
                  padding: "14px 24px",
                  borderRadius: "14px",
                  background: "#4d6247",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow:
                    "0 12px 28px rgba(77, 98, 71, 0.18)",
                }}
              >
                Get the Free Survival Guide →
              </Link>

              <p
                style={{
                  margin: 0,
                  maxWidth: "330px",
                  color: "#7b857d",
                  fontSize: "12px",
                  lineHeight: 1.55,
                }}
              >
                Plus, take my 30-second quiz to find out
                what kind of job seeker you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}