import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import PayPageClient from "./PayPageClient";
import "./pay.css";

export const metadata: Metadata = {
  title: "Make a Payment | JGO Hire",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PayPage() {
  return (
    <main>
      <SiteHeader />
      <PayPageClient />
    </main>
  );
}
