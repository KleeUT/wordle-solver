<script lang="ts">
  import type { PuzzleData } from "./PuzzleData";
  import WordHelper from "./WordHelper.svelte";
  import { pickPuzzle } from "./puzzleNumberPicker";
  import { fetchAllWords } from "./puzzles";
  let allWords: Array<PuzzleData>;
  let loaded: boolean = false;
  let themeWord;
  let puzzleData: PuzzleData;
  let foundPuzzle: boolean = false;

  async function getAllWords() {
    allWords = await fetchAllWords();
    loaded = true;
    findPuzzle();
  }
  getAllWords();
  function findPuzzle() {
    let puzzle = pickPuzzle(allWords);
    foundPuzzle = puzzle !== undefined;
    puzzleData = puzzle || { theme: "", words: [] };
    puzzleData.words.sort((a, b) => a.length - b.length);
    themeWord = puzzleData.theme;
  }
</script>

<h1>Jumblie Helper</h1>

<p>Theme word: {themeWord}</p>
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

<style>
  ol {
    list-style: none;
    padding: 0;
  }
</style>
