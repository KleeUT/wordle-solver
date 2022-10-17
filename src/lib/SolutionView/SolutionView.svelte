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
  import { Button } from "../Button";
  import DateSelector from "./DateSelector.svelte";
  import TargetWordInput from "./TargetWordInput.svelte";
  import Pills from "./Pills.svelte";
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
  function letterTypeToClass(type: LetterType): string {
    switch (type) {
      case LetterType.CorrectPlace:
        return "correctPlace";
      case LetterType.WrongPlace:
        return "wrongPlace";
      case LetterType.Missing:
        return "missing";
    }
  }
  const word = "word";
  const date = "date";
  let options = [word, date];
  let selected = options[0];
</script>

<h1>How would you solve</h1>
<Pills {options} bind:selected />
{#if selected === word}
  <TargetWordInput on:selected={play} />
{:else}
  <DateSelector on:selected={play} />
{/if}
{#if !results}
  <p>No results</p>
{:else if results.err}
  <p>{results.err.message}</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>Words</th>
        <th>Guess</th>
      </tr>
    </thead>
    <tbody>
      {#each results.guesses as guess}
        <tr>
          <td> {guess.wordsAvailable}</td>
          <td>
            {#each guess.word as l}
              <span class={`letter ${letterTypeToClass(l.type)}`}
                >{l.letter}</span
              >
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  table {
    font-size: 2rem;
    max-width: 100%;
    border-collapse: separate;
  }
  td {
    border-bottom: 1px solid darkgreen;
    padding: 0.5rem;
  }
  span.letter {
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
    margin: 1px;
  }
  span.missing {
    background-color: #333;
  }
  span.wrongPlace {
    background-color: gold;
    color: black;
  }
  span.correctPlace {
    background-color: darkgreen;
  }
</style>
