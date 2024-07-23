import { exampleAuthor } from "../../shared/examples";
import { AlphaGrid, BEClue, BECrossword, BankClue } from "../../shared/types";
import { clueBank } from "./clueBank";
import { alphaGridGenerator } from "./gridGenerator";
import { stripAnswers } from "./processors";

const templateCW: BECrossword = {
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
 *
 * This is the master query. It makes a few compromises right now:
 *
 * Only populates in rows and cols with odd numbers.
 * Could have adjacency between col-row mixes. E.g. A 4-letter column clue will not stop a row clue from appearing in the 5th row.
 *
 */
export const generateNewCW = (): BECrossword => {
  let clues: BEClue[] = [];

  let rowsWithClues: number[] = [];
  let colsWithClues: number[] = [];
  let clueWordsAdded: string[] = [];

  for (let rowNum = 0; rowNum < 8; rowNum += 2) {
    for (let colNum = 0; colNum < 8; colNum += 2) {
      for (let i = 0; i < clueBank.length; i++) {
        const bankClue = clueBank[i];
        if (clueWordsAdded.includes(bankClue.answer)) {
          console.log("Clue already used", colNum, rowNum);
        } else {
          // STEP ONE - see if this CLUE fits on this TILE as a ROW

          if (
            rowsWithClues.includes(rowNum) ||
            rowsWithClues.includes(rowNum - 1)
          ) {
            console.log("Row (or adjacent) already occupied:", rowNum);
          } else {
            const newRowClue: BEClue = {
              ...bankClue,
              rowStart: rowNum,
              colStart: colNum,
              isRow: true,
            };
            const tempClues = [...clues];
            tempClues.push(newRowClue);

            if (validateBECW(tempClues)) {
              console.log("CLUE ADDED");
              clues.push(newRowClue);
              rowsWithClues.push(rowNum);
              clueWordsAdded.push(bankClue.answer);
            }
          }

          console.log("YES checking COL here");
          // STEP TWO - see if this CLUE fits on this TILE as a COL

          if (
            colsWithClues.includes(colNum) ||
            colsWithClues.includes(colNum - 1)
          ) {
            console.log("Col (or adjacent) already occupied:", colNum);
          } else {
            const newColClue: BEClue = {
              ...bankClue,
              rowStart: rowNum,
              colStart: colNum,
              isRow: false,
            };
            const tempClues2 = [...clues];
            tempClues2.push(newColClue);
            if (validateBECW(tempClues2)) {
              console.log("CLUE ADDED");
              clues.push(newColClue);
              colsWithClues.push(colNum);
              clueWordsAdded.push(bankClue.answer);
            }
          }
        }
      }
    }
  }
  // }

  return { id: 123, name: "new cw yo", clues: clues };
};

// Raw material = BankClue
// Processed material = BankClue + Position = BEClue
// Output = collection of BEClues = BECrossword

// Test: BECrossword => no contradictions

/**
 * Cycles through every clue in a BE Crossword and confirms
 * there are no tile clashes.
 */
const validateBECW = (clues: BEClue[]): boolean => {
  let answerGrid = alphaGridGenerator(8);

  for (const clue of clues) {
    const result = tryAddClueToGrid(
      answerGrid,
      clue,
      clue.isRow,
      clue.rowStart,
      clue.colStart
    );
    if (result === null) {
      return false;
    }
    answerGrid = result;
  }

  return true;
};

/**
 * Returns an answer grid if possible
 */
const buildAnswerGrid = (source: BECrossword): null | AlphaGrid => {
  let answerGrid = alphaGridGenerator(8);

  // go through every item in source.clues and add it to the answer grid
  for (const clue of source.clues) {
    const result = tryAddClueToGrid(
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

const tryAddClueToGrid = (
  targetGrid: AlphaGrid,
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
  const answerGrid = structuredClone(targetGrid);

  // Remove all spaces from the answer
  const squashedClue = bankClue.answer.replace(/\s+/g, "");
  // Add the answer to the grid
  for (let i = 0; i < squashedClue.length; i++) {
    if (isRow) {
      if (
        colStart + i >= answerGrid[rowStart].length ||
        (answerGrid[rowStart][colStart + i] &&
          answerGrid[rowStart][colStart + i] !== bankClue.answer[i])
      ) {
        // If adding a letter to a Tile involves changing that letter or expanding the grid, this clue can't go here!
        return null;
      }
      answerGrid[rowStart][colStart + i] = bankClue.answer[i];
    } else {
      if (
        rowStart + i >= answerGrid.length ||
        (answerGrid[rowStart + i][colStart] &&
          answerGrid[rowStart + i][colStart] !== bankClue.answer[i])
      ) {
        return null;
      }
      answerGrid[rowStart + i][colStart] = bankClue.answer[i];
    }
  }
  return answerGrid;
};

const testNewCW = generateNewCW();

export const testNewGrid = buildAnswerGrid(testNewCW);

console.log(testNewCW);
console.log(testNewGrid);

export const testFECW = stripAnswers(testNewCW);
