import { getConfig } from "../config";

export function timeAgo(date: unknown, locale?: string): string {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }

    const config = getConfig();
    const finalLocale = locale || config.locale;

    if (typeof finalLocale !== "string" || !finalLocale.trim()) {
      throw new Error("Invalid locale");
    }

    const now = Date.now();
    const diff = Math.floor((now - date.getTime()) / 1000);

    if (diff < 0) {
      throw new Error("Date is in the future");
    }

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return date.toLocaleDateString(finalLocale);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Time ago calculation failed: ${error.message}`);
    }
    throw new Error("Time ago calculation failed: Unknown error");
  }
}
