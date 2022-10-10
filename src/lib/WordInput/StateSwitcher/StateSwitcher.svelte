<script lang="ts">
  import { LetterType } from "./LetterType";
  export let letterType: LetterType = LetterType.Missing;
  $: nextType = (letterType + 1) % 3;
  function updateType() {
    letterType = nextType;
  }
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
  $: color = typeToColor(nextType);
</script>

<button on:click={updateType} class={color}>^</button>

<style>
  button {
    width: 3rem;
    height: 1rem;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
    border: 0;
    text-align: center;
    cursor: pointer;
  }
  .green {
    background-color: green;
    color: white;
    border-bottom: 2px solid #333;
  }
  .gold {
    background-color: gold;
    color: black;
    border-bottom: 2px solid green;
  }
  .gray {
    background-color: #333;
    color: white;
    border-bottom: 2px solid gold;
  }
</style>
