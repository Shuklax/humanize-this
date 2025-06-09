export function words(str: string, limit: number): string {
  try {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    if (!str.trim()) {
      throw new Error('Input string cannot be empty');
    }

    if (typeof limit !== 'number' || isNaN(limit)) {
      throw new Error('Limit must be a valid number');
    }

    if (limit < 0) {
      throw new Error('Limit must be a non-negative number');
    }

    const parts = str.trim().split(/\s+/);
    if (parts.length <= limit) return str;
    return parts.slice(0, limit).join(" ") + "...";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Word limiting failed: ${error.message}`);
    }
    throw new Error('Word limiting failed: Unknown error');
  }
}