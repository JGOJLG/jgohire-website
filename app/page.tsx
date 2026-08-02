import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import HowCanIHelp from "@/components/HowCanIHelp";
import Services from "@/components/Services";
import RecruiterAdvantage from "@/components/RecruiterAdvantage";
import FreeResource from "@/components/FreeResource";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LinkedInGuide from "@/components/LinkedInGuide";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <CredibilityStrip />
      <HowCanIHelp />
      <Services />
      <LinkedInGuide />
      <RecruiterAdvantage />
      <FinalCTA />
      <Footer />
    </main>
  );
}