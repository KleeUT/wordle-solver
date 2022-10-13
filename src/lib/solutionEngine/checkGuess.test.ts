import { describe, expect, it } from "vitest";
import { LetterType, type LetterState } from "../WordInput";
import { checkGuess } from "./checkGuess";

function runTest({
  target,
  guess,
  matches,
  err,
}: {
  target: string;
  guess: string;
  matches: LetterState[];
  err?: Error;
}): void {
  const result = checkGuess({
    target,
    guess,
  });
  expect(result.err).toEqual(err);
  expect(result.matches).toEqual(matches);
}

describe("check guess", () => {
  it("should return an error if words are not the same length", () => {
    runTest({
      target: "fish",
      guess: "cat",
      matches: [],
      err: new Error("lengths don't match"),
    });
  });
  it("should identify no overlaps", () => {
    runTest({
      target: "cat",
      guess: "dog",
      matches: [
        { index: 0, letter: "d", type: LetterType.Missing },
        { index: 1, letter: "o", type: LetterType.Missing },
        { index: 2, letter: "g", type: LetterType.Missing },
      ],
    });
  });
  it("should identify correct position", () => {
    runTest({
      target: "cat",
      guess: "cxx",
      matches: [
        { index: 0, letter: "c", type: LetterType.CorrectPlace },
        { index: 1, letter: "x", type: LetterType.Missing },
        { index: 2, letter: "x", type: LetterType.Missing },
      ],
    });
  });
  it("should identify wrong position", () => {
    runTest({
      target: "cat",
      guess: "xcx",
      matches: [
        { index: 0, letter: "x", type: LetterType.Missing },
        { index: 1, letter: "c", type: LetterType.WrongPlace },
        { index: 2, letter: "x", type: LetterType.Missing },
      ],
    });
  });
});
