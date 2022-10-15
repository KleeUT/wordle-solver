import { LetterType, type LetterState } from "../WordInput";

function matchType(letter: string, index: number, target: string): LetterType {
  if (!target.includes(letter)) {
    return LetterType.Missing;
  }
  if (target[index] === letter) {
    return LetterType.CorrectPlace;
  }
  return LetterType.WrongPlace;
}

export function checkGuess({
  target,
  guess,
}: {
  target: string;
  guess: string;
}): { err?: Error; matches: LetterState[] } {
  if (target.length !== guess.length) {
    return {
      err: new Error("lengths don't match"),
      matches: [],
    };
  }
  const matches = guess.split("").map((letter, index) => {
    return {
      index,
      letter,
      type: matchType(letter, index, target),
    };
  });
  return {
    matches,
  };
}
