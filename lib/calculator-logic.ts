import { CalculatorInputs, CalculatorResult, ExchangeRates, PairDefinition, DrawdownScenario, CalculationWarning, Leverage } from "./calculator-types";

// ==========================================
// CONSTANTS & DATA
// ==========================================

export const PAIR_DATA: Record<string, PairDefinition> = {
    // MAJORS
    "EUR/USD": { name: "EUR/USD", type: "Major", basePipValue: 10, minSL: 15 },
    "GBP/USD": { name: "GBP/USD", type: "Major", basePipValue: 10, minSL: 20 },
    "AUD/USD": { name: "AUD/USD", type: "Major", basePipValue: 10, minSL: 15 },
    "NZD/USD": { name: "NZD/USD", type: "Major", basePipValue: 10, minSL: 15 },
    "USD/CHF": { name: "USD/CHF", type: "Major", basePipValue: 10, minSL: 15 }, // USD quote but major behavior
    "USD/CAD": { name: "USD/CAD", type: "Major", basePipValue: 10, minSL: 15 },

    // JPY PAIRS
    "USD/JPY": { name: "USD/JPY", type: "JPY", basePipValue: 6.5, minSL: 25 }, // Base pip value is approx placeholders
    "EUR/JPY": { name: "EUR/JPY", type: "JPY", basePipValue: 6.5, minSL: 30 },
    "GBP/JPY": { name: "GBP/JPY", type: "JPY", basePipValue: 6.5, minSL: 35 },

    // COMMODITIES
    "XAUUSD": { name: "XAUUSD", type: "Gold", basePipValue: 10, minSL: 20 }, // Gold pip value dynamic
};

const LEVERAGE_MAP: Record<Leverage, number> = {
    '1:100': 100,
    '1:200': 200,
    '1:500': 500,
    '1:1000': 1000,
};

// ==========================================
// CORE CALCULATION ENGINE
// ==========================================

