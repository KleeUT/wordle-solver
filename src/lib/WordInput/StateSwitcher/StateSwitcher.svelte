<script lang="ts">
  import { LetterType } from "./LetterType";
  export let letterType: LetterType = LetterType.Missing;
  function updateType() {
    letterType = (letterType + 1) % 3;
  }
</script>

<button on:click={updateType}>
  <div class="color green" />
  <div class="color gold" />
  <div class="color gray" />
</button>

<style>
  button {
    width: 3rem;
    height: 1rem;
    display: inline-flex;
    padding: 0;
    margin: 0;
    border: 0;
    justify-content: stretch;
    align-items: stretch;
    cursor: pointer;
    border-right: 2px solid #aaa;
    border-top: 2px solid #aaa;
    border-bottom: 2px solid #aaa;
  }
  div.color {
    width: 100%;
    flex-grow: 1;
    display: inline-block;
  }
  div.green {
    background-color: green;
  }
  div.gold {
    background-color: gold;
  }
  div.gray {
    background-color: #333;
  }
</style>
