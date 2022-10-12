<script lang="ts">
  import { findSolution, type Solution } from "../solutionEngine";
  import allWords from "../../words.json";
  import { suggestWords } from "../suggestionEngine";
  import {
    charAtMustBe,
    incorrectPlace,
    mustNotContain,
    reduceWords,
    type Rule,
  } from "../rulesEngine";
  import { LetterType, type LetterState } from "../WordInput";
  import { letterInputToRules } from "../letterToRules";
  let target = "";
  $: {
    target = target.toUpperCase();
    if (target.length > 5) {
      target = target.substring(0, 5);
    }
  }
  let results: Solution;
  function ruleCreator(words: LetterState[][]): Rule[] {
    const mappedRules = letterInputToRules(words, {
      incorrectPlace,
      mustNotContain,
      charAtMustBe,
    });
    return mappedRules.rules;
  }
  function play() {
    results = findSolution(
      target,
      allWords,
      suggestWords,
      reduceWords,
      ruleCreator
    );
  }
</script>

<h1>Challenge the wordle solver</h1>

<label for="solution_target"
  >Target:
  <input id="solution_target" type="text" bind:value={target} />
</label>
<button on:click={play}>Play</button>
{#if !results}
  <p>No results</p>
{:else if results.err}
  <p>{results.err.message}</p>
{:else}
  <ol>
    {#each results.guesses as guess}
      <li>
        {guess.word
          .map((l) =>
            l.type === LetterType.CorrectPlace
              ? l.letter.toUpperCase()
              : l.letter
          )
          .join("")} : {guess.wordsAvailable}
      </li>
    {/each}
  </ol>
{/if}

<style>
  ol {
    list-style-type: none;
  }
  input {
    font-family: monospace;
    letter-spacing: 0.5rem;
    font-size: 1rem;
  }
</style>
