# humanize-this

🔢 A lightweight utility package to convert machine-readable data into human-friendly formats. Works great for dashboards, logs, CLI tools, or just flexing in side projects.

---

 🚀 Features

- ✅ `humanize.bytes()` → Format file sizes
- ✅ `humanize.time()` → Seconds → readable time
- ✅ `humanize.ordinal()` → 1 → 1st
- ✅ `humanize.timeAgo()` → "5 min ago"
- ✅ `humanize.currency()` → 123456 → ₹1.23L
- ✅ `humanize.slug()` → Converts titles to slugs

---

 📦 Installation

```bash
npm install humanize-this
# or
pnpm add humanize-this

---

 🛠️ Usage

import { humanize } from "humanize-this";

humanize.bytes(2048);           // "2 KB"
humanize.ordinal(3);            // "3rd"
humanize.time(90);              // "1 min 30 sec"
humanize.slug("Hello World!");  // "hello-world"
humanize.currency(123456);      // "₹1.23L"

---

 📜 API

| Function           | Description                             |
| ------------------ | --------------------------------------- |
| `bytes(number)`    | Converts bytes to human-readable format |
| `time(seconds)`    | Converts seconds to `x min y sec`       |
| `ordinal(number)`  | Adds ordinal suffix like `st`, `nd`     |
| `timeAgo(Date)`    | Returns how long ago a date was         |
| `number(number)`   | Adds commas to big numbers              |
| `currency(number)` | Converts to ₹/K/L format                |
| `slug(string)`     | Converts to URL-safe slugs              |

---

⚡ Why use this?

    Zero dependencies

    Small bundle size

    Typescript native

    Human-friendly APIs

---

