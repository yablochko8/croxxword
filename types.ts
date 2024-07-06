export type Clue = {
  hint: string;
  answer: string;
  isRow: boolean;
  rowStart: number;
  colStart: number;
};

export type ClueGrid = {
  clues: Clue[];
  tiles: boolean[][];
};

export type Guess = string[][];
