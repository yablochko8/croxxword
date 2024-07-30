export type AlphaGrid = string[][];

export type BoolGrid = boolean[][];

export type Author = {
  id: number;
  name: string;
};

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

export type Crossword = {
  id: number;
  clues: Clue[];
  withAnswers: boolean;
};

///////////////////////////////////////////////////////////////////////////////////////////////

export type BEClue = {
  hint: string;
  isRow: boolean;
  rowStart: number;
  colStart: number;
  author: Author;
  answer: string;
  // answerLength: number[];
};

export type FEClue = {
  hint: string;
  isRow: boolean;
  rowStart: number;
  colStart: number;
  author: Author;
  // answer: string;
  answerLength: number[];
};

// export type BECrossword = {
//   id: number;
//   name: string;
//   clues: BEClue[];
// };

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

export type ClueDisplay = FEClue[];

export type Results = {
  correctWords: number;
  wrongWords: number;
  correctLetters: number;
  wrongLetters: number;
  evaluationGrid: BoolGrid;
};
