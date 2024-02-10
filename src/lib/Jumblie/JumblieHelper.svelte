<script lang="ts">
  import type { PuzzleData } from "./PuzzleData";
  import WordHelper from "./WordHelper.svelte";
  import { fetchAllWords } from "./puzzles";
  let allWords: Array<PuzzleData>;
  let loaded: boolean = false;
  let themeWord;
  let puzzleData: PuzzleData;
  let foundPuzzle: boolean = false;

  async function getAllWords() {
    allWords = await fetchAllWords();
    loaded = true;
  }
  getAllWords();
  function findPuzzle() {
    const puzzle = allWords.find((x) => x.theme === themeWord);
    foundPuzzle = puzzle !== undefined;
    puzzleData = puzzle || { theme: "", words: [] };
    puzzleData.words.sort((a, b) => a.length - b.length);
  }
</script>

<h1>Jumblie Helper</h1>
<label>
  Theme word:
  <input type="text" bind:value={themeWord} on:input={findPuzzle} />
  {#if foundPuzzle}
    <ol>
      {#each puzzleData.words as word}
        <li>
          <WordHelper {word} />
          <hr />
        </li>
      {/each}
    </ol>
  {:else}
    <p>No puzzle found for {themeWord || ""}</p>
  {/if}
</label>

<style>
  label {
    max-width: 100%;
    display: block;
  }
  input {
    display: block;
    letter-spacing: 0.5rem;
    font-size: 2rem;
    padding: 0.5rem;
    max-width: 100%;
    margin-bottom: 1rem;
  }
  ol {
    list-style: none;
    padding: 0;
  }
</style>
