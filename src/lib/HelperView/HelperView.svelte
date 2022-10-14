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

  const emptyRow = () => [
    { letter: "", type: LetterType.Missing, index: 0 },
    { letter: "", type: LetterType.Missing, index: 1 },
    { letter: "", type: LetterType.Missing, index: 2 },
    { letter: "", type: LetterType.Missing, index: 3 },
    { letter: "", type: LetterType.Missing, index: 4 },
  ];
  const initialState = () => [
    emptyRow(),
    emptyRow(),
    emptyRow(),
    emptyRow(),
    emptyRow(),
  ];

  let words: LetterState[][] = initialState();
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
</script>

<h1>Help me solve</h1>
<h2>Here's what I know:</h2>
{#each words as word}
  <div>
    <WordInput on:change={console.log} />
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
