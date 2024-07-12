export type AlphaGrid = string[][];

export type BoolGrid = boolean[][];

export type Author = {
  name: string;
};

export type BEClue = {
  hint: string;
  answer: string;
  isRow: boolean;
  rowStart: number;
  colStart: number;
  author: Author;
};

export type FEClue = {
  hint: string;
  // answer: string; (OTHERWISE IDENTICAL)
  isRow: boolean;
  rowStart: number;
  colStart: number;
  author: Author;
};

export type BECrossword = {
  id: number;
  name: string;
  clues: BEClue[];
};

export type FECrossword = {
  id: number;
  name: string;
  clues: FEClue[];
};

export type GridDisplay = {
  tiles: BoolGrid;
  guesses: AlphaGrid;
  evaluation: BoolGrid;
};

export type Evaluation = {
  correctWords: number;
  wrongWords: number;
  correctLetters: number;
  wrongLetters: number;
  evaluationGrid: BoolGrid;
};
