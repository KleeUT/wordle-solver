import { describe, expect, test } from "vitest";
import { incorrectPlace } from "./incorrectPlace";

describe("Must contain", () => {
  describe("is invalid if", () => {
    test("more than 1 character passed in", () => {
      const rule = incorrectPlace("cat", 0);
      expect(rule.valid).toBe(false);
    });
    test("more than 0 characters passed in", () => {
      const rule = incorrectPlace("", 0);
      expect(rule.valid).toBe(false);
    });
    test("position less than 0", () => {
      const rule = incorrectPlace("c", -1);
      expect(rule.valid).toBe(false);
    });
    test("position greater than 4", () => {
      const rule = incorrectPlace("c", 5);
      expect(rule.valid).toBe(false);
    });
  });
  describe("creates a valid rule", () => {
    test.each([
      { char: "a", str: "cat", position: 0, passes: true },
      { char: "A", str: "cat", position: 0, passes: true },
      { char: "a", str: "cat", position: 1, passes: false },
      { char: "a", str: "dog", position: 1, passes: false },
      { char: "A", str: "cat", position: 1, passes: false },
      { char: "A", str: "CAT", position: 1, passes: false },
    ])("identifies words that match", ({ char, str, position, passes }) => {
      const rule = incorrectPlace(char, position);
      expect(rule.rule).not.toBeUndefined();
      expect(rule.rule!(str)).toBe(passes);
    });
  });
});
