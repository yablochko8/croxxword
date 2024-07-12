import { exampleAuthor } from "../../shared/examples";
import { AlphaGrid, BEClue, BECrossword, BankClue } from "../../shared/types";
import { alphaGridGenerator } from "./gridGenerator";

const newCW: BECrossword = {
  id: 456,
  name: "new crossword yo",
  clues: [],
};

const exampleClue3BE: BEClue = {
  hint: "Me me at the beach on the West Coast.",
  isRow: false,
  rowStart: 0,
  colStart: 1,
  author: exampleAuthor,
  answer: "SAN DIEGO",
};

/**
 * Returns an answer grid if possible
 */
const buildAnswerGrid = (source: BECrossword): null | AlphaGrid => {
  let answerGrid = alphaGridGenerator(8);

  // go through every item in source.clues and add it to the answer grid
  for (const clue of source.clues) {
    const result = tryAddClue(
      answerGrid,
      clue,
      clue.isRow,
      clue.rowStart,
      clue.colStart
    );
    if (result === null) {
      return null;
    }
    answerGrid = result;
  }

  return answerGrid;
};

const tryAddClue = (
  target: AlphaGrid,
  bankClue: BankClue,
  isRow: boolean,
  rowStart: number,
  colStart: number
) => {
  console.log(
    "checking if ",
    bankClue.answer,
    " can fit into ",
    rowStart,
    colStart
  );
  const answerGrid = structuredClone(target);

  // Remove all spaces from the answer
  const squashedClue = bankClue.answer.replace(/\s+/g, "");

  // Add the answer to the grid
  for (let i = 0; i < squashedClue.length; i++) {
    if (isRow) {
      if (
        answerGrid[rowStart][colStart + i] &&
        answerGrid[rowStart][colStart + i] !== bankClue.answer[i]
      ) {
        // If adding a letter to a Tile invovles changing that letter, this clue can't go here!
        return null;
      }
      answerGrid[rowStart][colStart + i] = bankClue.answer[i];
    } else {
      if (
        answerGrid[rowStart + i][colStart] &&
        answerGrid[rowStart + i][colStart] !== bankClue.answer[i]
      ) {
        return null;
      }
      answerGrid[rowStart + i][colStart] = bankClue.answer[i];
    }
  }
  return answerGrid;
};
