import { describe, expect, it, vi } from "vitest";
import { LetterType } from "../WordInput";
import { findSolution } from "./solutionFinder";

describe("Solution Finder", () => {
  it("should reject a target that is not in the list", () => {
    const result = findSolution(
      "target",
      ["no", "answer", "here"],
      vi.fn(),
      vi.fn(),
      vi.fn()
    );
    expect(result.err).toEqual(new Error(`target is not in word list`));
    expect(result.guesses).toEqual([]);
    expect(result.target).toEqual("target");
  });
  it("should throw if lengths don't match", () => {
    expect(() => {
      findSolution(
        "cat",
        ["donkey", "cat"],
        (wordList) => wordList,
        (wordList, _rules) => wordList,
        vi.fn().mockImplementation(() => [])
      );
    }).toThrowError();
  });
  it("can guess it in 1", () => {
    const result = findSolution(
      "cat",
      ["cat"],
      (wordList) => wordList,
      (wordList, _rules) => wordList,
      vi.fn().mockImplementation(() => [])
    );
    expect(result.err).toBeUndefined();
    expect(result.guesses).toEqual([
      {
        wordsAvailable: 1,
        word: [
          {
            index: 0,
            letter: "c",
            type: LetterType.CorrectPlace,
          },
          {
            index: 1,
            letter: "a",
            type: LetterType.CorrectPlace,
          },
          {
            index: 2,
            letter: "t",
            type: LetterType.CorrectPlace,
          },
        ],
      },
    ]);
    expect(result.target).toEqual("cat");
  });
  it.only("can take multiple turns", () => {
    const suggester = vi.fn();
    // suggester.mockReturnValue(["bar", "car", "cat"]);
    suggester.mockReturnValueOnce(["car", "cat"]);
    suggester.mockReturnValueOnce(["cat"]);
    const reducer = vi.fn();
    // reducer.mockReturnValue(["bar", "car", "cat"]);
    reducer.mockReturnValueOnce(["car", "cat"]);
    reducer.mockReturnValueOnce(["cat"]);
    const result = findSolution(
      "cat",
      ["car", "bar", "cat"],
      suggester,
      reducer,
      vi.fn().mockImplementation(() => [])
    );
    expect(result.err).toBeUndefined();
    console.log(result.guesses);
    expect(result.guesses).toEqual([
      {
        wordsAvailable: 2,
        word: [
          {
            index: 0,
            letter: "c",
            type: LetterType.CorrectPlace,
          },
          {
            index: 1,
            letter: "a",
            type: LetterType.CorrectPlace,
          },
          {
            index: 2,
            letter: "r",
            type: LetterType.Missing,
          },
        ],
      },
      {
        wordsAvailable: 1,
        word: [
          {
            index: 0,
            letter: "c",
            type: LetterType.CorrectPlace,
          },
          {
            index: 1,
            letter: "a",
            type: LetterType.CorrectPlace,
          },
          {
            index: 2,
            letter: "t",
            type: LetterType.CorrectPlace,
          },
        ],
      },
    ]);
    expect(result.target).toEqual("cat");
  });
});
