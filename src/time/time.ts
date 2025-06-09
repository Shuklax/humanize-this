export function time(seconds: unknown): string {
  try {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      throw new Error('Input must be a valid number');
    }

    if (seconds < 0) {
      throw new Error('Time must be a non-negative number');
    }

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs) parts.push(`${hrs} hr`);
    if (mins) parts.push(`${mins} min`);
    if (secs || parts.length === 0) parts.push(`${secs} sec`);

    return parts.join(' ');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Time formatting failed: ${error.message}`);
    }
    throw new Error('Time formatting failed: Unknown error');
  }
}