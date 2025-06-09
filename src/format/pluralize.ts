import { getConfig } from "../config.js";

// Irregular plurals mapping
const IRREGULAR_PLURALS: Record<string, string> = {
  // Common irregular plurals
  mouse: "mice",
  person: "people",
  child: "children",
  goose: "geese",
  man: "men",
  woman: "women",
  tooth: "teeth",
  foot: "feet",
  // Add more irregular plurals
  ox: "oxen",
  die: "dice",
  leaf: "leaves",
  life: "lives",
  knife: "knives",
  wife: "wives",
  wolf: "wolves",
  half: "halves",
  shelf: "shelves",
  thief: "thieves",
  loaf: "loaves",
  potato: "potatoes",
  tomato: "tomatoes",
  hero: "heroes",
  echo: "echoes",
  veto: "vetoes",
  embargo: "embargoes",
  volcano: "volcanoes",
  tornado: "tornadoes",
  torpedo: "torpedoes",
  zero: "zeroes",
  // Words that don't change
  sheep: "sheep",
  deer: "deer",
  fish: "fish",
  species: "species",
  aircraft: "aircraft",
  // Words ending in -is
  analysis: "analyses",
  basis: "bases",
  crisis: "crises",
  diagnosis: "diagnoses",
  ellipsis: "ellipses",
  hypothesis: "hypotheses",
  oasis: "oases",
  parenthesis: "parentheses",
  synopsis: "synopses",
  thesis: "theses"
};

// Words that end in -y but don't follow the -ies rule
const Y_EXCEPTIONS = new Set([
  "day", "boy", "toy", "guy", "key", "monkey", "donkey", "turkey", "chimney", "valley",
  "alley", "journey", "money", "honey", "storey", "attorney", "kidney", "jersey"
]);

export function pluralize(word: string, count: number, locale?: string): string {
  try {
    if (typeof word !== 'string' || !word.trim()) {
      throw new Error('Word must be a non-empty string');
    }

    if (typeof count !== 'number' || isNaN(count)) {
      throw new Error('Count must be a valid number');
    }

    const config = getConfig();
    const finalLocale = locale || config.locale;

    if (typeof finalLocale !== 'string' || !finalLocale.trim()) {
      throw new Error('Invalid locale');
    }

    // Handle zero and one
    if (count === 0) {
      return `0 ${getPluralForm(word, 0, finalLocale)}`;
    }
    if (count === 1) {
      return `1 ${word}`;
    }

    // Get the plural form
    const pluralForm = getPluralForm(word, count, finalLocale);
    return `${count} ${pluralForm}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Pluralization failed: ${error.message}`);
    }
    throw new Error('Pluralization failed: Unknown error');
  }
}

function getPluralForm(word: string, _count: number, _locale: string): string {
  // Check irregular plurals first
  const lowerWord = word.toLowerCase();
  if (IRREGULAR_PLURALS[lowerWord]) {
    return IRREGULAR_PLURALS[lowerWord];
  }

  // Handle words that don't change
  if (IRREGULAR_PLURALS[word] === word) {
    return word;
  }

  // Handle words ending in -y
  if (word.endsWith('y') && !Y_EXCEPTIONS.has(word.toLowerCase())) {
    return word.slice(0, -1) + 'ies';
  }

  // Handle words ending in -s, -x, -z, -ch, -sh
  if (/[sxz]|ch|sh$/.test(word)) {
    return word + 'es';
  }

  // Handle words ending in -o
  if (word.endsWith('o') && !['photo', 'piano', 'halo', 'solo', 'memo', 'auto'].includes(word.toLowerCase())) {
    return word + 'es';
  }

  // Handle words ending in -f or -fe
  if (word.endsWith('f')) {
    return word.slice(0, -1) + 'ves';
  }
  if (word.endsWith('fe')) {
    return word.slice(0, -2) + 'ves';
  }

  // Default case: add -s
  return word + 's';
}
