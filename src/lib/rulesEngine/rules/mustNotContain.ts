import type { RuleCreationResult } from "./Rule";

export function mustNotContain(char: string): RuleCreationResult {
  if (char.length !== 1) {
    return {
      valid: false,
    };
  }
  return {
    valid: true,
    rule: (str) => {
      const notContains = !str.toLowerCase().includes(char.toLowerCase());
      return notContains;
    },
  };
}
