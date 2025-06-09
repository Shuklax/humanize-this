import { getConfig } from "../config.js";

const CURRENCY_SYMBOLS: Record<string, string> = {
  "INR": "₹",
  "USD": "$",
  "EUR": "€",
  "GBP": "£"
};

const INDIAN_NUMBER_SYSTEM = {
  CRORE: 1_00_00_000,  // 1 crore = 10 million
  LAKH: 1_00_000,      // 1 lakh = 100 thousand
  THOUSAND: 1_000
};

export function currency(
  num: number,
  localeOrSymbol?: string,
  currencyCode?: string
): string {
  try {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('Invalid number input');
    }

    const config = getConfig();
    const finalCurrency = currencyCode || config.currency;
    const defaultSymbol = CURRENCY_SYMBOLS[finalCurrency] || finalCurrency;

    // If a symbol is provided (single character or starts with a currency symbol)
    if (typeof localeOrSymbol === 'string' && 
        (localeOrSymbol.length === 1 || 
         Object.values(CURRENCY_SYMBOLS).some(symbol => localeOrSymbol.startsWith(symbol)))) {
      const symbol = localeOrSymbol;
      if (num >= 1_000_000_000) {
        return `${symbol}${(num / 1_000_000_000).toFixed(2)}B`;
      }
      if (num >= 1_000_000) {
        return `${symbol}${(num / 1_000_000).toFixed(2)}M`;
      }
      if (num >= 1000) {
        return `${symbol}${(num / 1000).toFixed(2)}K`;
      }
      return `${symbol}${num.toFixed(2)}`;
    }

    // For Indian currency (INR)
    if (finalCurrency === "INR") {
      if (num >= INDIAN_NUMBER_SYSTEM.CRORE) {
        return `${defaultSymbol}${(num / INDIAN_NUMBER_SYSTEM.CRORE).toFixed(2)}Cr`;
      }
      if (num >= INDIAN_NUMBER_SYSTEM.LAKH) {
        return `${defaultSymbol}${(num / INDIAN_NUMBER_SYSTEM.LAKH).toFixed(2)}L`;
      }
      if (num >= INDIAN_NUMBER_SYSTEM.THOUSAND) {
        return `${defaultSymbol}${(num / INDIAN_NUMBER_SYSTEM.THOUSAND).toFixed(2)}K`;
      }
      return `${defaultSymbol}${num.toFixed(2)}`;
    }

    // For all other currencies (non-Indian)
    if (num >= 1_000_000_000) {
      return `${defaultSymbol}${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `${defaultSymbol}${(num / 1_000_000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${defaultSymbol}${(num / 1000).toFixed(2)}K`;
    }
    return `${defaultSymbol}${num.toFixed(2)}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Currency formatting failed: ${error.message}`);
    }
    throw new Error('Currency formatting failed: Unknown error');
  }
}