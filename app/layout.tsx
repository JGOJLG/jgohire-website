import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JGO Hire | Career Coach & Recruiter",
  description:
    "Recruiter-backed career coaching, resume strategy, LinkedIn optimization, interview preparation, and job search support.",
  metadataBase: new URL("https://www.jgohire.com"),

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },

  openGraph: {
    title: "JGO Hire | Career Coach & Recruiter",
    description:
      "Career coaching and recruiter-backed strategy to help job seekers move forward with clarity.",
    url: "https://www.jgohire.com",
    siteName: "JGO Hire",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}