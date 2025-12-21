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

interface CalculatorProps {
    isInline?: boolean; // If true, renders embedded without modal
    isStandalone?: boolean; // Legacy alias for isInline
}

export const AdvancedRiskCalculator: React.FC<CalculatorProps> = ({ isInline = false, isStandalone = false }) => {
    // Normalize props
    const embedMode = isInline || isStandalone;
    const [isOpen, setIsOpen] = useState(false);
    const { rates, isLoading, isOffline } = useExchangeRates();
    const [showAdvanced, setShowAdvanced] = useState(false); // Toggle for advanced inputs

    // Form State
    const [inputs, setInputs] = useState<CalculatorInputs>({
        mode: 'CalculateLots',
        accountBalance: 5000,
        currencyPair: 'EUR/USD',
        stopLossPips: 30, // Tighter default
        lotSizeInput: 1.0,
        riskUnit: 'Percentage',
        riskPercentage: 1,
        riskAmount: 50, // Default for amount mode
        leverage: '1:1000', // Standard broker leverage (Updated to 1:1000)
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

    // Analytics Helper
    const trackEvent = (action: string, params: any = {}) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', action, params);
        }
    };

    // Track Open
    useEffect(() => {
        if (isOpen) {
            trackEvent('calculator_opened', { calculator: 'risk_calculator' });
        }
    }, [isOpen]);

    const copyToClipboard = () => {
        if (!result) return;
        const textToCopy = inputs.mode === 'CalculateLots'
            ? result.positionSize.lots.toString()
            : result.recommendedSL?.toString() || "";

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        // Track Copy
        trackEvent('calculator_copy', {
            calculator: 'risk_calculator',
            mode: inputs.mode,
            value: textToCopy
        });
    };

    // Shared Render Logic
    const renderContent = () => (
        <div className="p-6 space-y-6">

            {/* Mode Toggle */}
            <div className="bg-[#1E2028] p-1 rounded-xl flex">
                <button
                    onClick={() => updateInput('mode', 'CalculateLots')}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${inputs.mode === 'CalculateLots' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                >
                    Find Lot Size
                </button>
                <button
                    onClick={() => updateInput('mode', 'CalculateSL')}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${inputs.mode === 'CalculateSL' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                >
                    Find Stop Loss
                </button>
            </div>

            {/* PRIMARY INPUTS (The 4 things that matter) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                {/* Pair */}
                <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">Currency Pair</label>
                    <select
                        aria-label="Select Currency Pair"
                        value={inputs.currencyPair}
                        onChange={(e) => updateInput('currencyPair', e.target.value)}
                        className="w-full mt-1.5 bg-[#1E2028] border border-white/10 rounded-xl py-4 sm:py-3 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-medium appearance-none text-base"
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
                            aria-label="Account Balance"
                            type="number"
                            inputMode="decimal"
                            value={inputs.accountBalance}
                            onChange={(e) => updateInput('accountBalance', parseFloat(e.target.value))}
                            className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-4 sm:py-3 pl-7 pr-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-mono text-base"
                        />
                    </div>
                </div>

                {/* Dynamic Input: Stop Loss OR Lot Size */}
                <div className="col-span-1">
                    <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">
                        {inputs.mode === 'CalculateLots' ? "Stop Loss (Pips)" : "Lot Size"}
                    </label>
                    {inputs.mode === 'CalculateLots' ? (
                        <div className="flex gap-2 mt-1.5">
                            <input
                                aria-label="Stop Loss in Pips"
                                type="number"
                                inputMode="decimal"
                                value={inputs.stopLossPips}
                                onChange={(e) => updateInput('stopLossPips', parseFloat(e.target.value))}
                                className="w-full bg-[#1E2028] border border-white/10 rounded-xl py-4 sm:py-3 px-3 text-white focus:border-emerald-500 outline-none font-mono text-base placeholder-neutral-700"
                                placeholder="SL"
                            />
                            {/* Spread Input (Mini) */}
                            <div className="w-[35%] relative group">
                                <input
                                    aria-label="Spread in Pips"
                                    type="number"
                                    inputMode="decimal"
                                    value={inputs.spreadPips || ''}
                                    onChange={(e) => updateInput('spreadPips', parseFloat(e.target.value))}
                                    className="w-full h-full bg-[#1E2028] border border-white/10 rounded-xl px-2 text-center text-xs text-neutral-400 focus:text-white focus:border-emerald-500 outline-none"
                                    placeholder="+Spread"
                                />
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Spread (Pips)
                                </div>
                            </div>
                        </div>
                    ) : (
                        <input
                            aria-label="Lot Size"
                            type="number"
                            inputMode="decimal"
                            value={inputs.lotSizeInput}
                            onChange={(e) => updateInput('lotSizeInput', parseFloat(e.target.value))}
                            placeholder="1.0"
                            className="w-full mt-1.5 bg-[#1E2028] border border-white/10 rounded-xl py-4 sm:py-3 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-mono text-base"
                        />
                    )}
                </div>

                {/* Risk Section */}
                <div className="col-span-1 sm:col-span-2">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs text-neutral-400 font-bold uppercase tracking-wider ml-1">Risk per Trade</label>
                        {/* Risk Unit Toggle */}
                        <div className="flex bg-[#1E2028] rounded-lg p-0.5 border border-white/5">
                            <button
                                onClick={() => updateInput('riskUnit', 'Percentage')}
                                className={`text-[10px] px-3 py-1 sm:px-2 sm:py-0.5 rounded transition-all ${inputs.riskUnit === 'Percentage' ? 'bg-emerald-500 text-white' : 'text-neutral-500 hover:text-white'}`}
                            >
                                %
                            </button>
                            <button
                                onClick={() => updateInput('riskUnit', 'Amount')}
                                className={`text-[10px] px-3 py-1 sm:px-2 sm:py-0.5 rounded transition-all ${inputs.riskUnit === 'Amount' ? 'bg-emerald-500 text-white' : 'text-neutral-500 hover:text-white'}`}
                            >
                                $
                            </button>
                        </div>
                    </div>

                    {inputs.riskUnit === 'Percentage' ? (
                        <div className="flex gap-2">
                            {RISK_OPTIONS.map(r => (
                                <button
                                    key={r}
                                    onClick={() => updateInput('riskPercentage', r)}
                                    className={`flex-1 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all ${inputs.riskPercentage === r
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-[#1E2028] text-neutral-400 hover:bg-[#252830] hover:text-white'}`}
                                >
                                    {r}%
                                </button>
                            ))}
                            <div className="w-[80px] relative">
                                <input
                                    aria-label="Risk Percentage"
                                    type="number"
                                    inputMode="decimal"
                                    value={inputs.riskPercentage}
                                    onChange={(e) => updateInput('riskPercentage', parseFloat(e.target.value))}
                                    className="w-full h-full bg-[#1E2028] border border-white/10 rounded-lg text-center text-white focus:border-emerald-500 outline-none font-mono text-sm"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">%</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            {/* Quick Chips for Amount */}
                            {[10, 20, 50, 100].map(amt => (
                                <button
                                    key={amt}
                                    onClick={() => updateInput('riskAmount', amt)}
                                    className={`flex-1 py-3 sm:py-2 rounded-lg text-xs font-medium transition-all ${inputs.riskAmount === amt
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-[#1E2028] text-neutral-400 hover:bg-[#252830] hover:text-white'}`}
                                >
                                    ${amt}
                                </button>
                            ))}
                            <div className="w-[80px] relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500 font-medium text-xs">$</span>
                                <input
                                    aria-label="Risk Amount in Dollars"
                                    type="number"
                                    inputMode="decimal"
                                    value={inputs.riskAmount}
                                    onChange={(e) => updateInput('riskAmount', parseFloat(e.target.value))}
                                    className="w-full h-full bg-[#1E2028] border border-white/10 rounded-lg text-center text-white focus:border-emerald-500 outline-none font-mono text-sm pl-3"
                                />
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* ADVANCED TOGGLE */}
            <div className="border-t border-white/5 pt-4">
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-white transition-colors"
                >
                    <Settings className="w-3.5 h-3.5" />
                    {showAdvanced ? "Hide Advanced Settings" : "Show Advanced Settings (Leverage)"}
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
                                <div className="col-span-2">
                                    <label className="text-xs text-neutral-400 ml-1">Leverage</label>
                                    <select
                                        aria-label="Select Leverage"
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
                        <h3 className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2">
                            {inputs.mode === 'CalculateLots' ? "Trade Size" : "Max Stop Loss"}
                        </h3>
                        <div className="flex justify-center items-baseline gap-2 mb-1">
                            <span className="text-5xl font-black text-white tracking-tighter">
                                {inputs.mode === 'CalculateLots' ? result.positionSize.lots : result.recommendedSL}
                            </span>
                            <span className="text-xl font-medium text-emerald-400">
                                {inputs.mode === 'CalculateLots' ? "Lots" : "Pips"}
                            </span>
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-[10px] sm:text-xs text-neutral-400 hover:text-white transition-all mb-1 border border-white/5 active:scale-95"
                        >
                            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            {copied ? "Copied!" : (inputs.mode === 'CalculateLots' ? "Copy Lots" : "Copy Pips")}
                        </button>

                        {inputs.mode === 'CalculateLots' && (
                            <div className="text-xs font-mono text-neutral-500">
                                {result.positionSize.units.toLocaleString()} Units
                            </div>
                        )}
                        {inputs.mode === 'CalculateSL' && (
                            <div className="text-xs font-mono text-neutral-500">
                                Based on {inputs.lotSizeInput} Lots
                            </div>
                        )}
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 border-t border-white/5">
                        <div className="p-4 text-center border-r border-white/5">
                            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Risk Amount</div>
                            <div className="text-lg font-bold text-white mt-0.5">${result.riskAmount}</div>
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
    );

    // If inline, render just the calculator card without modal/trigger logic
    if (embedMode) {
        return (
            <div className={`w-full max-w-md mx-auto relative ${embedMode ? '' : 'z-[60]'}`}>
                {/* Main Glass Panel */}
                <div className="bg-[#13141b]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                    {/* Header (No Close Button) */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <Calculator className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white tracking-wide">Risk Calculator</h2>
                                <p className="text-xs text-neutral-400 font-medium tracking-wider uppercase">Professional Risk Management</p>
                            </div>
                        </div>
                    </div>

                    {renderContent()}
                </div>
            </div>
        )
    }

    // Default Modal Behavior
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
                                {renderContent()}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
