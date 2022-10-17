<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "../Button";
  const dispatch = createEventDispatcher();
  let target = "";
  let error = "";
  $: {
    error = "";
    target = target.toUpperCase();
    if (target.length > 5) {
      target = target.substring(0, 5);
    }
  }
  function play() {
    if (target.length === 5) {
      dispatch("selected", target);
    } else {
      error = `"${target}" needs to br 5 characters`;
    }
  }
</script>

<form>
  <h2>This word:</h2>
  <label for="solution_target">Target: </label>
  <input id="solution_target" type="text" bind:value={target} />
  <Button type="submit" on:click={play}>Play</Button>
  {#if error}
    <p>{error}</p>
  {/if}
</form>

<style>
  label {
    max-width: 100%;
  }
  input {
    letter-spacing: 0.5rem;
    font-size: 2rem;
    width: 10rem;
    padding: 0.5rem;
    max-width: 100%;
    margin-bottom: 1rem;
  }
</style>
