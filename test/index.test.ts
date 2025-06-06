import { describe, expect, it } from "vitest";
import {humanize} from "../src/index";

describe("humanize.bytes", ()=> {
  it("should return human readable bytes", ()=> {
    expect(humanize.bytes(0)).toBe("0 B");
    expect(humanize.bytes(1024)).toBe("1 KB");
    expect(humanize.bytes(1536)).toBe("1.5 KB");
    expect(humanize.bytes(1048576)).toBe("1 MB");
  });
});


describe("humanize.time", ()=> {
  it("should convert seconds into min and sec", ()=> {
    expect(humanize.time(90)).toBe("1 min 30 sec");
    expect(humanize.time(59)).toBe("0 min 59 sec");
  });
});


describe("humanize.timeAgo", ()=> {
  it("should convert seconds into min and sec", ()=> {
    const now = new Date();
    const aFewSecsAgo = new Date(now.getTime()-5000);
    expect(humanize.timeAgo(aFewSecsAgo)).toBe("just now");
  });

  it("should retrun min ago, hr ago etc", ()=> {
    const now = new Date();
    const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000);
    expect(humanize.timeAgo(tenMinAgo)).toMatch(/min ago/);

    const fiveHrAgo = new Date(now.getTime() - 5*3600*1000);
    expect(humanize.timeAgo(fiveHrAgo)).toMatch(/hr ago/);
  });
});


describe("humanize.number", ()=> {
  it("should add commas in Indian format", ()=> {
    expect(humanize.number(1000)).toBe("1,000");
    expect(humanize.number(1000000)).toBe("10,00,000");
    expect(humanize.number(123456789)).toBe("12,34,56,789");
  });
});



describe("humanize.currency", ()=> {
  it("should format number as ₹ currency", ()=> {
    expect(humanize.currency(1500)).toBe("₹1.50K");
    expect(humanize.currency(150000)).toBe("₹1.50L");
    expect(humanize.currency(900)).toBe("₹900");
  })

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

  it("should return input on error", ()=> {
    expect(humanize.url("not-a-valid-url")).toBe("not-a-valid-url");
  });
});


describe("humanize.pluralize", ()=> {
  it("should pluralize correctly", ()=> {
    expect(humanize.pluralarize("apple", 1)).toBe("1 apple");
    expect(humanize.pluralarize("apple", 3)).toBe("3 apples");
  });
});


describe("humanize.ordinal", ()=> {
  it("should return correct ordinal suffix", ()=> {
    expect(humanize.ordinal(1)).toBe("1st");
    expect(humanize.ordinal(2)).toBe("2nd");
    expect(humanize.ordinal(3)).toBe("3rd");
    expect(humanize.ordinal(4)).toBe("4th");
    expect(humanize.ordinal(11)).toBe("11th");
    expect(humanize.ordinal(21)).toBe("21st");
  })
})


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