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
    '10:1': 10,
    '20:1': 20,
    '30:1': 30,
    '50:1': 50,
    '100:1': 100,
    '200:1': 200,
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
    if (!inputs.stopLossPips || inputs.stopLossPips <= 0) {
        throw new Error("Invalid Stop Loss");
    }

    const pairDef = PAIR_DATA[inputs.currencyPair];
    if (!pairDef) throw new Error("Unknown Pair");

    // Validate Gold
    if (pairDef.type === 'Gold' && !inputs.goldPipDefinition) {
        throw new Error("Gold Definition Required");
    }


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
        // 0.01 def -> $1
        // 0.10 def -> $10
        // 1.00 def -> $100
        if (inputs.goldPipDefinition === '0.01') pipValueUSD = 1;
        else if (inputs.goldPipDefinition === '0.10') pipValueUSD = 10;
        else if (inputs.goldPipDefinition === '1.00') pipValueUSD = 100;
    }

    // --- 3. CONVERT TO ACCOUNT CURRENCY ---
    // We need Pip Value in Account Currency.
    // pipValueUSD is pip value in USD.
    // if Account is USD -> pipValUSD
    // if Account is EUR -> pipValUSD / EURUSD_Rate
    // if Account is INR -> pipValUSD * USDINR_Rate

    let pipValueAccount = pipValueUSD;

    if (inputs.accountCurrency === 'USD') {
        pipValueAccount = pipValueUSD;
    } else if (inputs.accountCurrency === 'EUR') {
        // 1 USD = 0.9 EUR? No, API gives 1 USD = X EUR (e.g. 0.92) or EUR=1.09USD?
        // exchangerate-api base USD gives: "EUR": 0.92 (meaning $1 = €0.92)
        // Wait, usually EUR/USD is > 1. 
        // exchangerate-api gives rates relative to Base.
        // If Base=USD. "EUR": 0.92 means 1 USD = 0.92 EUR.
        // So to convert USD to EUR, multiply by rate.
        pipValueAccount = pipValueUSD * rates.EUR;
        ratesUsed.push(`USD/EUR: ${rates.EUR}`);
    } else if (inputs.accountCurrency === 'GBP') {
        pipValueAccount = pipValueUSD * rates.GBP;
    } else if (inputs.accountCurrency === 'JPY') {
        pipValueAccount = pipValueUSD * rates.JPY;
    } else if (inputs.accountCurrency === 'INR') {
        pipValueAccount = pipValueUSD * rates.INR;
    }

    // --- 4. RISK AMOUNT CALCULATION ---
    // Risk is in Account Currency
    const riskAmountAccount = inputs.accountBalance * (inputs.riskPercentage / 100);

    // Calculate USD and INR equivalents for display
    let riskUSD = riskAmountAccount;
    let riskINR = riskAmountAccount;

    if (inputs.accountCurrency === 'USD') {
        riskUSD = riskAmountAccount;
        riskINR = riskAmountAccount * rates.INR;
    } else {
        // Convert account currency back to USD
        // If 1 USD = X Rate. Then Account = USD * Rate. -> USD = Account / Rate.
        const rateToUSD = rates[inputs.accountCurrency as keyof ExchangeRates] || 1;
        riskUSD = riskAmountAccount / rateToUSD;
        riskINR = riskUSD * rates.INR;
    }


    // --- 5. POSITION SIZE CALCULATION ---
    // Lots = RiskAmount / (SL * PipValueAccount)
    const positionLots = riskAmountAccount / (inputs.stopLossPips * pipValueAccount);


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

    // Convert Notional to Account Currency to compare with Balance
    let notionalAccount = notionalUSD;
    if (inputs.accountCurrency !== 'USD') {
        const rate = rates[inputs.accountCurrency as keyof ExchangeRates] || 1;
        notionalAccount = notionalUSD * rate;
    }

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


    return {
        isValid: true,
        positionSize: {
            lots: Number(positionLots.toFixed(2)),
            units: Math.round(positionLots * 100000),
            miniLots: Number((positionLots * 10).toFixed(1)),
            microLots: Number((positionLots * 100).toFixed(0))
        },
        riskAmount: {
            accountCurrency: Number(riskAmountAccount.toFixed(2)),
            usd: Number(riskUSD.toFixed(2)),
            inr: Number(riskINR.toFixed(2))
        },
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
