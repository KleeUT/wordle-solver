<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function click() {
    dispatch("click");
  }
  export let type: "button" | "submit" | "reset" = "button";
  export let classification: "primary" | "secondary" = "primary";
</script>

<button {type} class={classification} on:click={click}><slot /></button>

<style>
  button {
    width: 100%;
    font-size: 2rem;
    padding: 0.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .primary {
    background: gold;
    border: 0;
  }
  .secondary {
    background-color: white;
    border: 0.1rem solid darkgreen;
    color: darkgreen;
  }
</style>
