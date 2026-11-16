const HONORIFICS = new Set(['mr', 'mrs', 'ms', 'miss', 'dr', 'prof']);
const SUFFIXES = new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'v']);

function normalize(word: string): string {
  return word.replace(/\./g, '').toLowerCase();
}

/**
 * Returns one or two letters for a monogram avatar.
 * Titles and generational suffixes do not become initials.
 */
export function getInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => {
      const key = normalize(word);
      return !HONORIFICS.has(key) && !SUFFIXES.has(key);
    });

  if (words.length === 0) {
    return '?';
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const first = words[0];
  const last = words[words.length - 1];

  return `${first[0]}${last[0]}`.toUpperCase();
}
