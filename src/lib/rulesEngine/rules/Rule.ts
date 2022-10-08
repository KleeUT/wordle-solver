export type Rule = (word: string) => boolean;
export type RuleCreationResult = { valid: boolean; rule?: Rule };
