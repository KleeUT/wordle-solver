import type { RuleCreationResult } from "./Rule";

export function incorrectPlace(
  char: string,
  position: number
): RuleCreationResult {
  if (char.length !== 1 || position < 0 || position > 4) {
    return {
      valid: false,
    };
  }
  const lowerChar = char.toLowerCase();
  return {
    valid: true,
    rule: (str) => {
      const lowerString = str.toLowerCase();
      return (
        lowerString.includes(lowerChar) && lowerString[position] !== lowerChar
      );
    },
  };
}
