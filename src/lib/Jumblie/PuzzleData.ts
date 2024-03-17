export interface PuzzleData {
  id: number;
  author: string;
  credit_link: string;
  theme: string;
  words: [string, string, string, string] | [];
}
