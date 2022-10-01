import type { Rule } from "./Rule";

export function charAtMustBe(
  char: string,
  position: number
): { valid: boolean; rule?: Rule } {
  console.log("char must be", { char, position });
  if (char.length !== 1 || position < 0 || position > 4)
    return {
      valid: false,
    };

  return {
    valid: true,
    rule: (str: string) => str.toLowerCase()[position] === char.toLowerCase(),
  };
}
