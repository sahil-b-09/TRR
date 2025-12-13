import React from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { AboutIntro } from "@/components/ui/about-intro";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline";
import { SocialConnect } from "@/components/ui/connect-with-us";
import { GlowingFeatures } from "@/components/ui/glowing-features";
import { AdvancedRiskCalculator } from "@/components/ui/advanced-risk-calculator";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      <AdvancedRiskCalculator />
      {/* Global Fixed Atmosphere - Creates the immersive deep space feel everywhere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroGeometric />

        {/* About Introduction Section (Founder focus) */}
        <AboutIntro />

        {/* Features Grid (Merged "Why Choose Us" into Glowing Features) */}
        <GlowingFeatures />

        {/* Course Syllabus / Timeline */}
        <RadialOrbitalTimelineDemo />

        {/* Testimonials */}
        <Testimonials />

        {/* Footer / Connect */}
        <footer className="relative bg-gradient-to-b from-[#030303] to-black border-t border-white/5">
          <SocialConnect />
        </footer>
      </div>
    </div>
  );
}
