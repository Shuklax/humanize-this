export function trim(str: unknown): string {
  try {
    if (typeof str !== 'string') throw new Error('Input must be a string');
    return str.trim();
  } catch (error) {
    return '';
  }
}