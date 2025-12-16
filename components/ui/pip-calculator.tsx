"use client";

import React, { useState, useEffect } from "react";
import { X, Ruler, ArrowRight, ArrowUp, ArrowDown, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AssetType = "Standard" | "Gold";
type Direction = "Buy" | "Sell";

export function PipCalculator() {
    const [isOpen, setIsOpen] = useState(false);

    const [priceA, setPriceA] = useState<string>("");
    const [priceB, setPriceB] = useState<string>("");
    const [lotSize, setLotSize] = useState<string>("1.0");
    const [spread, setSpread] = useState<string>("");
    const [direction, setDirection] = useState<Direction>("Buy");
    const [assetType, setAssetType] = useState<AssetType>("Standard");
    const [result, setResult] = useState<number | null>(null);
    const [estimatedProfit, setEstimatedProfit] = useState<number | null>(null);

    // Auto-calculate
    useEffect(() => {
        if (!priceA || !priceB) {
            setResult(null);
            setEstimatedProfit(null);
            return;
        }

        const a = parseFloat(priceA);
        const b = parseFloat(priceB);
        const lots = parseFloat(lotSize) || 0;
        const spreadVal = parseFloat(spread) || 0;

        if (isNaN(a) || isNaN(b)) {
            setResult(null);
            setEstimatedProfit(null);
            return;
        }

        // Calculate raw difference
        // Buy: Close - Open (b - a)
        // Sell: Open - Close (a - b)
        let diff = direction === "Buy" ? (b - a) : (a - b);
        
        let pips = 0;

        if (assetType === "Standard") {
            // 0.0001 = 1 Pip
            pips = diff * 10000;
        } else if (assetType === "Gold") {
            // 0.10 = 1 Pip
            pips = diff * 10;
        }

        // Subtract spread
        pips -= spreadVal;

        const pipCount = Number(pips.toFixed(1));
        setResult(pipCount);

        // Profit Calculation
        // Standard/Gold Scenario A: Profit = Pips * Lots * 10
        const profit = pipCount * lots * 10;
        setEstimatedProfit(Number(profit.toFixed(2)));

    }, [priceA, priceB, assetType, lotSize, spread, direction]);


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
                                    <h2 className="text-lg font-bold text-white tracking-tight">Pip & Profit</h2>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">

                                {/* Top Row: Asset & Lot Size */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider ml-1">Asset</label>
                                        <div className="flex bg-[#1E2028] p-1 rounded-xl mt-2 border border-white/5">
                                            {(["Standard", "Gold"] as AssetType[]).map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setAssetType(type)}
                                                    className={`flex-1 py-3 sm:py-2 rounded-lg text-xs font-medium transition-all ${assetType === type
                                                        ? 'bg-indigo-600 text-white shadow-lg'
                                                        : 'text-neutral-400 hover:text-white'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/3">
                                        <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider ml-1">Lots</label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            value={lotSize}
                                            onChange={(e) => setLotSize(e.target.value)}
                                            step="0.01"
                                            placeholder="1.0"
                                            className="w-full mt-2 bg-[#1E2028] border border-white/10 rounded-xl py-3 px-3 text-center text-white focus:border-indigo-500 outline-none transition-all font-mono font-bold"
                                        />
                                    </div>
                                </div>

                                <p className="text-[10px] text-neutral-500 ml-1">
                                    {assetType === "Standard" && "4 Decimal Pairs (e.g. EURUSD). $10/pip for 1.0 Lot."}
                                    {assetType === "Gold" && "XAUUSD. $1 Move = 10 Pips = $100 Profit (1.0 Lot)."}
                                </p>

                                {/* Direction & Spread */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider ml-1">Direction</label>
                                        <div className="flex bg-[#1E2028] p-1 rounded-xl mt-2 border border-white/5">
                                            {(["Buy", "Sell"] as Direction[]).map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setDirection(type)}
                                                    className={`flex-1 py-3 sm:py-2 rounded-lg text-xs font-medium transition-all ${direction === type
                                                        ? (type === 'Buy' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-rose-600 text-white shadow-lg')
                                                        : 'text-neutral-400 hover:text-white'
                                                        }`}
                                                >
                                                    {type.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/3">
                                        <label className="text-xs text-neutral-500 font-bold uppercase tracking-wider ml-1">Spread</label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            value={spread}
                                            onChange={(e) => setSpread(e.target.value)}
                                            step="0.1"
                                            placeholder="0"
                                            className="w-full mt-2 bg-[#1E2028] border border-white/10 rounded-xl py-3 px-3 text-center text-white focus:border-indigo-500 outline-none transition-all font-mono font-bold"
                                        />
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="flex-1 w-full">
                                        <label className="text-xs text-neutral-400 ml-1 mb-1 block">Open Price</label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            value={priceA}
                                            onChange={(e) => setPriceA(e.target.value)}
                                            placeholder={assetType === "Gold" ? "2350.00" : "1.0000"}
                                            className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div className="pt-0 sm:pt-5 text-neutral-600 rotate-90 sm:rotate-0">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="text-xs text-neutral-400 ml-1 mb-1 block">Close Price</label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            value={priceB}
                                            onChange={(e) => setPriceB(e.target.value)}
                                            placeholder={assetType === "Gold" ? "2350.10" : "1.0050"}
                                            className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                </div>

                                {/* Result Display */}
                                <div className="bg-[#1E2028] rounded-2xl border border-white/5 p-6 relative overflow-hidden">
                                    {/* Background Glow */}
                                    {result !== null && (
                                        <div className={`absolute inset-0 opacity-10 blur-3xl ${result >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    )}

                                    {result !== null ? (
                                        <div className="space-y-6">
                                            {/* Pips Section */}
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center gap-3 relative z-10">
                                                    {result >= 0 ? (
                                                        <ArrowUp className="w-6 h-6 text-emerald-500" />
                                                    ) : (
                                                        <ArrowDown className="w-6 h-6 text-rose-500" />
                                                    )}
                                                    <span className={`text-4xl font-black tracking-tighter text-white`}>
                                                        {Math.abs(result)} <span className="text-lg font-medium text-neutral-500">Pips</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div className="h-px w-full bg-white/5" />

                                            {/* Profit Section */}
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Estimated P/L</span>
                                                <div className={`text-3xl font-mono font-bold flex items-center ${estimatedProfit! >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {estimatedProfit! >= 0 ? '+' : '-'}${Math.abs(estimatedProfit!)}
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-neutral-600 text-sm font-medium">
                                            Enter prices to calculate range & profit
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
