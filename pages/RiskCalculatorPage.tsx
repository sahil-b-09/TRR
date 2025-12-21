import React from "react";
import { AdvancedRiskCalculator } from "@/components/ui/advanced-risk-calculator";
import { SocialConnect } from "@/components/ui/connect-with-us";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const RiskCalculatorPage = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200">

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium hidden sm:inline">Back to Home</span>
                        <span className="font-medium sm:hidden">Home</span>
                    </Link>
                    <div className="font-bold text-base md:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                        Risk Calculator
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">

                    {/* SECTION 1: THE TOOL (Mobile First Order) */}
                    <div className="w-full lg:w-1/2 lg:order-last lg:sticky lg:top-24">
                        {/* Mobile Headline for Context */}
                        <div className="lg:hidden mb-6 text-center">
                            <h1 className="text-2xl font-bold text-white mb-2">
                                Position Size <span className="text-emerald-400">Calculator</span>
                            </h1>
                            <p className="text-sm text-neutral-400">Manage every trade with precision.</p>
                        </div>

                        <div className="relative z-10 w-full">
                            <AdvancedRiskCalculator isInline={true} />
                        </div>
                        {/* Decorator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                    </div>

                    {/* SECTION 2: THE CONTENT (Pushed Below on Mobile) */}
                    <div className="w-full lg:w-1/2 lg:order-first prose prose-invert prose-lg text-neutral-300">
                        {/* Desktop Only Headline */}
                        <h1 className="hidden lg:block text-4xl md:text-5xl font-bold text-white mb-6">
                            Master Your Risk with the <span className="text-emerald-400">Advanced Risk Calculator</span>
                        </h1>
                        <p className="hidden lg:block text-xl leading-relaxed text-neutral-400 mb-8">
                            In the volatile world of Forex and Gold trading, <strong className="text-white">risk management</strong> is the only shield between you and a blown account.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/5">
                            <h3 className="text-white mt-0">How to use this Calculator?</h3>
                            <ol className="space-y-3 mb-0 text-sm md:text-base">
                                <li><strong>Enter Account Balance:</strong> Start with your current equity (e.g., $10,000).</li>
                                <li><strong>Select Pair:</strong> Choose from major Forex pairs or Gold (XAUUSD).</li>
                                <li><strong>Define Risk:</strong> Input your risk tolerance (e.g., 1% or $100).</li>
                                <li><strong>Set Stop Loss:</strong> Enter the distance to your Stop Loss in Pips.</li>
                                <li><strong>Get Results:</strong> The calculator instantly shows your <strong>Standard Lots</strong>, <strong>Commission</strong>, and true <strong>Dollar Risk</strong>.</li>
                            </ol>
                        </div>

                        <div className="mt-8">
                            <h3>Why Risk Management Matters?</h3>
                            <p className="text-sm md:text-base">
                                Professional traders don't focus on "how much I can make." They focus on "how much I could lose." By using the <em>The Rich Royals Risk Calculator</em>, you align yourself with the top 1% of traders who execute with mathematical precision.
                            </p>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20">
                            <h4 className="text-white m-0 mb-2">Ready to trade professionally?</h4>
                            <p className="text-sm mb-4">Join our mentorship to learn the strategies behind the numbers.</p>
                            <a
                                href="https://wa.me/918446394909?text=Hey,%20I%20want%20to%20learn%20Forex%20trading."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold transition-all w-full sm:w-auto"
                            >
                                Join The Rich Royals
                            </a>
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
