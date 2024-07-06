import { AlphaGrid, Clue, CrossWord } from "./types";

const exampleClue1: Clue = {
  hint: "Train dear is soft on the soles",
  answer: "CARPET",
  isRow: true,
  rowStart: 1,
  colStart: 0,
  author: "jimmythefish",
};

const exampleClue2: Clue = {
  hint: "Boast without the alien, still a boast",
  answer: "TRUMP",
  isRow: false,
  rowStart: 1,
  colStart: 5,
  author: "alice18103845",
};

const exampleClue3: Clue = {
  hint: "Me me at the beach on the West Coast.",
  answer: "SAN DIEGO",
  isRow: false,
  rowStart: 0,
  colStart: 1,
  author: "alice18103845",
};

export const exampleCrossWord: CrossWord = {
  clues: [exampleClue1, exampleClue2, exampleClue3],
  tiles: [
    [false, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, false, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, false],
  ],
  answers: [
    ["", "S", "", "", "", "", "", ""],
    ["C", "A", "R", "P", "E", "T", "", ""],
    ["", "N", "", "", "", "", "R", ""],
    ["", "D", "", "", "", "", "U", ""],
    ["", "I", "", "", "", "", "M", ""],
    ["", "E", "", "", "", "", "P", ""],
    ["", "G", "", "", "", "", "", ""],
    ["", "O", "", "", "", "", "", ""],
  ],
};

export const exampleGuess: AlphaGrid = [
  ["", "S", "", "", "", "", "", ""],
  ["C", "A", "R", "P", "E", "T", "", ""],
  ["", "N", "", "", "", "", "R", ""],
  ["", "D", "", "", "", "", "A", ""],
  ["", "I", "", "", "", "", "S", ""],
  ["", "E", "", "", "", "", "H", ""],
  ["", "G", "", "", "", "", "", ""],
  ["", "O", "", "", "", "", "", ""],
];
