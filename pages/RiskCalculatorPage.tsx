import React from "react";
import { AdvancedRiskCalculator } from "@/components/ui/advanced-risk-calculator";
import { SocialConnect } from "@/components/ui/connect-with-us";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const RiskCalculatorPage = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200">

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-black/50 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <div className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                        The Rich Royals Tools
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: The Calculator (Sticky) */}
                    <div className="lg:sticky lg:top-24">
                        <div className="relative z-10">
                            <AdvancedRiskCalculator isInline={true} />
                        </div>
                        {/* Decorator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                    </div>

                    {/* Right Column: SEO Content */}
                    <div className="prose prose-invert prose-lg text-neutral-300">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Master Your Risk with the <span className="text-emerald-400">Advanced Risk Calculator</span>
                        </h1>

                        <p className="text-xl leading-relaxed text-neutral-400 mb-8">
                            In the volatile world of Forex and Gold trading, <strong className="text-white">risk management</strong> is the only shield between you and a blown account. Our professional-grade calculator helps you determine the exact lot size for every trade, ensuring you never risk more than you can afford.
                        </p>

                        <h3>How to use this Calculator?</h3>
                        <ol className="space-y-4 mb-8">
                            <li><strong>Enter Account Balance:</strong> Start with your current equity (e.g., $10,000).</li>
                            <li><strong>Select Pair:</strong> Choose from major Forex pairs or Gold (XAUUSD).</li>
                            <li><strong>Define Risk:</strong> Input your risk tolerance (e.g., 1% or $100).</li>
                            <li><strong>Set Stop Loss:</strong> Enter the distance to your Stop Loss in Pips.</li>
                            <li><strong>Get Results:</strong> The calculator instantly shows your <strong>Standard Lots</strong>, <strong>Commission</strong>, and true <strong>Dollar Risk</strong>.</li>
                        </ol>

                        <h3>Why Risk Management Matters?</h3>
                        <p>
                            Professional traders don't focus on "how much I can make." They focus on "how much I could lose." By using the <em>The Rich Royals Risk Calculator</em>, you align yourself with the top 1% of traders who execute with mathematical precision.
                        </p>

                        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-white m-0 mb-2">Ready to trade professionally?</h4>
                            <p className="text-sm mb-4">Join our mentorship to learn the strategies behind the numbers.</p>
                            <Link to="/" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold transition-all">
                                Join The Rich Royals
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="border-t border-white/5 bg-black">
                <SocialConnect />
            </footer>
        </div>
    );
};
