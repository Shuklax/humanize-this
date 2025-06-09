import * as bytes from "./format/bytes";
import * as currency from "./format/currency";
import * as number from "./format/number";
import * as ordinal from "./format/ordinal";
import * as pluralize from "./format/pluralize";
import * as time from "./time/time";
import * as timeAgo from "./time/timeAgo";
import * as diff from "./time/diff";
import * as slug from "./string/slug";
import * as underscoreSlug from "./string/underscoreSlug";
import * as unSlug from "./string/unSlug";
import * as words from "./string/words";
import * as url from "./utils/url";
import { getConfig, setConfig, type HumanizeConfig } from "./config";

// Export individual functions
export * from "./format/bytes";
export * from "./format/currency";
export * from "./format/number";
export * from "./format/ordinal";
export * from "./format/pluralize";
export * from "./time/time";
export * from "./time/timeAgo";
export * from "./time/diff";
export * from "./string/slug";
export * from "./string/underscoreSlug";
export * from "./string/unSlug";
export * from "./string/words";
export * from "./utils/url";
export { getConfig, setConfig, type HumanizeConfig } from "./config";

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