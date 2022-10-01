import type { Rule } from "./Rule";

export function mustNotContain(char: string): { valid: boolean; rule?: Rule } {
  console.log("must not contain", { char });

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
