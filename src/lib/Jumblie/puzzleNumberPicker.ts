import type { PuzzleData } from "./PuzzleData";

export function pickPuzzle(allPuzzles: Array<PuzzleData>) {
  // Date of start, gonna just say October 4, 2023 for now
  const startDate = new Date("October 4, 2023");

  function getCurrentDate(): number {
    let now = new Date();
    let localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return localDate.valueOf();
  }

  function getDayDifference(): number {
    let currentDate = getCurrentDate();
    let adjustedStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    ).valueOf();
    let timeDifference = currentDate - adjustedStartDate;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  let dayDifference = getDayDifference();
  let wordsForTheDay = allPuzzles[dayDifference % allPuzzles.length];

  return wordsForTheDay;
}
