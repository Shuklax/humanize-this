export function slug(str: string): string {
  try {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    if (!str.trim()) {
      throw new Error('Input string cannot be empty');
    }

    return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Slug creation failed: ${error.message}`);
    }
    throw new Error('Slug creation failed: Unknown error');
  }
}