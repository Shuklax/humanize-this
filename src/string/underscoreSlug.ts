export function underscoreSlug(str: string): string {
  try {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    if (!str.trim()) {
      throw new Error('Input string cannot be empty');
    }

    return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)+/g, "");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Underscore slug creation failed: ${error.message}`);
    }
    throw new Error('Underscore slug creation failed: Unknown error');
  }
}