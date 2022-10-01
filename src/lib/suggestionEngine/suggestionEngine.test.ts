import { describe, expect, test } from "vitest";
import { suggestWords } from "./suggestionEngine";

describe("find overlaps", () => {
  test("no overlap returns all words", () => {
    const input = ["cat", "dog"];
    const output = suggestWords(input);
    expect(input).toEqual(output);
  });
  test("removes no overlap words", () => {
    const input = ["cat", "rat", "dog"];
    const output = suggestWords(input);
    expect(["cat", "rat"]).toEqual(output);
  });
  test.only("finds words with most overlaps", () => {
    const input = ["cat", "rat", "car", "hat", "dog"];
    const output = suggestWords(input);
    expect(["cat", "rat"]).toEqual(output);
  });
  test.only("doubles get ignored", () => {
    const input = ["cat", "rat", "aaa", "car", "hat", "dog"];
    const output = suggestWords(input);
    expect(["cat", "rat"]).toEqual(output);
  });
});
