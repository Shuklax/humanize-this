import * as bytes from "./format/bytes.js";
import * as currency from "./format/currency.js";
import * as number from "./format/number.js";
import * as ordinal from "./format/ordinal.js";
import * as pluralize from "./format/pluralize.js";
import * as time from "./time/time.js";
import * as timeAgo from "./time/timeAgo.js";
import * as diff from "./time/diff.js";
import * as slug from "./string/slug.js";
import * as underscoreSlug from "./string/underscoreSlug.js";
import * as unSlug from "./string/unSlug.js";
import * as words from "./string/words.js";
import * as url from "./utils/url.js";
import { getConfig, setConfig } from "./config.js";


export * from "./format/bytes.js";
export * from "./format/currency.js";
export * from "./format/number.js";
export * from "./format/ordinal.js";
export * from "./format/pluralize.js";
export * from "./time/time.js";
export * from "./time/timeAgo.js";
export * from "./time/diff.js";
export * from "./string/slug.js";
export * from "./string/underscoreSlug.js";
export * from "./string/unSlug.js";
export * from "./string/words.js";
export * from "./utils/url.js";
export { getConfig, setConfig } from "./config.js";

// Export as humanize object
export const humanize = {
  bytes: bytes.bytes,
  currency: currency.currency,
  number: number.number,
  ordinal: ordinal.ordinal,
  pluralize: pluralize.pluralize,
  time: time.time,
  timeAgo: timeAgo.timeAgo,
  diff: diff.diff,
  slug: slug.slug,
  underscoreSlug: underscoreSlug.underscoreSlug,
  unSlug: unSlug.unSlug,
  words: words.words,
  url: url.url,
  getConfig,
  setConfig
};