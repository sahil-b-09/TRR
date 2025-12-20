import React, { Suspense } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { AboutIntro } from "@/components/ui/about-intro";

// Lazy Load Heavy Components
const Testimonials = React.lazy(() => import("@/components/ui/testimonials-columns-1").then(module => ({ default: module.Testimonials })));
const RadialOrbitalTimelineDemo = React.lazy(() => import("@/components/ui/radial-orbital-timeline").then(module => ({ default: module.RadialOrbitalTimelineDemo })));
const SocialConnect = React.lazy(() => import("@/components/ui/connect-with-us").then(module => ({ default: module.SocialConnect })));
const GlowingFeatures = React.lazy(() => import("@/components/ui/glowing-features").then(module => ({ default: module.GlowingFeatures })));
const AdvancedRiskCalculator = React.lazy(() => import("@/components/ui/advanced-risk-calculator").then(module => ({ default: module.AdvancedRiskCalculator })));
const PipCalculator = React.lazy(() => import("@/components/ui/pip-calculator").then(module => ({ default: module.PipCalculator })));

export const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-[#030303] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">

            {/* Floating Tools - Defer loading until hydration */}
            <Suspense fallback={null}>
                <AdvancedRiskCalculator />
                <PipCalculator />
            </Suspense>

            {/* Global Fixed Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl opacity-60" />
            </div>

            <div className="relative z-10">
                <HeroGeometric />
                <AboutIntro />

                <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-white/10">Loading experience...</div>}>
                    <GlowingFeatures />
                    <RadialOrbitalTimelineDemo />
                    <Testimonials />
                    <footer className="relative bg-gradient-to-b from-[#030303] to-black border-t border-white/5">
                        <SocialConnect />
                    </footer>
                </Suspense>
            </div>
        </div>
    );
};
