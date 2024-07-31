export type AlphaGrid = string[][];

export type BoolGrid = boolean[][];

export type FutureClue = {
  id?: string;
  hint: string;
  answer: string;
  author: string;
};

export type Tile = {
  row: number;
  col: number;
  letter: string;
};

export type Clue = {
  id: string;
  hint: string;
  answer: string;
  answerLength: number[];
  author: string;
  isRow: boolean;
  rowStart: number;
  colStart: number;
  tiles: Tile[];
  isChecked: boolean;
  isCorrect: boolean;
};

/*
 * Global Crossword object
 * There is a constrained version of this in server.ts defined by zod parsing.
 */
export type Crossword = {
  id: number;
  clues: Clue[];
  withAnswers: boolean;
};

export type GridDisplay = {
  tiles: BoolGrid;
  guesses: AlphaGrid;
  evaluation: BoolGrid;
};

export type Results = {
  correctWords: number;
  wrongWords: number;
  correctLetters: number;
  wrongLetters: number;
  evaluationGrid: BoolGrid;
};
