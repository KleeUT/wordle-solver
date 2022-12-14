import type { suggestWords } from "src/lib/suggestionEngine";
import type { reduceWords, Rule } from "src/lib/rulesEngine";
import { LetterType, type LetterState } from "../WordInput";
import { checkGuess } from "./checkGuess";
interface Guess {
  wordsAvailable: number;
  word: LetterState[];
}

export interface Solution {
  err?: Error;
  target: string;
  guesses: Guess[];
}

function isSuccessfulGuess(guess?: Guess): boolean {
  if (!guess) {
    return false;
  }
  const s = guess.word.reduce(
    (p, letter) => p && letter.type === LetterType.CorrectPlace,
    true
  );

  return s;
}

export function findSolution(
  target: string,
  words: string[],
  suggester: typeof suggestWords,
  reducer: typeof reduceWords,
  ruleCreator: (words: LetterState[][]) => Rule[]
): Solution {
  const lowerCaseTarget = target.toLowerCase();
  function playTurn(guesses: Guess[]): Guess {
    const rules = ruleCreator(guesses.map((x) => x.word));
    const filteredWords = reducer(words, rules);
    const nextGuess = suggester(filteredWords);
    const result = checkGuess({
      target: lowerCaseTarget,
      guess: nextGuess[0],
    });

    if (result.err) {
      throw result.err;
    }
    return {
      wordsAvailable: filteredWords.length,
      word: result.matches,
    };
  }
  if (!words.includes(lowerCaseTarget)) {
    return {
      err: new Error(`${lowerCaseTarget} is not in word list`),
      guesses: [],
      target,
    };
  }
  const guesses: Guess[] = [];
  while (!isSuccessfulGuess(guesses.at(-1))) {
    guesses.push(playTurn(guesses));
  }
  return {
    guesses,
    target,
  };
}
