import React from "react";
import { PipCalculator } from "@/components/ui/pip-calculator";
import { SocialConnect } from "@/components/ui/connect-with-us";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PipCalculatorPage = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-black/50 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <div className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
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
                            <PipCalculator isInline={true} />
                        </div>
                        {/* Decorator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                    </div>

                    {/* Right Column: SEO Content */}
                    <div className="prose prose-invert prose-lg text-neutral-300">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Calculate Profits with the <span className="text-indigo-400">Advanced Pip Calculator</span>
                        </h1>

                        <p className="text-xl leading-relaxed text-neutral-400 mb-8">
                            Understanding <strong>Pip Value</strong> is the first step to mastering the markets. Whether you're scalping Gold (XAUUSD) or swinging EURUSD, our precision tool calculates exactly how much each pip is worth in real dollars.
                        </p>

                        <h3>Why use a Pip Calculator?</h3>
                        <p>
                            Many beginner traders guess their potential profit or loss. This is gambling, not trading.
                            With <em>The Rich Royals Pip Calculator</em>, you input your lot size and entry/exit prices to see:
                        </p>
                        <ul className="list-disc pl-5 mb-8 space-y-2">
                            <li><strong>Exact Pips Gained/Lost:</strong> Measure the distance of the move.</li>
                            <li><strong>Net Profit/Loss ($):</strong> Know exactly what the trade means for your balance.</li>
                            <li><strong>Spread Impact:</strong> Factor in the broker's spread for true accuracy.</li>
                        </ul>

                        <h3>Supported Assets</h3>
                        <p>
                            Our algorithm is fine-tuned for:
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8 not-prose">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                <span className="block text-2xl mb-1">🥇</span>
                                <span className="font-bold text-white">Gold (XAUUSD)</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                <span className="block text-2xl mb-1">💱</span>
                                <span className="font-bold text-white">Forex Pairs</span>
                            </div>
                        </div>


                        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-white m-0 mb-2">Want to learn how to catch these pips?</h4>
                            <p className="text-sm mb-4">Our mentorship program teaches high-probability setups.</p>
                            <Link to="/" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all">
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
