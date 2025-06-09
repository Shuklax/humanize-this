export function diff(date1: Date, date2: Date): string {
  try {
    if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
      throw new Error('First date is invalid');
    }

    if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
      throw new Error('Second date is invalid');
    }

    const diffMs = Math.abs(date2.getTime() - date1.getTime());
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years) return `${years} year${years > 1 ? "s" : ""}`;
    if (months) return `${months} month${months > 1 ? "s" : ""}`;
    if (days) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Time difference calculation failed: ${error.message}`);
    }
    throw new Error('Time difference calculation failed: Unknown error');
  }
}
