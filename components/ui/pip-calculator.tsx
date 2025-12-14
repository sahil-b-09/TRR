"use client";

import React, { useState, useEffect } from "react";
import { X, Ruler, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AssetType = "Standard" | "JPY" | "Gold";

export function PipCalculator() {
    const [isOpen, setIsOpen] = useState(false);

    const [priceA, setPriceA] = useState<string>("");
    const [priceB, setPriceB] = useState<string>("");
    const [assetType, setAssetType] = useState<AssetType>("Standard");
    const [result, setResult] = useState<number | null>(null);

    // Auto-calculate
    useEffect(() => {
        if (!priceA || !priceB) {
            setResult(null);
            return;
        }

        const a = parseFloat(priceA);
        const b = parseFloat(priceB);

        if (isNaN(a) || isNaN(b)) {
            setResult(null);
            return;
        }

        let diff = b - a;
        let pips = 0;

        if (assetType === "Standard") {
            // 0.0001 = 1 Pip
            pips = diff * 10000;
        } else if (assetType === "JPY") {
            // 0.01 = 1 Pip
            pips = diff * 100;
        } else if (assetType === "Gold") {
            // 0.10 = 1 Pip (Standard Broker Def) --> Updated to 0.01 = 1 Pip (Dupoin/Modern Standard)
            pips = diff * 100;
        }

        setResult(Number(pips.toFixed(1)));
    }, [priceA, priceB, assetType]);


    return (
        <>
            {/* Trigger Button - Positioned below the Risk Calculator Button */}
            <div className="fixed top-40 right-4 z-50 md:top-48 md:right-8">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-[#1e1e24] hover:bg-[#25252b] text-white rounded-full shadow-lg border border-white/10 backdrop-blur-md group transition-all active:scale-95"
                >
                    <Ruler className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline font-medium text-sm text-neutral-300 group-hover:text-white">Pip Ruler</span>
                </button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="relative w-full max-w-md bg-[#0F1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#16181D]">
                                <div className="flex items-center gap-2">
                                    <Ruler className="w-5 h-5 text-indigo-400" />
                                    <h2 className="text-lg font-bold text-white tracking-tight">Pip Distance</h2>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">

                                {/* Asset Selector */}
                                <div>
                                    <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider ml-1">Asset Type</label>
                                    <div className="flex bg-[#1E2028] p-1 rounded-xl mt-2 border border-white/5">
                                        {(["Standard", "JPY", "Gold"] as AssetType[]).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setAssetType(type)}
                                                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${assetType === type
                                                    ? 'bg-indigo-600 text-white shadow-lg'
                                                    : 'text-neutral-400 hover:text-white'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-neutral-500 mt-2 ml-1">
                                        {assetType === "Standard" && "For pairs like EUR/USD, GBP/USD (4 decimals)"}
                                        {assetType === "JPY" && "For pairs like USD/JPY, GBP/JPY (2 decimals)"}
                                        {assetType === "Gold" && "For XAU/USD (Assumes $1 = 100 Pips)"}
                                    </p>
                                </div>

                                {/* Inputs */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <label className="text-xs text-neutral-400 ml-1 mb-1 block">Price A (Start)</label>
                                        <input
                                            type="number"
                                            value={priceA}
                                            onChange={(e) => setPriceA(e.target.value)}
                                            placeholder={assetType === "Gold" ? "2350.50" : "1.0000"}
                                            className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="pt-5 text-neutral-600">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-neutral-400 ml-1 mb-1 block">Price B (End)</label>
                                        <input
                                            type="number"
                                            value={priceB}
                                            onChange={(e) => setPriceB(e.target.value)}
                                            placeholder={assetType === "Gold" ? "2351.50" : "1.0050"}
                                            className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                </div>

                                {/* Result Display */}
                                <div className="bg-[#1E2028] rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
                                    {/* Background Glow */}
                                    {result !== null && (
                                        <div className={`absolute inset-0 opacity-20 blur-3xl ${result >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    )}

                                    {result !== null ? (
                                        <>
                                            <div className="flex items-center gap-3 mb-1 relative z-10">
                                                {result >= 0 ? (
                                                    <ArrowUp className="w-8 h-8 text-emerald-500" />
                                                ) : (
                                                    <ArrowDown className="w-8 h-8 text-rose-500" />
                                                )}
                                                <span className={`text-6xl font-black tracking-tighter ${result >= 0 ? 'text-white' : 'text-white'}`}>
                                                    {Math.abs(result)}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest relative z-10">Pips</span>

                                            <div className={`mt-4 px-3 py-1 rounded-full text-xs font-mono font-medium border relative z-10 ${result >= 0
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                                                }`}>
                                                {result > 0 ? "+" : ""}{result} Pips Distance
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-neutral-600 text-sm font-medium">
                                            Enter prices to calculate range
                                        </div>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
