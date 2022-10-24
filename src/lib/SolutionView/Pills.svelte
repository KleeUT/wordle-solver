<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let options: string[];
  export let selected: string = "";
  const dispatch = createEventDispatcher();

  function select(option: string) {
    selected = option;
    dispatch("selectionChanged", option);
  }
</script>

<div>
  {#each options as option}
    <button
      class={option === selected ? "selected" : ""}
      on:click={() => select(option)}>{option}</button
    >
  {/each}
</div>

<style>
  button {
    display: inline-block;
    background: white;
    border: 2px solid darkgreen;
    color: darkgreen;
    font-size: 1rem;
    padding: 0.5rem;
    cursor: pointer;
  }
  .selected {
    background: darkgreen;
    border: 2px solid white;
    color: white;
  }
</style>