export function calculateRisk(inputs: CalculatorInputs, rates: ExchangeRates): CalculatorResult {
    const warnings: CalculationWarning[] = [];
    const ratesUsed: string[] = [];

    // --- 1. VALIDATION ---
    if (!inputs.accountBalance || inputs.accountBalance <= 0) {
        throw new Error("Invalid Balance");
    }

    if (inputs.mode === 'CalculateLots') {
        if (!inputs.stopLossPips || inputs.stopLossPips <= 0) {
            throw new Error("Invalid Stop Loss");
        }
    } else {
        if (!inputs.lotSizeInput || inputs.lotSizeInput <= 0) {
            throw new Error("Invalid Lot Size");
        }
    }

    const pairDef = PAIR_DATA[inputs.currencyPair];
    if (!pairDef) throw new Error("Unknown Pair");


    // --- 2. PIP VALUE CALCULATION ---
    let pipValueUSD = 10; // Default Standard Lot Pip Value in USD

    if (pairDef.type === 'Major') {
        // For pairs ending in USD (EUR/USD), pip value is always $10/lot
        // For pairs starting with USD (USD/CHF), formula is $10 / ExchangeRate. 
        // Simplified MVP: Treat Majors as $10 roughly or refine.
        // Precise: 
        if (inputs.currencyPair.endsWith("USD")) {
            pipValueUSD = 10;
        } else if (inputs.currencyPair.startsWith("USD") && !inputs.currencyPair.includes("JPY")) {
            // e.g. USD/CHF. Pip value = 10 / Rate. Need live rate for USDCHF.
            // MVP: Stick to 10 assumption or fetch specific rate. 
            // For this implementation, we only have USD,EUR,GBP,JPY rates. 
            // We can approximate or hardcode for now.
            pipValueUSD = 10; // Acceptable approximation variance for simplified calculator
        }
    } else if (pairDef.type === 'JPY') {
        // USD/JPY pip value = 100,000 * 0.01 / Rate
        // If rate is ~150, value is ~$6.66
        if (rates.JPY > 0) {
            // rates.JPY is USD/JPY rate? No, API usually sends 1 USD = X JPY. So yes.
            // 1 USD = 150 JPY.
            // Formula: (StandardLot * 0.01) / Rate
            pipValueUSD = 1000 / rates.JPY;
            ratesUsed.push(`USD/JPY: ${rates.JPY}`);
        } else {
            pipValueUSD = 6.66; // Fallback
        }
    } else if (pairDef.type === 'Gold') {
        // Gold (XAUUSD):
        // Standard Convention (Scenario A): $1 move = 10 Pips.
        // Therefore, Pip Value per Standard Lot (100oz) on a standard account is effectively $10.
        // Logic: 10 pips * $10 = $100 (which is the P/L for $1 move on 100oz).
        pipValueUSD = 10;
    }

    // --- 3. PIP VALUE (Generic Units) ---
    // Since we removed Account Currency, we treat Account Balance as "USD/Base" equivalent
    // for simplicity (PipValue 10 for majors).
    const pipValueAccount = pipValueUSD;


    // --- 4. RISK AMOUNT CALCULATION ---
    let riskAmountAccount = 0;
    if (inputs.riskUnit === 'Amount') {
        riskAmountAccount = inputs.riskAmount;
    } else {
        // Percentage
        riskAmountAccount = inputs.accountBalance * (inputs.riskPercentage / 100);
    }


    // --- 5. POSITION SIZE / SL CALCULATION ---
    let positionLots = 0;
    let recommendedSL = 0;

    // Effective Stop Loss (Chart SL + Spread)
    const effectiveSL = inputs.mode === 'CalculateLots'
        ? inputs.stopLossPips + (inputs.spreadPips || 0)
        : 0; // Not used in CalculateSL (Reverse) mode directly for lots, but for reverse calc?

    if (inputs.mode === 'CalculateLots') {
        const stopLossMoney = riskAmountAccount;
        // Risk = Lots * PipValue * EffectiveSL
        // Lots = Risk / (PipValue * EffectiveSL)

        if (effectiveSL > 0 && pipValueAccount > 0) {
            positionLots = stopLossMoney / (pipValueAccount * effectiveSL);
        } else {
            positionLots = 0;
        }
    } else {
        // CalculateSL Mode (Find Stop Loss)
        // User gives Lots, we find SL.
        // Formula: Risk = Lots * PipValue * SL
        // SL = Risk / (Lots * PipValue)
        // Does Spread affect this?
        // "I have 0.1 lots, $50 risk. What is my Max SL?"
        // Result is "Total Distance". User should know this includes spread.
        // We can just return the raw distance.
        const lots = inputs.lotSizeInput || 0;
        if (lots > 0) {
            recommendedSL = riskAmountAccount / (lots * pipValueAccount);
        }
        positionLots = lots; // For margin calc downstream
    }


    // --- 6. MARGIN CALCULATION ---
    // Notional Value in USD = Lots * 100,000. (Simplification, technically depends on pair base)
    // Margin USD = Notional / Leverage
    const leverageVal = LEVERAGE_MAP[inputs.leverage];
    let notionalUSD = positionLots * 100000;

    // Refine notional for Gold
    if (pairDef.type === 'Gold') {
        // 1 lot = 100oz. Price ~2350. Notional = 235,000.
        // Price isn't input! We need price for margin.
        // Approximation: Gold ~2350, EUR ~1.08, JPY ~0.006
        // Hardcode rough prices for margin estimation if live not avail
        notionalUSD = positionLots * 100 * 2350;
    }

    let notionalAccount = notionalUSD;
    // Since we treat account as base USD always now
    notionalAccount = notionalUSD;

    const marginRequired = notionalAccount / leverageVal;
    const marginPercent = (marginRequired / inputs.accountBalance) * 100;

    let marginStatus: 'Safe' | 'Caution' | 'Warning' | 'Danger' = 'Safe';
    if (marginPercent > 20) marginStatus = 'Danger';
    else if (marginPercent > 15) marginStatus = 'Warning';
    else if (marginPercent > 10) marginStatus = 'Caution';


    // --- 7. BENCHMARKS ---
    // 5k acct -> 1% risk -> $50.
    // Benchmarks logic:
    // UltraSafe: Risk < 0.5%
    // Conservative: Risk < 1%
    // Standard: Risk 1-2%
    // Aggressive: Risk > 2%

    let tier: CalculatorResult['benchmarks']['yourTier'] = 'Standard';
    if (inputs.riskPercentage < 0.5) tier = 'Ultra-Safe';
    else if (inputs.riskPercentage < 1) tier = 'Conservative';
    else if (inputs.riskPercentage <= 2) tier = 'Standard';
    else if (inputs.riskPercentage <= 5) tier = 'Aggressive';
    else tier = 'Reckless';


    // --- 8. DRAWDOWN SCNEARIOS ---
    const scenarios: DrawdownScenario[] = [2, 3, 5, 10].map(lossCount => {
        const loss = riskAmountAccount * lossCount;
        const rem = inputs.accountBalance - loss;
        const dd = (loss / inputs.accountBalance) * 100;
        let status: 'Safe' | 'Caution' | 'Danger' = 'Safe';
        if (dd > 20) status = 'Danger';
        else if (dd > 10) status = 'Caution';

        return {
            consecutiveLosses: lossCount,
            lossAmount: loss,
            remainingBalance: rem,
            drawdownPercent: dd,
            status
        };
    });

    // --- 9. WARNINGS ---
    if (marginPercent > 20) {
        warnings.push({
            severity: 'Critical',
            title: 'High Margin Usage',
            message: `This position requires ${marginPercent.toFixed(1)}% of your account definition.`
        });
    }
    if (positionLots < 0.01) {
        warnings.push({
            severity: 'High',
            title: 'Position Too Small',
            message: `Calculated size ${positionLots.toFixed(3)} lots is below standard broker minimums (0.01).`
        });
    }
    if (inputs.riskPercentage > 5) {
        warnings.push({
            severity: 'Critical',
            title: 'Reckless Risk',
            message: 'Risking >5% per trade leads to rapid account blowup.'
        });
    }

    // --- 9. WARNINGS ---
    // Rule: If position < 0.01 lots, account is technically too small for this risk/SL combo
    if (positionLots > 0 && positionLots < 0.01) {
        // Calculate required balance for 0.01 lots
        const slForCalc = inputs.mode === 'CalculateLots' ? (inputs.stopLossPips + (inputs.spreadPips || 0)) : 10; // Fallback
        const minBalance = (0.01 * slForCalc * pipValueAccount * 100) / inputs.riskPercentage;

        // Generic currency symbol since we removed selector
        const currencySymbol = '$';

        warnings.push({
            severity: 'Low', // Informational/Recommendation
            title: 'Account Size Recommendation',
            message: `Your account is too small for this trade setup. To trade 0.01 lots safely, you need at least ${currencySymbol}${Math.ceil(minBalance)}.`
        });
    }


    return {
        isValid: true,
        positionSize: {
            lots: Number(positionLots.toFixed(2)),
            units: Math.round(positionLots * 100000),
            miniLots: Number((positionLots * 10).toFixed(1)),
            microLots: Number((positionLots * 100).toFixed(0))
        },
        recommendedSL: Number(recommendedSL.toFixed(1)),
        riskAmount: Number(riskAmountAccount.toFixed(2)),
        margin: {
            required: Number(marginRequired.toFixed(2)),
            percent: Number(marginPercent.toFixed(1)),
            status: marginStatus
        },
        pipValue: Number(pipValueAccount.toFixed(2)),
        drawdownScenarios: scenarios,
        benchmarks: {
            conservative: 0, // Placeholder
            standard: 0,
            aggressive: 0,
            yourTier: tier
        },
        meta: {
            ratesTimestamp: rates.timestamp,
            ratesUsed
        },
        warnings
    };
}
