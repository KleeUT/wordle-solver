import { describe, expect, it, test, vi } from "vitest";
import { letterInputToRules, type RuleCreators } from "./letterToRules";
import { charAtMustBe, mustNotContain, incorrectPlace } from "./rulesEngine";
import type { RuleCreationResult } from "./rulesEngine/rules/Rule";
import { LetterType } from "./WordInput";

function realRuleCreators(): RuleCreators {
  return {
    charAtMustBe,
    mustNotContain,
    incorrectPlace,
  };
}

describe("letter to rule", () => {
  describe("identifies invalid rules", () => {
    it("cant have wrong place and missing", () => {
      const result = letterInputToRules(
        [
          [
            { index: 0, letter: "a", type: LetterType.Missing },
            { index: 1, letter: "a", type: LetterType.WrongPlace },
          ],
        ],
        realRuleCreators()
      );
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
      const result = letterInputToRules(
        [
          [
            { index: 0, letter: "a", type: LetterType.Missing },
            { index: 1, letter: "a", type: LetterType.CorrectPlace },
          ],
        ],
        realRuleCreators()
      );
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
      const result = letterInputToRules(
        [
          [{ index: 0, letter: "a", type: LetterType.CorrectPlace }],
          [{ index: 0, letter: "a", type: LetterType.WrongPlace }],
        ],
        realRuleCreators()
      );
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
      const result = letterInputToRules(
        [
          [{ index: 0, letter: "a", type: LetterType.CorrectPlace }],
          [{ index: 0, letter: "d", type: LetterType.CorrectPlace }],
        ],
        realRuleCreators()
      );
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
  describe("converts letter types to correct rules", () => {
    function successCreation(): RuleCreationResult {
      return {
        valid: true,
        rule: () => true,
      };
    }
    function mockRuleCreators(): RuleCreators {
      return {
        charAtMustBe: vi.fn().mockReturnValue(successCreation()),
        mustNotContain: vi.fn().mockReturnValue(successCreation()),
        incorrectPlace: vi.fn().mockReturnValue(successCreation()),
      };
    }
    test("Letter marked as missing becomes incorrectPlace rule", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [[{ index: 0, letter: "a", type: LetterType.Missing }]],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(1);
      expect(ruleCreatorMocks.mustNotContain).toHaveBeenCalledWith("a");
    });
    test("Letter marked as correct position becomes charAtMustBe rule", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [[{ index: 0, letter: "a", type: LetterType.CorrectPlace }]],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(1);
      expect(ruleCreatorMocks.charAtMustBe).toHaveBeenCalledWith("a", 0);
    });
    test("Letter marked as WrongPlace becomes incorrectPlace rule", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [[{ index: 0, letter: "a", type: LetterType.WrongPlace }]],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(1);
      expect(ruleCreatorMocks.incorrectPlace).toHaveBeenCalledWith("a", 0);
    });
    test("Creates multiple across rows", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [
          [{ index: 0, letter: "a", type: LetterType.WrongPlace }],
          [{ index: 0, letter: "b", type: LetterType.CorrectPlace }],
          [{ index: 0, letter: "c", type: LetterType.Missing }],
        ],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(3);
      expect(ruleCreatorMocks.incorrectPlace).toHaveBeenCalledWith("a", 0);
      expect(ruleCreatorMocks.charAtMustBe).toHaveBeenCalledWith("b", 0);
      expect(ruleCreatorMocks.mustNotContain).toHaveBeenCalledWith("c");
    });
    test("Creates multiple in one row", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [
          [
            { index: 0, letter: "a", type: LetterType.WrongPlace },
            { index: 1, letter: "b", type: LetterType.CorrectPlace },
            { index: 2, letter: "c", type: LetterType.Missing },
          ],
        ],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(3);
      expect(ruleCreatorMocks.incorrectPlace).toHaveBeenCalledWith("a", 0);
      expect(ruleCreatorMocks.charAtMustBe).toHaveBeenCalledWith("b", 1);
      expect(ruleCreatorMocks.mustNotContain).toHaveBeenCalledWith("c");
    });
    test("combines duplicate rules wrong place", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [
          [{ index: 1, letter: "a", type: LetterType.WrongPlace }],
          [{ index: 1, letter: "a", type: LetterType.WrongPlace }],
        ],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(1);
      expect(ruleCreatorMocks.incorrectPlace).toHaveBeenCalledTimes(2);
      expect(ruleCreatorMocks.incorrectPlace).toHaveBeenCalledWith("a", 1);
    });
    test("combines duplicate rules correct place", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [
          [{ index: 0, letter: "a", type: LetterType.CorrectPlace }],
          [{ index: 0, letter: "a", type: LetterType.CorrectPlace }],
        ],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(1);
      expect(ruleCreatorMocks.charAtMustBe).toHaveBeenCalledTimes(2);
      expect(ruleCreatorMocks.charAtMustBe).toHaveBeenCalledWith("a", 0);
    });

    test("combines duplicate rules must not contain", () => {
      const ruleCreatorMocks = mockRuleCreators();
      const result = letterInputToRules(
        [
          [{ index: 2, letter: "a", type: LetterType.Missing }],
          [{ index: 1, letter: "a", type: LetterType.Missing }],
        ],
        ruleCreatorMocks
      );
      expect(result.mismatches).toEqual([]);
      expect(result.rules.length).toBe(1);
      expect(ruleCreatorMocks.mustNotContain).toHaveBeenCalledTimes(1);
      expect(ruleCreatorMocks.mustNotContain).toHaveBeenCalledWith("a");
    });
  });
});
