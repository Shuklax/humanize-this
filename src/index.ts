export const humanize = {
  /**
   * Converts bytes into human-readable format.
   */
  bytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  
  /**
   * Converts seconds into minutes and seconds.
   */
  time(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  },


  /**
   * Converts ISO date to 'x time ago' format.
   */
  timeAgo(date: Date): string {
    const now = new Date().getTime();
    const diff = Math.floor((now - date.getTime()) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return date.toDateString();
  },



  /**
   * Adds commas to large numbers.
   */
  number(num: number): string {
    return num.toLocaleString("en-IN");
  },



  /**
   * Currency formatter (₹1.23L, $3.5K)
   */
  currency(num: number, symbol = "₹"): string {
    if (num >= 1_00_000) return `${symbol}${(num / 1_00_000).toFixed(2)}L`;
    if (num >= 1_000) return `${symbol}${(num / 1_000).toFixed(2)}K`;
    return `${symbol}${num}`;
  },



  /**
   * Slugifies a string (e.g., "Let's Code" => "lets-code")
   */
  slug(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  },



  /**
   * Turns https://github.com/openai/gpt-4/blob/main/index.ts -→ github.com › openai › gpt-4 › index.ts
   * */

  url(url: string): string {
    try {
      const u = new URL(url);
      const cleanPath = u.pathname.replace(/^\//, "").replace(/\//g, " › ");
      return `${u.hostname} › ${cleanPath}`;
    } catch {
      return url;
    }
  },


  /**
   * Smart pluralization.
      humanizePlural("apple", 1) → 1 apple
      humanizePlural("apple", 3) → 3 apples
   */

  pluralarize(word: string, count: number): string {
    const plural = count === 1 ? word : word + "s";
    return `${count} ${plural}`;
  },


  /**
   * 1 → 1st, 2 → 2nd, 3 → 3rd, 11 → 11th, etc.
   */
  ordinal(n: number): string {
    const mod10 = n % 10;
    const mod100 = n % 100;
    const suffix =
      mod10 === 1 && mod100 !== 11
        ? "st"
        : mod10 === 2 && mod100 !== 12
        ? "nd"
        : mod10 === 3 && mod100 !== 13
        ? "rd"
        : "th";
    return `${n}${suffix}`;
  },


  /**
   * Returns human-readable time diff between two dates.
   * Example: "3 days", "2 months"
   */
  diff(date1: Date, date2: Date): string {
    const diffMs = Math.abs(date2.getTime() - date1.getTime());
    const diffSec = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSec / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    return `${diffSec} second${diffSec !== 1 ? "s" : ""}`;
  },

  /**
   * Limits a string to N words (e.g., for previews).
   * Example: humanize.words("Hello world this is cool", 3) → "Hello world this..."
   */
  words(str: string, limit: number): string {
    const parts = str.trim().split(/\s+/);
    if (parts.length <= limit) return str;
    return parts.slice(0, limit).join(" ") + "...";
  },
};
