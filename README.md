#  humanize-this

 A lightweight utility package that transforms machine-readable data into **clean, human-friendly formats**. Perfect for dashboards, logs, CLIs, or just flexing smart UX.

---

 Features

> All functions are `humanize.<name>()`

-  `bytes` – Format file sizes (e.g., `2048 → 2 KB`)
-  `time` – Seconds → `x min y sec`
-  `ordinal` – Adds ordinal suffixes (`1 → 1st`)
-  `timeAgo` – Human-readable date diffs (`"5 min ago"`)
-  `currency` – Number → `₹1.23L`, `$3.4K`
-  `slug` – Slugifies a string (`"Let's Code" → "lets-code"`)
-  `url` – Condenses URLs (`github.com › Shuklax › GrillPrep`)
-  `number` – Adds commas (`123456 → 1,23,456`)
-  `pluralarize` – Smart plural (`3 apples`)
-  `ordinalize` – English ordinal (`2 → 2nd`)
-  `diff` – Date difference (`2 months`, `3 days`)
-  `words` – Limits string by word count

---

 Install

```bash
npm install humanize-this
# or
pnpm add humanize-this

---

 Usage

import { humanize } from "humanize-this";

humanize.bytes(2048);           // "2 KB"
humanize.ordinal(3);            // "3rd"
humanize.time(90);              // "1 min 30 sec"
humanize.slug("Hello World!");  // "hello-world"
humanize.currency(123456);      // "₹1.23L"
humanize.timeAgo(new Date());   // "just now"
humanize.url("https://random.com/some/random/links"); // random.com › some › random › links"
humanize.number(123456);        // "1,23,456"
humanize.pluralarize("apple", 3); // "3 apples"
humanize.ordinalize(22);        // "22nd"
humanize.diff(new Date("2020"), new Date("2023")); // "3 years"
humanize.words("Hello world this is a test", 3); // "Hello world this..."


---

 API

| Function            | Description                          |
| ------------------- | ------------------------------------ |
| `bytes(number)`     | Converts bytes to KB/MB/GB           |
| `time(seconds)`     | Converts seconds to readable time    |
| `ordinal(number)`   | Adds suffix like 1st, 2nd, 3rd       |
| `timeAgo(Date)`     | `x min ago`/`x hr ago`/`x days ago`  |
| `currency(num, ₹)`  | Shortens large currency numbers      |
| `slug(string)`      | Converts to URL-safe slug            |
| `url(string)`       | Simplifies URLs to clean breadcrumbs |
| `number(number)`    | Adds digit grouping (Indian format)  |
| `pluralarize(w, c)` | "1 apple" / "2 apples"               |
| `ordinalize(n)`     | 1 → 1st, 2 → 2nd, 11 → 11th          |
| `diff(d1, d2)`      | Time difference → "2 months"         |
| `words(str, limit)` | Trims string to `n` words + `...`    |


---

 Why use this?

 Zero dependencies
 Tiny bundle size
 TypeScript native
 Friendly APIs
 CLI + UI ready

---

