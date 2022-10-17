<script lang="ts">
  import { LetterType } from "../WordInput/StateSwitcher/LetterType";
  import { reduceWords } from "../rulesEngine";
  import type {
    Rule,
    incorrectPlace as incorrectPlaceType,
    mustNotContain as mustNotContainType,
    charAtMustBe as charAtMustBeType,
  } from "../rulesEngine";
  import WordInput from "../WordInput/WordInput.svelte";
  import { letterInputToRules, type RuleMismatch } from "../letterToRules";
  import { WordList } from "../WordList";
  import { suggestWords } from "../suggestionEngine";
  import Word from "../WordList/Word.svelte";
  type LetterState = {
    letter: string;
    type: LetterType;
    index: number;
  };

  export let allWords: string[];
  export let incorrectPlace: typeof incorrectPlaceType;
  export let mustNotContain: typeof mustNotContainType;
  export let charAtMustBe: typeof charAtMustBeType;
  function allLettersFilled(l?: LetterState[]): boolean {
    if (!l) {
      return false;
    }
    const out = l.map((x) => x.letter).join("");
    return out.length === 5;
  }
  const emptyRow = () => [
    { letter: "", type: LetterType.Missing, index: 0 },
    { letter: "", type: LetterType.Missing, index: 1 },
    { letter: "", type: LetterType.Missing, index: 2 },
    { letter: "", type: LetterType.Missing, index: 3 },
    { letter: "", type: LetterType.Missing, index: 4 },
  ];
  let words: LetterState[][] = [emptyRow()];
  let remainingWords: string[] = [];
  let rules: Rule[] = [];
  let errors: RuleMismatch[] = [];
  $: {
    const mappedRules = letterInputToRules(words, {
      incorrectPlace,
      mustNotContain,
      charAtMustBe,
    });
    rules = mappedRules.rules;
    errors = mappedRules.mismatches;
    if (errors.length === 0) {
      remainingWords = reduceWords(allWords, rules);
    }
  }
  $: suggestions = suggestWords(remainingWords);
  function onWordChange(index: number, { detail }: { detail: LetterState[] }) {
    words[index] = detail;
    if (allLettersFilled(detail) && words.length - 1 === index) {
      words.push(emptyRow());
    }
    words = words;
  }
</script>

<h1>Help me solve</h1>
<h2>Here's what I know:</h2>
{#each words as _word, i}
  <div>
    <WordInput on:change={(x) => onWordChange(i, x)} />
  </div>
{/each}
<WordList words={remainingWords} />
{#if errors.length !== 0}
  <p>Input error</p>
{:else if suggestions.length > 0}
  <div>
    <h2>Next Guess</h2>
    <Word word={suggestions[0]} color="green" />
  </div>
{/if}

<style>
</style>
