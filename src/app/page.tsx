import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { Features } from "@/components/landing/features";
import { WallPreview } from "@/components/landing/wall-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { AnimatedMeshBg } from "@/components/landing/animated-bg";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] relative">
      <AnimatedMeshBg />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DashboardPreview />
        <section id="features">
          <Features />
        </section>
        <WallPreview />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
