import { describe, expect, it, test } from "vitest";
import { charAtMustBe } from "./charAtMustBe";

describe("charAtMustBe", () => {
  describe("is invalid if", () => {
    test("more than 1 character passed in", () => {
      const rule = charAtMustBe("cat", 1);
      expect(rule.valid).toBe(false);
    });
    test("more than 0 characters passed in", () => {
      const rule = charAtMustBe("", 1);
      expect(rule.valid).toBe(false);
    });
    test("position less than 0", () => {
      const rule = charAtMustBe("c", -1);
      expect(rule.valid).toBe(false);
    });
    test("position greater than 4", () => {
      const rule = charAtMustBe("c", 5);
      expect(rule.valid).toBe(false);
    });
  });
  describe("provides a valid rule", () => {
    test.each([
      { char: "a", str: "cat", position: 1, passes: true },
      { char: "a", str: "cat", position: 0, passes: false },
      { char: "a", str: "dog", position: 1, passes: false },
      { char: "A", str: "cat", position: 1, passes: true },
      { char: "A", str: "CAT", position: 1, passes: true },
    ])(
      "identifies words that match $char $str $passes",
      ({ char, str, position, passes }) => {
        const rule = charAtMustBe(char, position);
        expect(rule.rule).not.toBeUndefined();
        expect(rule.rule!(str)).toBe(passes);
      }
    );
  });
});
