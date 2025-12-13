"use client";

import React, { useState, useEffect } from "react";
import { X, Calculator, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_PAIRS = [
    { pair: "EUR/USD", price: 1.0850 },
    { pair: "GBP/USD", price: 1.2750 },
    { pair: "USD/JPY", price: 153.20 },
    { pair: "USD/CHF", price: 0.9050 },
    { pair: "AUD/USD", price: 0.6550 },
    { pair: "USD/CAD", price: 1.3650 },
    { pair: "XAU/USD", price: 2350.00 }, // Gold
];

export function PipCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPair, setSelectedPair] = useState("EUR/USD");
    const [lots, setLots] = useState<string>("1.0");
    const [pips, setPips] = useState<string>("10");
    const [customPrice, setCustomPrice] = useState<string>("");

    // Result State
    const [pipValue, setPipValue] = useState<number>(0);

    // Helpers
    const getPipSize = (pair: string) => {
        if (pair.includes("JPY") || pair.includes("XAU")) return 0.01;
        return 0.0001;
    };

    const calculatePipValue = () => {
        const lotSize = parseFloat(lots);
        if (isNaN(lotSize) || lotSize <= 0) {
            setPipValue(0);
            return;
        }

        const price = customPrice ? parseFloat(customPrice) : POPULAR_PAIRS.find(p => p.pair === selectedPair)?.price || 1.0;

        let valuePerPip = 0;
        const standardUnit = 100000; // Standard Lot

        if (selectedPair.endsWith("USD")) {
            // EUR/USD, GBP/USD etc.
            // Formula: Lot * 100,000 * 0.0001
            valuePerPip = lotSize * standardUnit * 0.0001;
        } else if (selectedPair.startsWith("USD") && !selectedPair.includes("XAU")) {
            // USD/JPY, USD/CHF etc.
            // Formula: (Lot * 100,000 * PipSize) / Price
            const pipSize = getPipSize(selectedPair);
            valuePerPip = (lotSize * standardUnit * pipSize) / price;
        } else if (selectedPair.includes("XAU")) {
            // Gold (XAU/USD)
            valuePerPip = lotSize * 100 * 0.01; // 100 oz contract
        } else {
            valuePerPip = 0;
        }

        setPipValue(valuePerPip);
    };

    useEffect(() => {
        calculatePipValue();
    }, [selectedPair, lots, pips, customPrice]);

    const handleReset = () => {
        setLots("1.0");
        setPips("10");
        setCustomPrice("");
        setSelectedPair("EUR/USD");
    };

    return (
        <>
            {/* Trigger Button */}
            <div className="fixed top-24 right-4 z-50 md:top-8 md:right-8">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-500/30 transition-all active:scale-95 backdrop-blur-md border border-white/10"
                >
                    <Calculator className="w-4 h-4" />
                    <span className="hidden sm:inline font-medium text-sm">Pip Calculator</span>
                </button>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-neutral-900/95 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
                        >
                            {/* Glossy Effect */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex items-center justify-between mb-6 relative">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                        <Calculator className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Pip Calculator</h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-5 relative">
                                {/* Pair Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Currency Pair</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {POPULAR_PAIRS.map((p) => (
                                            <button
                                                key={p.pair}
                                                onClick={() => {
                                                    setSelectedPair(p.pair);
                                                    setCustomPrice(""); // Reset custom price on pair change
                                                }}
                                                className={`text-xs py-2 px-1 rounded-lg border transition-all ${selectedPair === p.pair
                                                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                                        : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                {p.pair}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Inputs Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Lots (Volume)</label>
                                        <input
                                            type="number"
                                            value={lots}
                                            onChange={(e) => setLots(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                                            placeholder="1.0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Pips (Amount)</label>
                                        <input
                                            type="number"
                                            value={pips}
                                            onChange={(e) => setPips(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                                            placeholder="10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mt-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Price (Optional)</label>
                                    <input
                                        type="number"
                                        value={customPrice}
                                        onChange={(e) => setCustomPrice(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                                        placeholder={POPULAR_PAIRS.find(p => p.pair === selectedPair)?.price.toString()}
                                    />
                                </div>

                                {/* Result Box */}
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                                        <span className="text-xs text-neutral-400 font-medium uppercase">Value Per Pip</span>
                                        <div className="flex items-baseline gap-1 text-xl font-bold text-white tracking-tight">
                                            <span className="text-sm text-indigo-300">$</span>
                                            {pipValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                                        <span className="text-xs text-indigo-200/80 font-medium uppercase">Total Profit</span>
                                        <div className="flex items-baseline gap-1 text-2xl font-bold text-white tracking-tight">
                                            <span className="text-lg text-indigo-300">$</span>
                                            {(pipValue * (parseFloat(pips) || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                </div>

                                {/* Info Footer */}
                                <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
                                    <span>Based on Standard Lot (100k units)</span>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-1 hover:text-white transition-colors"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
