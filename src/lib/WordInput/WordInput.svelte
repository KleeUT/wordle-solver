<script lang="ts">
  import LetterInput from "./LetterInput/LetterInput.svelte";
  import { LetterType } from "./LetterInput";
  import type { LetterState } from "./LetterState";
  import StateSwitcher from "./StateSwitcher/StateSwitcher.svelte";

  export let letterInput: LetterState[] = [
    { letter: "", type: LetterType.Missing, index: 0 },
    { letter: "", type: LetterType.Missing, index: 1 },
    { letter: "", type: LetterType.Missing, index: 2 },
    { letter: "", type: LetterType.Missing, index: 3 },
    { letter: "", type: LetterType.Missing, index: 4 },
  ];
  let _letterInput: LetterState[];
  $: {
    if (!_letterInput) {
      _letterInput = letterInput;
    }
    // this could be better but whatever
    const input = _letterInput.reduce(
      (word, letter) => {
        word.word += letter.letter[0] || "";
        if (letter.letter.length > 1) {
          word.rest += letter.letter.substring(1);
        }
        return word;
      },
      { word: "", rest: "" }
    );
    const word = input.word + input.rest;
    _letterInput[0].letter = word?.[0] || "";
    _letterInput[1].letter = word?.[1] || "";
    _letterInput[2].letter = word?.[2] || "";
    _letterInput[3].letter = word?.[3] || "";
    _letterInput[4].letter = word?.[4] || "";
    letterInput = _letterInput;
  }
</script>

<div class="main">
  <div class="letters">
    <LetterInput
      bind:letter={_letterInput[0].letter}
      bind:letterType={_letterInput[0].type}
    />
    <LetterInput
      bind:letter={_letterInput[1].letter}
      bind:letterType={_letterInput[1].type}
    />
    <LetterInput
      bind:letter={_letterInput[2].letter}
      bind:letterType={_letterInput[2].type}
    />
    <LetterInput
      bind:letter={_letterInput[3].letter}
      bind:letterType={_letterInput[3].type}
    />
    <LetterInput
      bind:letter={_letterInput[4].letter}
      bind:letterType={_letterInput[4].type}
    />
    <StateSwitcher bind:letterType={_letterInput[0].type} />
    <StateSwitcher bind:letterType={_letterInput[1].type} />
    <StateSwitcher bind:letterType={_letterInput[2].type} />
    <StateSwitcher bind:letterType={_letterInput[3].type} />
    <StateSwitcher bind:letterType={_letterInput[4].type} />
  </div>
</div>

<style>
  div.main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
  div.letters {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
  }
</style>
