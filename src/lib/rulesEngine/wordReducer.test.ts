import { describe, it, expect } from "vitest";
import { reduceWords } from "./wordReducer";

describe("word reducer", () => {
  it("should apply rules", () => {
    const inputWords = ["cat", "dog"];
    const outputWords = reduceWords(inputWords, [(str) => str === "dog"]);
    expect(outputWords).toEqual(["dog"]);
  });
});
