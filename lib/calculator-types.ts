export type AccountCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR';
export type PairType = 'Major' | 'JPY' | 'Gold' | 'Minor';
export type GoldPipDefinition = '0.01' | '0.10' | '1.00';
export type Leverage = '10:1' | '20:1' | '30:1' | '50:1' | '100:1' | '200:1';

export interface CalculatorInputs {
    accountBalance: number;
    accountCurrency: AccountCurrency;
    currencyPair: string;
    stopLossPips: number;
    riskPercentage: number;
    leverage: Leverage;
    goldPipDefinition?: GoldPipDefinition; // Required if pair is Gold
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
    riskAmount: {
        accountCurrency: number;
        usd: number;
        inr: number;
    };
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
