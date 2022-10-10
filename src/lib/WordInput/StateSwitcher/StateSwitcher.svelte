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
    border: 2px solid #aaa;
    border-top: 0;
    /* border-right: 2px solid #aaa;
    border-left: 2px solid #aaa;
    border-bottom: 2px solid #aaa; */
    text-align: center;
    cursor: pointer;
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
