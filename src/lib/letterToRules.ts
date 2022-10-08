import type { Rule } from "./rulesEngine";
import type { RuleCreationResult } from "./rulesEngine/rules/Rule";
import { LetterType, type LetterState } from "./WordInput";

interface LetterCoordinate {
  row: number;
  column: number;
}
export interface RuleMismatch {
  letter1: LetterCoordinate;
  letter2: LetterCoordinate;
}
interface Occurrence {
  coordinate: LetterCoordinate;
  type: LetterType;
}

interface AggregatedRules {
  rules: Rule[];
  mismatches: RuleMismatch[];
}

export interface RuleCreators {
  mustNotContain: (char: string) => RuleCreationResult;
  charAtMustBe: (char: string, position: number) => RuleCreationResult;
  incorrectPlace: (char: string, position: number) => RuleCreationResult;
}

export function letterInputToRules(
  words: LetterState[][],
  rules: RuleCreators
): AggregatedRules {
  const letterMap = words.reduce((letterMap, word, index) => {
    word.forEach((letter) => {
      if (!letterMap.has(letter.letter)) {
        letterMap.set(letter.letter, []);
      }
      letterMap.set(letter.letter, [
        ...letterMap.get(letter.letter),
        { coordinate: { row: index, column: letter.index }, type: letter.type },
      ]);
    });

    return letterMap;
  }, new Map<string, Occurrence[]>());

  const result: AggregatedRules = {
    rules: [],
    mismatches: [],
  };

  letterMap.forEach((occurrences, letter) => {
    const characterRules = characterToRules(letter, occurrences, words, rules);
    result.rules = [...result.rules, ...characterRules.rules];
    result.mismatches = [...result.mismatches, ...characterRules.mismatches];
  });

  return result;
}

function characterToRules(
  char: string,
  occurrences: Occurrence[],
  words: LetterState[][],
  { mustNotContain, charAtMustBe, incorrectPlace }: RuleCreators
): AggregatedRules {
  const mismatches: RuleMismatch[] = [];
  const rules: Rule[] = [];
  const missing = occurrences.filter((x) => x.type === LetterType.Missing);
  const correct = occurrences.filter((x) => x.type === LetterType.CorrectPlace);
  const wrongPlace = occurrences.filter(
    (x) => x.type === LetterType.WrongPlace
  );
  if (missing.length > 0 && (correct.length > 0 || wrongPlace.length > 0)) {
    missing.forEach((m) => {
      [...correct, ...wrongPlace].forEach((x) => {
        mismatches.push({
          letter1: m.coordinate,
          letter2: x.coordinate,
        });
      });
    });
  }
  correct.forEach((c) => {
    words.forEach((word, index) => {
      if (
        (word?.[c.coordinate.column].letter === char &&
          word?.[c.coordinate.column].type !== LetterType.CorrectPlace) ||
        (word?.[c.coordinate.column].letter !== char &&
          word?.[c.coordinate.column].type === LetterType.CorrectPlace)
      ) {
        mismatches.push({
          letter1: c.coordinate,
          letter2: {
            row: index,
            column: c.coordinate.column,
          },
        });
      }
    });
  });
  if (mismatches.length !== 0) {
    return {
      mismatches,
      rules,
    };
  }
  if (missing.length > 0) {
    const r = mustNotContain(char);
    if (r.valid) {
      rules.push(r.rule);
    }
  }
  const correctRules = correct.reduce((p, c) => {
    p.set(c.coordinate.column, charAtMustBe(char, c.coordinate.column).rule);
    return p;
  }, new Map<number, Rule>());
  const wrongPlaceRules = wrongPlace.reduce((p, c) => {
    p.set(c.coordinate.column, incorrectPlace(char, c.coordinate.column).rule);
    return p;
  }, new Map<number, Rule>());

  return {
    rules: [...correctRules.values(), ...wrongPlaceRules.values(), ...rules],
    mismatches,
  };
}
