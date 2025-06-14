# humanize-this

A lightweight, zero-dependency, tree-shakeable utility package that transforms machine-readable data into human-friendly formats. Perfect for dashboards, logs, CLIs, and user interfaces.

## Features

All functions are available under the `humanize` namespace and can be imported individually:

```typescript
// Import everything
import { humanize } from "humanize-this";

// Or import specific functions (tree-shakeable)
import { bytes, currency, timeAgo } from "humanize-this";
```

### Number Formatting

#### `bytes(number)`
Format file sizes with appropriate units
```typescript
humanize.bytes(2048)      // "2 KB"
humanize.bytes(1500000)   // "1.5 MB"
humanize.bytes(1500000000) // "1.5 GB"
```

#### `currency(number, symbol?, currencyCode?, locale?)`
Smart currency formatting (locale-aware)
```typescript
// Indian currency (INR)
humanize.currency(1500)        // "₹1.50K"
humanize.currency(150000)      // "₹1.50L"
humanize.currency(15000000)    // "₹1.50Cr"

// Other currencies
humanize.currency(1500, "$", "USD", "en-US")    // "$1.50K"
humanize.currency(1500000, "€", "EUR", "de-DE") // "€1.50M"
humanize.currency(1500000000, "£", "GBP", "en-GB") // "£1.50B"
```

#### `number(number, locale?)`
Format numbers with Indian or international digit grouping
```typescript
humanize.number(123456)           // "1,23,456"
humanize.number(1234567, "en-US") // "1,234,567"
humanize.number(1234567, "de-DE") // "1.234.567"
```

#### `ordinal(number, locale?)`
Add ordinal suffixes to numbers
```typescript
humanize.ordinal(1)        // "1st"
humanize.ordinal(2)        // "2nd"
humanize.ordinal(3)        // "3rd"
humanize.ordinal(11)       // "11th"
humanize.ordinal(2, "fr")  // "2e"
```

### Time Formatting

#### `time(seconds)`
Convert seconds to human-readable time
```typescript
humanize.time(90)          // "1 min 30 sec"
humanize.time(3600)        // "1 hr"
humanize.time(3661)        // "1 hr 1 min 1 sec"
```

#### `timeAgo(date, locale?)`
Format relative time
```typescript
humanize.timeAgo(new Date())                    // "just now"
humanize.timeAgo(Date.now() - 300000)           // "5 min ago"
humanize.timeAgo(Date.now() - 3600000)          // "1 hr ago"
humanize.timeAgo(Date.now() - 60000, "fr-FR")   // "il y a 1 minute"
```

#### `diff(date1, date2, locale?)`
Calculate time difference
```typescript
humanize.diff(new Date("2020"), new Date("2023"))           // "3 years"
humanize.diff(new Date(), new Date(Date.now() - 86400000))  // "1 day"
```

### Text Formatting

#### `slug(string)`
Convert text to URL-safe slugs
```typescript
humanize.slug("Hello World!")  // "hello-world"
humanize.slug("Let's Code")    // "lets-code"
```

#### `url(string)`
Simplify URLs to clean breadcrumbs
```typescript
humanize.url("https://github.com/user/repo/path")  // "github.com › user › repo › path"
```

#### `pluralize(word, count, locale?)`
Smart pluralization (locale-aware)
```typescript
humanize.pluralize("apple", 1)        // "1 apple"
humanize.pluralize("apple", 2)        // "2 apples"
humanize.pluralize("box", 2)          // "2 boxes"
humanize.pluralize("person", 2, "en") // "2 people"
```

#### `words(string, limit)`
Limit text by word count
```typescript
humanize.words("Hello world this is a test", 3)  // "Hello world this..."
```

## Localization & i18n

All formatting functions in humanize-this support multiple locales using JavaScript's native Intl API.

### Examples

```typescript
// Number formatting
humanize.number(1234567, "en-US")  // "1,234,567"
humanize.number(1234567, "de-DE")  // "1.234.567"

// Currency formatting
humanize.currency(1234.56, "$", "USD", "en-US")  // "$1.23K"
humanize.currency(1234.56, "€", "EUR", "de-DE")  // "€1.23K"

// Ordinal numbers
humanize.ordinal(2, "en-US")  // "2nd"
humanize.ordinal(2, "fr-FR")  // "2e"

// Pluralization
humanize.pluralize("person", 2, "en")  // "2 people"

// Relative time
humanize.timeAgo(Date.now() - 60000, "fr-FR")  // "il y a 1 minute"
```

You can also globally configure locale:
```typescript
import { humanizeConfig } from "humanize-this";
humanizeConfig.locale = "fr-FR";
```

## Installation

```bash
npm install humanize-this
# or
pnpm add humanize-this
# or
yarn add humanize-this
```

## Usage

```typescript
// Import everything
import { humanize } from "humanize-this";

// Or import only what you need (recommended for smaller bundles)
import { bytes, currency, timeAgo } from "humanize-this";

// Use the functions
bytes(2048);           // "2 KB"
currency(1500);        // "₹1.50K"
timeAgo(new Date());   // "just now"
```

## Key Features

- **Zero Dependencies**: Lightweight and fast
- **Tree-Shakeable**: Import only what you need, unused functions are removed from your bundle
- **TypeScript Native**: Full type support out of the box
- **Consistent Formatting**: Predictable output across all functions
- **Indian Number System**: Special support for Indian currency and number formatting
- **Customizable**: Flexible options for different use cases
- **Error Handling**: Graceful handling of invalid inputs
- **Browser & Node.js**: Works in both environments
- **ESM & CommonJS**: Supports both module systems

## Bundle Size

The package is designed to be tree-shakeable, meaning you only pay for what you use. Here's an approximate size breakdown:

- Full package: ~5KB (minified + gzipped)
- Individual functions: ~0.5-1KB each (minified + gzipped)

Example of tree-shaking in action:
```typescript
// This import will only include the bytes function in your bundle
import { bytes } from "humanize-this";

// This import will only include bytes and currency
import { bytes, currency } from "humanize-this";
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
Feedbacks are most welcome! Feel free to write to me at Shuklax@proton.me

## License

MIT © [Shuklax](https://github.com/Shuklax)
