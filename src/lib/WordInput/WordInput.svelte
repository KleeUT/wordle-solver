<script lang="ts">
  import { LetterType } from "./LetterInput";
  import type { LetterState } from "./LetterState";
  import StateSwitcher from "./StateSwitcher/StateSwitcher.svelte";
  import { createEventDispatcher } from "svelte";

  function typeToColor(t: LetterType): string {
    switch (t) {
      case LetterType.Missing:
        return "gray";
      case LetterType.CorrectPlace:
        return "green";
      case LetterType.WrongPlace:
        return "gold";
    }
  }

  let letterInput: LetterState[] = [
    { letter: "", type: LetterType.Missing, index: 0 },
    { letter: "", type: LetterType.Missing, index: 1 },
    { letter: "", type: LetterType.Missing, index: 2 },
    { letter: "", type: LetterType.Missing, index: 3 },
    { letter: "", type: LetterType.Missing, index: 4 },
  ];
  let wordInput = "";
  const dispatcher = createEventDispatcher();

  $: {
    letterInput[0].letter = wordInput?.[0] || "";
    letterInput[1].letter = wordInput?.[1] || "";
    letterInput[2].letter = wordInput?.[2] || "";
    letterInput[3].letter = wordInput?.[3] || "";
    letterInput[4].letter = wordInput?.[4] || "";
    letterInput = letterInput;
    dispatcher("change", letterInput);
  }
</script>

<div class="main">
  <div class="word">
    <div class="letters">
      {#each letterInput as input}
        <div class={typeToColor(input.type)}>
          {input.letter}
        </div>
      {/each}
    </div>
    <div class="wordInput">
      <input bind:value={wordInput} />
    </div>
    {#each letterInput as input}
      <StateSwitcher bind:letterType={input.type} />
    {/each}
  </div>
</div>

<style>
  div.wordInput {
    width: 100%;
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    grid-column-end: 6;
  }

  input {
    width: 100%;
    padding-left: 2rem;
    display: block;
    font-size: 3rem;
    letter-spacing: 1.8rem;
    background: transparent;
    border: 0;
    color: transparent;
  }
  input:focus-within {
    border: 5px solid rebeccapurple;
  }

  div.main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
  div.letters {
    font-size: 3rem;
    display: grid;
    border-radius: 0.5rem;
    grid-template-columns: repeat(5, 1fr);
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    grid-column-end: 6;
  }
  div.word {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .green {
    background-color: green;
    color: white;
  }
  .gold {
    background-color: gold;
    color: black;
  }
  .gray {
    background-color: #333;
    color: white;
  }
</style>
