<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "../Button";
  type ResponseType = {
    id: number;
    solution: string;
    print_date: string;
    days_since_launch: number;
  };
  type ErrorResponse = {
    status: string;
    errors: string[];
    results: never[];
  };
  let year = String(new Date().getFullYear());
  let month = String(new Date().getMonth());
  let day = String(new Date().getDay());
  let error: string | undefined;
  const dispatch = createEventDispatcher();
  async function fetchWord(e: SubmitEvent) {
    e.preventDefault();
    const res = await fetch(`/api/wordForDay?date=${year}-${month}-${day}`);
    console.log({ status: res.status });
    try {
      if (!res.ok) {
        const body: ErrorResponse = await res.json();
        error = `${res.status} ${body.errors.join(", ")}}`;
      }
      const data = (await res.json()) as ResponseType;
      const word = data.solution;
      dispatch("selected", word);
    } catch (e) {
      error = `${res.status} - ${e.message}`;
    }
  }
  $: {
    error = undefined;
  }
</script>

<form on:submit={fetchWord} action="">
  <h2>Wordle for date:</h2>
  <label for="yearinput"> Year: </label>
  <input id="yearinput" type="text" bind:value={year} />
  <label for="monthinput"> Month: </label>
  <input id="monthinput" type="text" bind:value={month} />
  <label for="dayinput"> Day: </label>
  <input id="dayinput" type="text" bind:value={day} />
  <Button type="submit">Play</Button>
  {#if error}
    <p>{error}</p>
  {/if}
</form>

<style>
  label {
    max-width: 100%;
    display: block;
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
