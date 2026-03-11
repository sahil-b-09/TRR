import React, { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";

// Lazy Load Dedicated Tool Pages
const RiskCalculatorPage = React.lazy(() => import("@/pages/RiskCalculatorPage").then(module => ({ default: module.RiskCalculatorPage })));
const PipCalculatorPage = React.lazy(() => import("@/pages/PipCalculatorPage").then(module => ({ default: module.PipCalculatorPage })));
const RedirectPage = React.lazy(() => import("@/pages/RedirectPage").then(module => ({ default: module.RedirectPage })));

import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tools/risk-calculator" element={<RiskCalculatorPage />} />
            <Route path="/tools/pip-calculator" element={<PipCalculatorPage />} />
            <Route path="/join" element={<RedirectPage />} />
          </Routes>
        </Suspense>

      </Router >
      <SpeedInsights />
    </>
  );
}
