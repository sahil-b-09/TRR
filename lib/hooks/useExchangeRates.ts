import { useState, useEffect } from 'react';
import { ExchangeRates } from '../calculator-types';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const CACHE_KEY = 'forex_calculator_rates';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const FALLBACK_RATES: ExchangeRates = {
    USD: 1,
    EUR: 0.92, // 1 USD = 0.92 EUR
    GBP: 0.78,
    JPY: 150.50,
    INR: 83.50,
    timestamp: Date.now()
};

export function useExchangeRates() {
    const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const fetchRates = async () => {
            // 1. Check Cache
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const data = JSON.parse(cached);
                const age = Date.now() - data.timestamp;
                if (age < CACHE_DURATION) {
                    console.log("Using cached rates");
                    setRates(data);
                    setIsLoading(false);
                    return;
                }
            }

            // 2. Fetch Live
            try {
                console.log("Fetching live rates...");
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("API Failed");
                const json = await res.json();

                const newRates: ExchangeRates = {
                    USD: 1,
                    EUR: json.rates.EUR,
                    GBP: json.rates.GBP,
                    JPY: json.rates.JPY,
                    INR: json.rates.INR,
                    timestamp: Date.now()
                };

                setRates(newRates);
                localStorage.setItem(CACHE_KEY, JSON.stringify(newRates));
                setIsOffline(false);
            } catch (err) {
                console.error("Rate fetch failed, using fallback:", err);
                setIsOffline(true);
                // Keep fallback or expired cache
            } finally {
                setIsLoading(false);
            }
        };

        fetchRates();
    }, []);

    return { rates, isLoading, isOffline };
}
