import { exampleAuthor } from "../../shared/examples";
import { AlphaGrid, BEClue, BECrossword, BankClue } from "../../shared/types";
import { clueBank } from "./clueBank";
import { alphaGridGenerator } from "./gridGenerator";
import { stripAnswers } from "./processors";

/**
 * This is the master query. It makes a few compromises right now:
 *
 * Only populates in rows and cols with odd numbers.
 * Could have adjacency between col-row mixes. E.g. A 4-letter column clue will not stop a row clue from appearing in the 5th row.
 */
export const generateNewCW = (): BECrossword => {
  let clues: BEClue[] = [];

  let rowsWithClues: number[] = [];
  let colsWithClues: number[] = [];
  let clueWordsAdded: string[] = [];

  for (let rowNum = 0; rowNum < 8; rowNum += 1) {
    for (let colNum = 0; colNum < 8; colNum += 1) {
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

/** Checks if a clue can be added to a specific grid position. */
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

  // Check if the answer is too long for the grid
  if (isRow) {
    if (squashedClue.length + colStart >= answerGrid.length) {
      return null;
    }
  } else {
    if (squashedClue.length + rowStart >= answerGrid[0].length) {
      return null;
    }
  }

  // Check if the tile immediately before or after the clue is already occupied
  const clueEndHitsBorder = isRow
    ? colStart + squashedClue.length === answerGrid.length
    : rowStart + squashedClue.length === answerGrid[0].length;
  if (isRow) {
    if (
      (colStart > 0 && answerGrid[rowStart][colStart - 1]) ||
      (!clueEndHitsBorder &&
        answerGrid[rowStart][colStart + squashedClue.length])
    ) {
      return null;
    }
  } else {
    if (
      (rowStart > 0 && answerGrid[rowStart - 1][colStart]) ||
      (!clueEndHitsBorder &&
        answerGrid[rowStart + squashedClue.length][colStart])
    ) {
      return null;
    }
  }

  // Add the answer to the grid
  for (let i = 0; i < squashedClue.length; i++) {
    if (isRow) {
      // Check if word overlaps with another word with a non-matching letter
      if (
        answerGrid[rowStart][colStart + i] &&
        answerGrid[rowStart][colStart + i] !== bankClue.answer[i]
      ) {
        return null;
      }

      // For clues not part of a full overlap
      // Check if there is a letter above (while not checking the first row)
      if (
        !answerGrid[rowStart][colStart + i] &&
        rowStart > 0 &&
        answerGrid[rowStart - 1][colStart + i]
      ) {
        return null;
      }

      // For clues not part of a full overlap
      // Check if there is a letter below (while not checking the last row)
      if (
        !answerGrid[rowStart][colStart + i] &&
        rowStart < answerGrid.length - 1 &&
        answerGrid[rowStart + 1][colStart + i]
      ) {
        return null;
      }

      // Based on current population method, no need to check the cell below

      // If the above trigger conditions are not met then we can add it to the grid
      answerGrid[rowStart][colStart + i] = bankClue.answer[i];
    } else {
      // COL CLUES - same logic as above transposed
      if (
        answerGrid[rowStart + i][colStart] &&
        answerGrid[rowStart + i][colStart] !== bankClue.answer[i]
      ) {
        return null;
      }
      // For clues not part of a full overlap
      // Check if there is a letter to the left (while not checking the first column)
      if (
        !answerGrid[rowStart + i][colStart] &&
        colStart > 0 &&
        answerGrid[rowStart + i][colStart - 1]
      ) {
        return null;
      }
      // For clues not part of a full overlap
      // Check if there is a letter to the right (while not checking the last column)
      if (
        !answerGrid[rowStart + i][colStart] &&
        colStart < answerGrid[0].length - 1 &&
        answerGrid[rowStart + i][colStart + 1]
      ) {
        return null;
      }

      answerGrid[rowStart + i][colStart] = bankClue.answer[i];
    }
  }
  return answerGrid;
};

export const testBECW = generateNewCW();

export const testNewGrid = buildAnswerGrid(testBECW);

const printGridToConsole = (grid: AlphaGrid | null) => {
  if (grid) {
    for (const row of grid) {
      console.log(row);
    }
  }
};

console.log(testBECW);

printGridToConsole(testNewGrid);

export const testFECW = stripAnswers(testBECW);
