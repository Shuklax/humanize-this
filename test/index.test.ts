import { describe, expect, it } from "vitest";
import {humanize} from "../src/index";

describe("humanize.bytes", ()=> {
  it("should handle basic byte conversions", ()=> {
    expect(humanize.bytes(0)).toBe("0 B");
    expect(humanize.bytes(1024)).toBe("1.00 KB");
    expect(humanize.bytes(1536)).toBe("1.50 KB");
    expect(humanize.bytes(1048576)).toBe("1.00 MB");
  });

  it("should handle large byte values", ()=> {
    expect(humanize.bytes(1024 * 1024 * 1024)).toBe("1.00 GB");
    expect(humanize.bytes(1024 * 1024 * 1024 * 1024)).toBe("1.00 TB");
    expect(humanize.bytes(1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.00 PB");
    expect(humanize.bytes(1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.00 EB");
    expect(humanize.bytes(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.00 ZB");
    expect(humanize.bytes(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.00 YB");
  });

  it("should handle decimal places correctly", ()=> {
    expect(humanize.bytes(1500)).toBe("1.46 KB");
    expect(humanize.bytes(1500000)).toBe("1.43 MB");
    expect(humanize.bytes(1500000000)).toBe("1.40 GB");
  });

  it("should throw error for invalid inputs", ()=> {
    expect(() => humanize.bytes(-1)).toThrow("Bytes must be a non-negative number");
    expect(() => humanize.bytes("invalid" as any)).toThrow("Input must be a valid number");
    expect(() => humanize.bytes(NaN)).toThrow("Input must be a valid number");
  });
});


describe("humanize.time", ()=> {
  it("should handle basic time conversions", ()=> {
    expect(humanize.time(0)).toBe("0 sec");
    expect(humanize.time(30)).toBe("30 sec");
    expect(humanize.time(60)).toBe("1 min");
    expect(humanize.time(90)).toBe("1 min 30 sec");
    expect(humanize.time(3600)).toBe("1 hr");
  });

  it("should handle large time values", ()=> {
    expect(humanize.time(3661)).toBe("1 hr 1 min 1 sec");
    expect(humanize.time(86400)).toBe("24 hr");
  });

  it("should throw error for invalid inputs", ()=> {
    expect(() => humanize.time(-1)).toThrow("Time must be a non-negative number");
    expect(() => humanize.time("invalid" as any)).toThrow("Input must be a valid number");
    expect(() => humanize.time(NaN)).toThrow("Input must be a valid number");
  });
});


describe("humanize.timeAgo", ()=> {
  it("should handle recent times", ()=> {
    const now = new Date();
    const aFewSecsAgo = new Date(now.getTime() - 5000);
    expect(humanize.timeAgo(aFewSecsAgo)).toBe("just now");

    const oneMinAgo = new Date(now.getTime() - 60 * 1000);
    expect(humanize.timeAgo(oneMinAgo)).toBe("1 min ago");

    const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000);
    expect(humanize.timeAgo(tenMinAgo)).toBe("10 min ago");
  });

  it("should handle hours and days", ()=> {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600 * 1000);
    expect(humanize.timeAgo(oneHourAgo)).toBe("1 hr ago");

    const fiveHoursAgo = new Date(now.getTime() - 5 * 3600 * 1000);
    expect(humanize.timeAgo(fiveHoursAgo)).toBe("5 hr ago");

    const oneDayAgo = new Date(now.getTime() - 24 * 3600 * 1000);
    expect(humanize.timeAgo(oneDayAgo)).toBe("1 day ago");

    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 3600 * 1000);
    expect(humanize.timeAgo(sixDaysAgo)).toBe("6 days ago");
  });

  it("should handle different locales", ()=> {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 3600 * 1000);
    expect(humanize.timeAgo(oneDayAgo, "en-US")).toBe("1 day ago");
    // Add more locale tests when supported
  });

  it("should throw error for invalid inputs", ()=> {
    expect(() => humanize.timeAgo("invalid" as any)).toThrow("Invalid date input");
    expect(() => humanize.timeAgo(new Date("invalid"))).toThrow("Invalid date input");
  });

  it("should throw error for future dates", ()=> {
    const now = new Date();
    const future = new Date(now.getTime() + 1000);
    expect(() => humanize.timeAgo(future)).toThrow("Date is in the future");
  });
});


describe("humanize.number", ()=> {
  it("should add commas in Indian format", ()=> {
    expect(humanize.number(1000)).toBe("1,000");
    expect(humanize.number(1000000)).toBe("10,00,000");
    expect(humanize.number(123456789)).toBe("12,34,56,789");
  });
});



describe("humanize.currency", () => {
  describe("Indian number system (en-IN)", () => {
    it("should format numbers in Indian style with ₹ symbol", () => {
      expect(humanize.currency(1500, "en-IN", "INR")).toBe("₹1.50K");
      expect(humanize.currency(150000, "en-IN", "INR")).toBe("₹1.50L");
      expect(humanize.currency(15000000, "en-IN", "INR")).toBe("₹1.50Cr");
      expect(humanize.currency(900, "en-IN", "INR")).toBe("₹900.00");
    });
  });

  describe("International number system", () => {
    it("should format numbers in international style with $ symbol", () => {
      expect(humanize.currency(1500, "en-US", "USD")).toBe("$1.50K");
      expect(humanize.currency(150000, "en-US", "USD")).toBe("$150.00K");
      expect(humanize.currency(1500000, "en-US", "USD")).toBe("$1.50M");
      expect(humanize.currency(1500000000, "en-US", "USD")).toBe("$1.50B");
      expect(humanize.currency(900, "en-US", "USD")).toBe("$900.00");
    });

    it("should work with other currencies", () => {
      expect(humanize.currency(1500, "en-GB", "GBP")).toBe("£1.50K");
      expect(humanize.currency(1500, "de-DE", "EUR")).toBe("€1.50K");
    });
  });

  it("should work with custom symbol", ()=> {
    expect(humanize.currency(1500, "$")).toBe("$1.50K");
  });
});


describe("humanize.slug", ()=> {
  it("should slugify strings", ()=> {
    expect(humanize.slug("Let's code")).toBe("let-s-code");
    expect(humanize.slug("Hello__World!")).toBe("hello-world");
  });
});


describe("humanize.url", ()=> {
  it("should simplify URLs", ()=> {
    const input = "https://random.com/some/random/link/tobe/simplified";
    const output = "random.com › some › random › link › tobe › simplified";
    expect(humanize.url(input)).toBe(output);
  });
});


describe("humanize.pluralize", ()=> {
  it("should handle basic pluralization", ()=> {
    expect(humanize.pluralize("apple", 1)).toBe("1 apple");
    expect(humanize.pluralize("apple", 2)).toBe("2 apples");
    expect(humanize.pluralize("apple", 0)).toBe("0 apples");
  });

  it("should handle irregular plurals", ()=> {
    expect(humanize.pluralize("mouse", 1)).toBe("1 mouse");
    expect(humanize.pluralize("mouse", 2)).toBe("2 mice");
    expect(humanize.pluralize("person", 1)).toBe("1 person");
    expect(humanize.pluralize("person", 2)).toBe("2 people");
    expect(humanize.pluralize("child", 1)).toBe("1 child");
    expect(humanize.pluralize("child", 2)).toBe("2 children");
  });

  it("should handle words ending in -y", ()=> {
    expect(humanize.pluralize("city", 1)).toBe("1 city");
    expect(humanize.pluralize("city", 2)).toBe("2 cities");
    expect(humanize.pluralize("day", 1)).toBe("1 day");
    expect(humanize.pluralize("day", 2)).toBe("2 days"); // exception
  });

  it("should handle words ending in -o", ()=> {
    expect(humanize.pluralize("potato", 1)).toBe("1 potato");
    expect(humanize.pluralize("potato", 2)).toBe("2 potatoes");
    expect(humanize.pluralize("photo", 1)).toBe("1 photo");
    expect(humanize.pluralize("photo", 2)).toBe("2 photos"); // exception
  });

  it("should handle words ending in -f/-fe", ()=> {
    expect(humanize.pluralize("leaf", 1)).toBe("1 leaf");
    expect(humanize.pluralize("leaf", 2)).toBe("2 leaves");
    expect(humanize.pluralize("knife", 1)).toBe("1 knife");
    expect(humanize.pluralize("knife", 2)).toBe("2 knives");
  });

  it("should handle words that don't change", ()=> {
    expect(humanize.pluralize("sheep", 1)).toBe("1 sheep");
    expect(humanize.pluralize("sheep", 2)).toBe("2 sheep");
    expect(humanize.pluralize("deer", 1)).toBe("1 deer");
    expect(humanize.pluralize("deer", 2)).toBe("2 deer");
  });

  it("should handle words ending in -is", ()=> {
    expect(humanize.pluralize("analysis", 1)).toBe("1 analysis");
    expect(humanize.pluralize("analysis", 2)).toBe("2 analyses");
    expect(humanize.pluralize("crisis", 1)).toBe("1 crisis");
    expect(humanize.pluralize("crisis", 2)).toBe("2 crises");
  });

  it("should throw error for invalid inputs", ()=> {
    expect(() => humanize.pluralize("", 1)).toThrow("Word must be a non-empty string");
    expect(() => humanize.pluralize("word", "invalid" as any)).toThrow("Count must be a valid number");
  });
});


describe("humanize.ordinal", ()=> {
  it("should handle basic ordinal numbers", ()=> {
    expect(humanize.ordinal(1)).toBe("1st");
    expect(humanize.ordinal(2)).toBe("2nd");
    expect(humanize.ordinal(3)).toBe("3rd");
    expect(humanize.ordinal(4)).toBe("4th");
    expect(humanize.ordinal(5)).toBe("5th");
  })

  it("should handle special cases", ()=> {
    expect(humanize.ordinal(11)).toBe("11th");
    expect(humanize.ordinal(12)).toBe("12th");
    expect(humanize.ordinal(13)).toBe("13th");
    expect(humanize.ordinal(21)).toBe("21st");
    expect(humanize.ordinal(22)).toBe("22nd");
    expect(humanize.ordinal(23)).toBe("23rd");
    expect(humanize.ordinal(111)).toBe("111th");
    expect(humanize.ordinal(112)).toBe("112th");
    expect(humanize.ordinal(113)).toBe("113th");
  });

  it("should handle different locales", ()=> {
    expect(humanize.ordinal(1, "en-US")).toBe("1st");
    expect(humanize.ordinal(1, "fr")).toBe("Sorry, fallback for other languages is not supported yet");
  });

  it("should throw error for invalid inputs", ()=> {
    expect(() => humanize.ordinal("invalid" as any)).toThrow("Input must be a valid number");
    expect(() => humanize.ordinal(1.5)).toThrow("Input must be an integer");
    expect(() => humanize.ordinal(NaN)).toThrow("Input must be a valid number");
  });
});


describe("humanize.diff", ()=> {
  it("should return difference in humanized form", ()=> {
    const now = new Date();
    const oneDayLater = new Date(now.getTime() + 1*86400*1000);
    const oneMonthLater = new Date(now.getTime() + 30*86400*1000);

    expect(humanize.diff(now, oneDayLater)).toBe("1 day");
    expect(humanize.diff(now, oneMonthLater)).toBe("1 month");
  });
});


describe("humanize.words", ()=> {
  it("should return limited words", ()=> {
    expect(humanize.words("The quick brown fox jumps over the lazy dogs", 3)).toBe(
      "The quick brown..."
    );

    expect(humanize.words("Short", 3)).toBe("Short");
  });
});