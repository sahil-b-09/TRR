"use client";

import React, { useState } from "react";
import { ArrowRight, Eye, Target, X, Instagram, ArrowLeft } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function AboutIntro() {
    const [showMission, setShowMission] = useState(false);

    return (
        <section className="py-20 bg-[#030303]">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
                {/* Left Image Section */}
                <div className="relative shadow-2xl shadow-indigo-500/20 rounded-2xl overflow-hidden shrink-0">
                    <img className="max-w-md w-full object-cover rounded-2xl transition-all duration-500 hover:scale-105"
                        src="/about-founder.jpg"
                        alt="Sumit Bagul - Founder" />

                    {/* Instagram Floating Card */}
                    <a
                        href="https://www.instagram.com/smit.bagul/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-3 bg-neutral-900/90 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl hover:border-indigo-500/50 hover:bg-neutral-900 transition-all duration-300 group cursor-pointer"
                    >
                        {/* Instagram Icon Container with Gradient Border */}
                        <div className="relative size-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] group-hover:scale-110 transition-transform duration-300">
                            <div className="size-full bg-black rounded-full flex items-center justify-center">
                                <Instagram className="size-5 text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-400 font-medium mb-0.5">Connect on Instagram</span>
                            <span className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">@smit.bagul</span>
                        </div>
                    </a>
                </div>

                {/* Right Content Section */}
                <div className="text-sm text-neutral-400 max-w-lg">
                    <h1 className="text-2xl uppercase font-semibold text-white tracking-wider">WHO IS SUMIT?</h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-transparent my-4"></div>

                    <p className="mt-8 text-base leading-relaxed text-neutral-300">
                        <span className="text-white font-medium">Sumit Bagul</span> is the visionary <span className="text-indigo-400 font-medium">Founder</span> of The Rich Royals. With a deep passion for financial markets and a proven track record in Forex trading, Sumit has dedicated his career to helping others achieve financial success.
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-neutral-300">
                        Known for his clear and practical teaching approach, he has become a trusted guide for many learners, especially within the <span className="text-white">Marathi trading community</span>.
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-neutral-300">
                        His commitment to simplifying Forex and supporting beginners reflects his mission to make financial education accessible and growth-focused for everyone.
                    </p>

                    <button
                        onClick={() => setShowMission(true)}
                        className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-white text-black py-3 px-8 rounded-full font-medium hover:bg-neutral-200"
                    >
                        <span>Our Mission and Vision</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Mission & Vision Modal Overlay */}
            {showMission && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowMission(false)}
                            className="absolute -top-12 right-0 md:-right-4 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            {/* Vision Card */}
                            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3 bg-neutral-900/50">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="relative h-full flex flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black p-6 md:p-8 shadow-sm">
                                    <div className="relative flex flex-1 flex-col justify-start gap-4">
                                        <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-neutral-800 p-3">
                                            <Eye className="h-6 w-6 text-indigo-400" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-semibold font-sans tracking-tight text-white">
                                                Our Vision
                                            </h3>
                                            <p className="text-base leading-relaxed text-neutral-300 font-light">
                                                Sumit’s vision is to make high-quality Forex education truly accessible for the <span className="text-indigo-300">Marathi community</span> by offering affordable learning without compromising on depth or excellence. He aims to ensure that anyone — regardless of background, experience, or financial limitations — can build strong trading skills and move toward financial confidence. His focus is on creating a learning environment where everyday Marathi learners feel supported, guided, and empowered to grow steadily in the financial markets.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mission Card */}
                            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3 bg-neutral-900/50">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="relative h-full flex flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black p-6 md:p-8 shadow-sm">
                                    <div className="relative flex flex-1 flex-col justify-start gap-4">
                                        <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-neutral-800 p-3">
                                            <Target className="h-6 w-6 text-rose-400" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-semibold font-sans tracking-tight text-white">
                                                Our Mission
                                            </h3>
                                            <p className="text-base leading-relaxed text-neutral-300 font-light">
                                                Sumit’s mission is to deliver expert-led, practical, and easy-to-understand Forex education designed especially for <span className="text-rose-300">Marathi learners</span>. He is committed to teaching core skills such as market analysis, risk management, and disciplined trading strategies through affordable, structured training. His goal is to help individuals build real trading capability with clarity, confidence, and long-term consistency.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="flex justify-center mt-8 pb-4">
                            <button
                                onClick={() => setShowMission(false)}
                                className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 group backdrop-blur-sm"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium tracking-wide">Back</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}