import { getConfig } from "../config";

export function number(num: number, locale?: string): string {
  try {
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('Invalid number input');
    }

    const config = getConfig();
    const finalLocale = locale || config.locale;

    if (typeof finalLocale !== 'string' || !finalLocale.trim()) {
      throw new Error('Invalid locale');
    }

    return num.toLocaleString(finalLocale);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Number formatting failed: ${error.message}`);
    }
    throw new Error('Number formatting failed: Unknown error');
  }
}