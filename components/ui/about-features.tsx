"use client";

import React from "react";

export function AboutFeatures() {
    return (
        <section className="py-20 bg-slate-50">
            <h1 className="text-3xl font-semibold text-center mx-auto text-slate-900">Why The Rich Royals?</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                We combine expert mentorship with real-world application to ensure your success in the markets.
            </p>
            <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-8 md:px-0 pt-16">
                <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-indigo-100"></div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-800">Live Market Analysis</h3>
                        <p className="text-sm text-slate-500">Learn by doing with real-time trading sessions and expert breakdowns.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <span className="text-2xl">🎨</span>
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-800">Structured Curriculum</h3>
                        <p className="text-sm text-slate-500">From basics to advanced strategies, our course is designed for all levels.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <span className="text-2xl">🧩</span>
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-800">Psychology Mastery</h3>
                        <p className="text-sm text-slate-500">Master your emotions to maintain consistency and profitability.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <span className="text-2xl">📘</span>
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-800">Lifetime Support</h3>
                        <p className="text-sm text-slate-500">Join a community of traders and get mentorship whenever you need it.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <span className="text-2xl">📦</span>
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-800">Risk Management</h3>
                        <p className="text-sm text-slate-500">Learn how to protect your capital while maximizing your gains.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <span className="text-2xl">🧠</span>
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-800">Prop Firm Guidance</h3>
                        <p className="text-sm text-slate-500">Specialized training to help you pass funding challenges.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};