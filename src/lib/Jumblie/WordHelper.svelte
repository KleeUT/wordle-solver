<script lang="ts">
  import Letter from "./Letter.svelte";

  export let word: string;
  let provideHelp: boolean = false;
  let helps = [];
  function showHelp() {
    provideHelp = true;
    helps = word.split("").map(() => false);
  }
  function showLetter(index: number) {
    helps[index] = true;
  }
</script>

{#if provideHelp}
  <ol>
    {#each helps as letter, index (index)}
      <li>
        {#if letter}
          <Letter letter={word.at(index)} />
        {:else}
          <button
            on:click={() => {
              showLetter(index);
            }}>{index + 1}</button
          >
        {/if}
      </li>
    {/each}
  </ol>
{:else}
  <button on:click={showHelp}>Help</button>
{/if}

<style>
  * {
    font-size: 2rem;
  }
  ol {
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0.5rem;
  }
  button {
    border: 1px solid black;
    padding: 0.2rem;
  }
</style>
