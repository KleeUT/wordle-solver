<script lang="ts">
  import { LetterType } from "../StateSwitcher";

  export let letter = "";
  export let letterType: LetterType = LetterType.Missing;
  let letterTypeClass =
    letterType === LetterType.CorrectPlace
      ? "correctPlace"
      : letterType === LetterType.Missing
      ? "missing"
      : "wrongPlace";
  $: if (letter.length > 1) {
    letter = letter[0];
  }
  $: letter = letter.toUpperCase();
  $: letterTypeClass =
    letterType === LetterType.CorrectPlace
      ? "correctPlace"
      : letterType === LetterType.Missing
      ? "missing"
      : "wrongPlace";
</script>

<input type="text" bind:value={letter} class={letterTypeClass} />

<style>
  input {
    width: 3rem;
    height: 3rem;
    font-size: 3rem;
    text-align: center;
    padding: 0;
    border: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    color: whitesmoke;
  }
  input.missing {
    background-color: #333;
  }
  input.wrongPlace {
    background-color: gold;
    color: black;
  }
  input.correctPlace {
    background-color: darkgreen;
  }
</style>
