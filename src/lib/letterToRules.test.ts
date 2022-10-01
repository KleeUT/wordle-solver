import { describe, expect, it, test } from "vitest";
import { letterInputToRules } from "./letterToRules";
import { LetterType } from "./WordInput";

describe("letter to rule", () => {
  describe("identifies invalid rules", () => {
    it("cant have wrong place and missing", () => {
      const result = letterInputToRules([
        [
          { index: 0, letter: "a", type: LetterType.Missing },
          { index: 1, letter: "a", type: LetterType.WrongPlace },
        ],
      ]);
      expect(result).to.toEqual({
        rules: [],
        mismatches: [
          {
            letter1: {
              row: 0,
              column: 0,
            },
            letter2: {
              row: 0,
              column: 1,
            },
          },
        ],
      });
    });
    it("cant have correct place and missing", () => {
      const result = letterInputToRules([
        [
          { index: 0, letter: "a", type: LetterType.Missing },
          { index: 1, letter: "a", type: LetterType.CorrectPlace },
        ],
      ]);
      expect(result).to.toEqual({
        rules: [],
        mismatches: [
          {
            letter1: {
              row: 0,
              column: 0,
            },
            letter2: {
              row: 0,
              column: 1,
            },
          },
        ],
      });
    });
    it("cant have incorrect place and correct place on same index", () => {
      const result = letterInputToRules([
        [{ index: 0, letter: "a", type: LetterType.CorrectPlace }],
        [{ index: 0, letter: "a", type: LetterType.WrongPlace }],
      ]);
      expect(result).to.toEqual({
        rules: [],
        mismatches: [
          {
            letter1: {
              row: 0,
              column: 0,
            },
            letter2: {
              row: 1,
              column: 0,
            },
          },
        ],
      });
    });
    // todo: It'd be nice to have these unique
    it("cant have two correct place on same index", () => {
      const result = letterInputToRules([
        [{ index: 0, letter: "a", type: LetterType.CorrectPlace }],
        [{ index: 0, letter: "d", type: LetterType.CorrectPlace }],
      ]);
      expect(result).to.toEqual({
        rules: [],
        mismatches: [
          {
            letter1: {
              row: 0,
              column: 0,
            },
            letter2: {
              row: 1,
              column: 0,
            },
          },
          {
            letter1: {
              row: 1,
              column: 0,
            },
            letter2: {
              row: 0,
              column: 0,
            },
          },
        ],
      });
    });
  });
  describe.skip("converts to correct rules", () => {
    // test("Missing becomes missing", () => {
    //   const result = letterInputToRules([
    //     [{ index: 0, letter: "a", type: LetterType.Missing }],
    //   ]);
    //   expect(result.mismatches).toEqual([]);
    // });
    // yellow to wrong place
    // green to correct place
    // grey to missing
    // throw new Error("Not implemented");
  });
  // test("combines duplicate rules", () => {
  //   // to missing is still missing
  //   // two yellows in the same place
  //   // two yellows in different places are different
  //   // a yellow and a green in different places are still importannt
  //   throw new Error("Not implemented");
  // });
  // test("locked places overwrite ", () => {
  //   throw new Error("Not implemented");
  // });
});
