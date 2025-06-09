import { getConfig } from "../config.js";

export function ordinal(n: number, locale?: string): string {
  try {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new Error('Input must be a valid number');
    }

    if (!Number.isInteger(n)) {
      throw new Error('Input must be an integer');
    }

    const config = getConfig();
    const finalLocale = locale || config.locale;

    if (typeof finalLocale !== 'string' || !finalLocale.trim()) {
      throw new Error('Invalid locale');
    }

    // For non-English locales
    if (!finalLocale.startsWith('en')) {
      return 'Sorry, fallback for other languages is not supported yet';
    }

    
    return new Intl.NumberFormat(finalLocale, { 
      style: "decimal",
      notation: "standard"
    }).format(n) + getOrdinalSuffix(n, finalLocale);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Ordinal formatting failed: ${error.message}`);
    }
    throw new Error('Ordinal formatting failed: Unknown error');
  }
}

function getOrdinalSuffix(n: number, locale: string): string {
  if (locale.startsWith('en')) {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }
  return ''; //would add support for other locales soon
}
