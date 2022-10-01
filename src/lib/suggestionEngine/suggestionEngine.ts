export function suggestWords(words: string[]): string[] {
  const letterCount = words.reduce((counts, word) => {
    word.split("").forEach((letter) => {
      const letterCount = counts.get(letter) || 0;
      counts.set(letter, letterCount + 1);
    });
    return counts;
  }, new Map<string, number>());

  const bestGuesses = words.reduce(
    (guesses, word) => {
      const count = word
        .split("")
        .filter((x, i) => word.indexOf(x) === i)
        .reduce((total, letter) => {
          return total + (letterCount.get(letter) || 0);
        }, 0);
      if (count > guesses.count) {
        return { count, words: [word] };
      } else if (count === guesses.count) {
        return { count, words: [...guesses.words, word] };
      }
      return guesses;
    },
    { count: 0, words: [] }
  );
  return bestGuesses.words;
}
