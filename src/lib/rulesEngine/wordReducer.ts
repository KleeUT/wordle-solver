import type { Rule } from "./rules/Rule";

export function reduceWords(words: string[], rules: Rule[]): string[] {
  const remainingWords = words.filter((word) => {
    const shouldIncludeWord = rules.reduce(
      (state, rule) => state && rule(word),
      true
    );
    return shouldIncludeWord;
  });
  return remainingWords;
}
