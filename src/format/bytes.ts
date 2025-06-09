export function bytes(input: unknown): string {
  try {
    if (typeof input !== 'number' || isNaN(input)) {
      throw new Error('Input must be a valid number');
    }

    if (input < 0) {
      throw new Error('Bytes must be a non-negative number');
    }

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.min(Math.floor(Math.log(input) / Math.log(k)), sizes.length - 1);
    
    // Handle zero bytes case
    if (input === 0) return '0 B';
    
    const value = input / Math.pow(k, i);
    return `${value.toFixed(2)} ${sizes[i]}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Byte formatting failed: ${error.message}`);
    }
    throw new Error('Byte formatting failed: Unknown error');
  }
}