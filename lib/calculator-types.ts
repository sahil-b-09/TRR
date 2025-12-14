export type AccountCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR'; // Kept for legacy compatibility if needed, though unused in UI
export type PairType = 'Major' | 'JPY' | 'Gold' | 'Minor';
export type Leverage = '1:100' | '1:200' | '1:500' | '1:1000';

export type CalculationMode = 'CalculateLots' | 'CalculateSL';
export type RiskUnit = 'Percentage' | 'Amount';

export interface CalculatorInputs {
    mode: CalculationMode;
    accountBalance: number;
    // accountCurrency removed - simplified to generic units
    currencyPair: string;
    stopLossPips: number; // Used in CalculateLots mode
    spreadPips: number; // New: Spread Buffer
    lotSizeInput?: number; // Used in CalculateSL mode

    riskUnit: RiskUnit;
    riskPercentage: number;
    riskAmount: number; // Used if RiskUnit is 'Amount'

    leverage: Leverage;
    targetProfitPips?: number; // Optional
}

export interface CalculatorResult {
    isValid: boolean;
    positionSize: {
        lots: number;
        units: number;
        miniLots: number;
        microLots: number;
    };
    riskAmount: number; // Simplified to single value
    margin: {
        required: number;
        percent: number;
        status: 'Safe' | 'Caution' | 'Warning' | 'Danger';
    };
    pipValue: number; // In account currency
    riskReward?: {
        ratio: number;
        potentialProfit: number;
        minWinRate: number;
        quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    };
    recommendedSL?: number; // Result for CalculateSL mode
    drawdownScenarios: DrawdownScenario[];
    benchmarks: {
        conservative: number;
        standard: number;
        aggressive: number;
        yourTier: 'Ultra-Safe' | 'Conservative' | 'Standard' | 'Aggressive' | 'Reckless';
    };
    meta: {
        ratesTimestamp: number;
        ratesUsed: string[];
    };
    warnings: CalculationWarning[];
}

export interface DrawdownScenario {
    consecutiveLosses: number;
    lossAmount: number;
    remainingBalance: number;
    drawdownPercent: number;
    status: 'Safe' | 'Caution' | 'Danger';
}

export interface CalculationWarning {
    severity: 'Info' | 'Low' | 'Medium' | 'High' | 'Critical';
    title: string;
    message: string;
}

export interface ExchangeRates {
    USD: number; // Base 1
    EUR: number;
    GBP: number;
    JPY: number;
    INR: number;
    timestamp: number;
}

export interface PairDefinition {
    name: string;
    type: PairType;
    basePipValue: number; // USD per standard lot per pip (default)
    minSL: number;
}
