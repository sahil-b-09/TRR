"use client";

import React, { useState, useEffect } from "react";
import { X, Calculator, AlertTriangle, Settings, ChevronDown, ChevronUp, CheckCircle, Info, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorInputs, CalculatorResult, Leverage } from "@/lib/calculator-types";
import { calculateRisk, PAIR_DATA } from "@/lib/calculator-logic";
import { useExchangeRates } from "@/lib/hooks/useExchangeRates";

const PAIR_OPTIONS = Object.keys(PAIR_DATA);
const LEVERAGE_OPTIONS: Leverage[] = ['1:100', '1:200', '1:500', '1:1000'];
const RISK_OPTIONS = [0.5, 1, 2, 3];

export function AdvancedRiskCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const { rates, isLoading, isOffline } = useExchangeRates();
    const [showAdvanced, setShowAdvanced] = useState(false); // Toggle for advanced inputs

    // Form State
    const [inputs, setInputs] = useState<CalculatorInputs>({
        accountBalance: 5000,
        accountCurrency: 'USD',
        currencyPair: 'EUR/USD',
        stopLossPips: 30, // Tighter default
        riskPercentage: 1,
        leverage: '1:500', // Standard broker leverage
        goldPipDefinition: '0.10',
        targetProfitPips: 60
    });

    const [result, setResult] = useState<CalculatorResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Calculate Effect
    useEffect(() => {
        try {
            setError(null);
            const res = calculateRisk(inputs, rates);
            setResult(res);
        } catch (err: any) {
            setError(err.message);
            setResult(null);
        }
    }, [inputs, rates]);

    const updateInput = (field: keyof CalculatorInputs, value: any) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.positionSize.lots.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* Trigger Button */}
            <div className="fixed top-24 right-4 z-50 md:top-32 md:right-8">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-all active:scale-95 border border-white/20 backdrop-blur-md group"
                >
                    <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="hidden sm:inline font-bold tracking-wide text-sm">Position Calculator</span>
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
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0F1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#16181D]">
                                <div>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Position Size Calculator</h2>
                                    <p className="text-xs text-neutral-400">Accurate risk management for every trade</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                <div className="p-6 space-y-6">

                                    {/* PRIMARY INPUTS (The 4 things that matter) */}
                                    <div className="grid grid-cols-2 gap-4">

                                        {/* Pair */}
                                        <div className="col-span-2">
                                            <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">Currency Pair</label>
                                            <select
                                                value={inputs.currencyPair}
                                                onChange={(e) => updateInput('currencyPair', e.target.value)}
                                                className="w-full mt-1.5 bg-[#1E2028] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-medium appearance-none"
                                            >
                                                {PAIR_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>

                                        {/* Balance */}
                                        <div className="col-span-1">
                                            <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">Acc. Balance</label>
                                            <div className="relative mt-1.5">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">$</span>
                                                <input
                                                    type="number"
                                                    value={inputs.accountBalance}
                                                    onChange={(e) => updateInput('accountBalance', parseFloat(e.target.value))}
                                                    className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-3 pl-7 pr-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-mono text-base"
                                                />
                                            </div>
                                        </div>

                                        {/* Stop Loss */}
                                        <div className="col-span-1">
                                            <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">Stop Loss (Pips)</label>
                                            <input
                                                type="number"
                                                value={inputs.stopLossPips}
                                                onChange={(e) => updateInput('stopLossPips', parseFloat(e.target.value))}
                                                className="w-full mt-1.5 bg-[#1E2028] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-mono text-base"
                                            />
                                        </div>

                                        {/* Risk % */}
                                        <div className="col-span-2">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">Risk per Trade</label>
                                                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                                    Risking ${(inputs.accountBalance * (inputs.riskPercentage / 100)).toFixed(0)}
                                                </span>
                                            </div>

                                            <div className="flex gap-2">
                                                {RISK_OPTIONS.map(r => (
                                                    <button
                                                        key={r}
                                                        onClick={() => updateInput('riskPercentage', r)}
                                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${inputs.riskPercentage === r
                                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                                            : 'bg-[#1E2028] text-neutral-400 hover:bg-[#252830] hover:text-white'}`}
                                                    >
                                                        {r}%
                                                    </button>
                                                ))}
                                                <div className="w-[80px] relative">
                                                    <input
                                                        type="number"
                                                        value={inputs.riskPercentage}
                                                        onChange={(e) => updateInput('riskPercentage', parseFloat(e.target.value))}
                                                        className="w-full h-full bg-[#1E2028] border border-white/10 rounded-lg text-center text-white focus:border-emerald-500 outline-none font-mono text-sm"
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">%</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* ADVANCED TOGGLE */}
                                    <div className="border-t border-white/5 pt-4">
                                        <button
                                            onClick={() => setShowAdvanced(!showAdvanced)}
                                            className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-white transition-colors"
                                        >
                                            <Settings className="w-3.5 h-3.5" />
                                            {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings (Leverage, JPY, Gold)"}
                                            {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                        </button>

                                        <AnimatePresence>
                                            {showAdvanced && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-4 grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs text-neutral-400 ml-1">Account Currency</label>
                                                            <select
                                                                value={inputs.accountCurrency}
                                                                onChange={(e) => updateInput('accountCurrency', e.target.value)}
                                                                className="w-full mt-1 bg-[#1E2028] border border-white/10 rounded-lg py-2 px-3 text-sm text-white outline-none"
                                                            >
                                                                {['USD', 'EUR', 'GBP', 'JPY', 'INR'].map(c => <option key={c} value={c}>{c}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-neutral-400 ml-1">Leverage</label>
                                                            <select
                                                                value={inputs.leverage}
                                                                onChange={(e) => updateInput('leverage', e.target.value)}
                                                                className="w-full mt-1 bg-[#1E2028] border border-white/10 rounded-lg py-2 px-3 text-sm text-white outline-none"
                                                            >
                                                                {LEVERAGE_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                                                            </select>
                                                        </div>

                                                        {/* Broker Disclosure - Plain Text */}
                                                        <div className="col-span-2 mt-2">
                                                            <p className="text-[10px] text-neutral-500 leading-relaxed">
                                                                *Leverage options are based on <a href="https://m.dupoin.vip/bYEM6dcuI" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-400 transition-colors">Dupoin Market</a> for calculation consistency. Used internally, but you are free to use any broker. Actual results vary by broker conditions.
                                                            </p>
                                                        </div>

                                                        {/* Gold Special Input */}
                                                        {PAIR_DATA[inputs.currencyPair].type === 'Gold' && (
                                                            <div className="col-span-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                                                                <label className="text-xs text-amber-200 font-medium flex items-center gap-1 mb-2">
                                                                    <AlertTriangle className="w-3 h-3" /> Gold Pip Definition
                                                                </label>
                                                                <div className="flex gap-2">
                                                                    {['0.01', '0.10', '1.00'].map((val) => (
                                                                        <button
                                                                            key={val}
                                                                            onClick={() => updateInput('goldPipDefinition', val)}
                                                                            className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${inputs.goldPipDefinition === val
                                                                                ? 'bg-amber-500 text-black border-amber-500 font-bold'
                                                                                : 'bg-black/20 border-white/10 text-neutral-400 hover:text-white'}`}
                                                                        >
                                                                            {val}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                <p className="text-[10px] text-amber-200/60 mt-1.5">
                                                                    Most common: 0.10 (Price shows 1 decimal like 2350.1)
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* RESULTS CARD (The Simplified Answer) */}
                                    {result && (
                                        <div className="bg-[#1E2028] rounded-2xl border border-white/5 overflow-hidden relative">
                                            {/* Glow Effect */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

                                            <div className="p-6 text-center">
                                                <h3 className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2">Trade Size</h3>
                                                <div className="flex justify-center items-baseline gap-2 mb-1">
                                                    <span className="text-5xl font-black text-white tracking-tighter">
                                                        {result.positionSize.lots}
                                                    </span>
                                                    <span className="text-xl font-medium text-emerald-400">Lots</span>
                                                </div>

                                                <button
                                                    onClick={copyToClipboard}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-[10px] sm:text-xs text-neutral-400 hover:text-white transition-all mb-1 border border-white/5 active:scale-95"
                                                >
                                                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                                    {copied ? "Copied!" : "Copy Lots"}
                                                </button>

                                                <div className="text-xs font-mono text-neutral-500">
                                                    {result.positionSize.units.toLocaleString()} Units
                                                </div>
                                            </div>

                                            {/* Key Stats Grid */}
                                            <div className="grid grid-cols-2 border-t border-white/5">
                                                <div className="p-4 text-center border-r border-white/5">
                                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Risk Amount</div>
                                                    <div className="text-lg font-bold text-white mt-0.5">${result.riskAmount.usd}</div>
                                                    <div className="text-xs text-neutral-500 font-mono">₹{result.riskAmount.inr.toLocaleString()}</div>
                                                </div>
                                                <div className="p-4 text-center">
                                                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Margin</div>
                                                    <div className={`text-lg font-bold mt-0.5 ${result.margin.status === 'Safe' ? 'text-emerald-400' :
                                                        result.margin.status === 'Caution' ? 'text-amber-400' : 'text-rose-400'
                                                        }`}>
                                                        ${result.margin.required.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-neutral-500 font-mono">
                                                        {result.margin.percent}% used
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Safety Check Banner */}
                                            {(result.warnings.length > 0 || result.margin.status !== 'Safe') ? (
                                                <div className={`py-2 px-4 text-xs font-medium flex items-center justify-center gap-2 ${result.margin.status === 'Danger' ? 'bg-rose-500/20 text-rose-200' :
                                                    'bg-amber-500/20 text-amber-200'
                                                    }`}>
                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                    {result.warnings[0]?.message || "Check margin usage carefully"}
                                                </div>
                                            ) : (
                                                <div className="py-2 px-4 bg-emerald-500/10 text-emerald-200 text-xs font-medium flex items-center justify-center gap-2">
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    Safe to trade. Good luck!
                                                </div>
                                            )}
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
