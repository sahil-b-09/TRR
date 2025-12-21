import React from "react";
import { PipCalculator } from "@/components/ui/pip-calculator";
import { SocialConnect } from "@/components/ui/connect-with-us";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PipCalculatorPage = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium hidden sm:inline">Back to Home</span>
                        <span className="font-medium sm:hidden">Home</span>
                    </Link>
                    <div className="font-bold text-base md:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                        Pip Calculator
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
                                Pip Value <span className="text-indigo-400">Calculator</span>
                            </h1>
                            <p className="text-sm text-neutral-400">Calculate profits before you enter.</p>
                        </div>

                        <div className="relative z-10 w-full">
                            <PipCalculator isInline={true} />
                        </div>
                        {/* Decorator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                    </div>

                    {/* SECTION 2: THE CONTENT (Pushed Below on Mobile) */}
                    <div className="w-full lg:w-1/2 lg:order-first prose prose-invert prose-lg text-neutral-300">
                        {/* Desktop Only Headline */}
                        <h1 className="hidden lg:block text-4xl md:text-5xl font-bold text-white mb-6">
                            Calculate Profits with the <span className="text-indigo-400">Advanced Pip Calculator</span>
                        </h1>
                        <p className="hidden lg:block text-xl leading-relaxed text-neutral-400 mb-8">
                            Understanding <strong>Pip Value</strong> is the first step to mastering the markets. Whether you're scalping Gold (XAUUSD) or swinging EURUSD, our precision tool calculates exactly how much each pip is worth.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/5">
                            <h3 className="text-white mt-0">Why use a Pip Calculator?</h3>
                            <p className="text-sm md:text-base">
                                Many beginner traders guess their potential profit or loss. This is gambling, not trading.
                                With <em>The Rich Royals Pip Calculator</em>, you input your lot size and entry/exit prices to see:
                            </p>
                            <ul className="list-disc pl-5 mb-0 space-y-2 text-sm md:text-base">
                                <li><strong>Exact Pips Gained/Lost:</strong> Measure the distance of the move.</li>
                                <li><strong>Net Profit/Loss ($):</strong> Know exactly what the trade means for your balance.</li>
                                <li><strong>Spread Impact:</strong> Factor in the broker's spread for true accuracy.</li>
                            </ul>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4 not-prose">
                            <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-center">
                                <span className="block text-2xl mb-1">🥇</span>
                                <span className="font-bold text-white text-sm">Gold (XAUUSD)</span>
                            </div>
                            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-center">
                                <span className="block text-2xl mb-1">💱</span>
                                <span className="font-bold text-white text-sm">Forex Pairs</span>
                            </div>
                        </div>


                        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20">
                            <h4 className="text-white m-0 mb-2">Want to learn how to catch these pips?</h4>
                            <p className="text-sm mb-4">Our mentorship program teaches high-probability setups.</p>
                            <a
                                href="https://wa.me/918446394909?text=Hey,%20I%20want%20to%20learn%20Forex%20trading."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all w-full sm:w-auto"
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
