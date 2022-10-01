import { describe, expect, test } from "vitest";
import { mustNotContain } from "./mustNotContain";

describe("Must contain", () => {
  describe("is invalid if", () => {
    test("more than 1 character passed in", () => {
      const rule = mustNotContain("cat");
      expect(rule.valid).toBe(false);
    });
    test("more than 0 characters passed in", () => {
      const rule = mustNotContain("");
      expect(rule.valid).toBe(false);
    });
  });
  describe("creates a valid rule", () => {
    test.each([
      { char: "a", str: "cat", passes: false },
      { char: "a", str: "dog", passes: true },
      { char: "A", str: "cat", passes: false },
      { char: "A", str: "CAT", passes: false },
    ])("identifies words that match", ({ char, str, passes }) => {
      const rule = mustNotContain(char);
      expect(rule.rule).not.toBeUndefined();
      expect(rule.rule!(str)).toBe(passes);
    });
  });
});
