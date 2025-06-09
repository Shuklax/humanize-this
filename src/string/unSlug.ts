export function unSlug(str: string): string {
  try {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    if (!str.trim()) {
      throw new Error('Input string cannot be empty');
    }

    return str.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unslug conversion failed: ${error.message}`);
    }
    throw new Error('Unslug conversion failed: Unknown error');
  }
}