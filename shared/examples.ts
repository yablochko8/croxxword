import {
  AlphaGrid,
  Author,
  BEClue,
  BoolGrid,
  FEClue,
  FECrossword,
} from "./types";

export const exampleAuthor: Author = {
  id: 999,
  name: "maverick",
};

const exampleClue1: FEClue = {
  hint: "Train dear is soft on the soles",
  isRow: true,
  rowStart: 1,
  colStart: 0,
  author: exampleAuthor,
  answerLength: [6],
};

const exampleClue1BE: BEClue = {
  hint: "Train dear is soft on the soles",
  isRow: true,
  rowStart: 1,
  colStart: 0,
  author: exampleAuthor,
  answer: "CARPET",
};
const exampleClue2: FEClue = {
  hint: "Boast without the alien, still a boast",
  isRow: false,
  rowStart: 1,
  colStart: 5,
  author: exampleAuthor,
  answerLength: [5],
};

const exampleClue2BE: BEClue = {
  hint: "Boast without the alien, still a boast",
  isRow: false,
  rowStart: 1,
  colStart: 5,
  author: exampleAuthor,
  answer: "TRUMP",
};

const exampleClue3: FEClue = {
  hint: "Me me at the beach on the West Coast.",
  isRow: false,
  rowStart: 0,
  colStart: 1,
  author: exampleAuthor,
  answerLength: [3, 5],
};

const exampleClue3BE: BEClue = {
  hint: "Me me at the beach on the West Coast.",
  isRow: false,
  rowStart: 0,
  colStart: 1,
  author: exampleAuthor,
  answer: "SAN DIEGO",
};

export const exampleCrossWord: FECrossword = {
  id: 123,
  name: "First Crossword",
  clues: [exampleClue1, exampleClue2, exampleClue3],
};

const exampleTiles: BoolGrid = [
  [false, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true],
  [true, true, true, true, false, true, true, true],
  [true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, false],
];

const exampleGuess: AlphaGrid = [
  ["", "S", "", "", "", "", "", ""],
  ["C", "A", "R", "P", "E", "T", "", ""],
  ["", "N", "", "", "", "", "R", ""],
  ["", "D", "", "", "", "", "U", ""],
  ["", "I", "", "", "", "", "M", ""],
  ["", "E", "", "", "", "", "P", ""],
  ["", "G", "", "", "", "", "", ""],
  ["", "O", "", "", "", "", "", ""],
];

export const exampleGuess2: AlphaGrid = [
  ["P", "A", "R", "I", "S", "J", "T", "D"],
  ["O", "P", "O", "A", "U", "U", "O", "I"],
  ["T", "A", "M", "N", "A", "P", "K", "A"],
  ["T", "C", "E", "", "", "I", "Y", "M"],
  ["A", "I", "", "", "", "T", "O", "O"],
  ["W", "F", "", "", "", "E", "", "N"],
  ["A", "I", "", "", "", "R", "", "D"],
  ["", "C", "", "", "", "", "", ""],
];

export const exampleEvaluation: BoolGrid = [
  [false, false, false, false, false, false, false, false],
  [true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];

export const exampleFEGridDisplay = {
  tiles: exampleTiles,
  guesses: exampleGuess2,
  evaluation: exampleEvaluation,
};

export const exampleResults = {
  correctWords: 3,
  wrongWords: 2,
  correctLetters: 10,
  wrongLetters: 1,
  evaluationGrid: exampleEvaluation,
};
