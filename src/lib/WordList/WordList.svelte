<script lang="ts">
  import Word from "./Word.svelte";

  export let words: string[] = [];
</script>

<div >
  <h2>Possible words</h2>
<div class="wordSuggestion">
  {#if words.length > 20}
    {words.length}
  {:else}
  {#each words as word}
    <Word {word} />
  {/each}
  {/if}
</div>
</div>

<style>
  .wordSuggestion {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  h2{
    text-align: center;
  }
</style>
