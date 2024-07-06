export type AlphaGrid = string[][];

export type BoolGrid = boolean[][];

export type Clue = {
  hint: string;
  answer: string;
  isRow: boolean;
  rowStart: number;
  colStart: number;
  author: string;
};

export type CrossWord = {
  clues: Clue[];
  tiles: BoolGrid;
  answers: AlphaGrid;
};
