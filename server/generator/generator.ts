import { AlphaGrid, Clue, Crossword } from "../../shared/types";
import { getUnusedClues } from "../airtable/clues";
import { registerCrossword } from "../airtable/crosswords";
import { alphaGridGenerator } from "./gridGenerator";
import { getAnswerLength } from "./processors";

/**
 * This is the master query. It makes a few compromises right now:
 *
 * Only populates in rows and cols with odd numbers.
 *
 * libraryMin is the minimum number of unused clues it expects before it will
 * generate a new crossword
 */
export const generateCrossword = async (
  libraryMin: number = 10
): Promise<Crossword | null> => {
  const candidateClues = await getUnusedClues();

  if (candidateClues.length < libraryMin) {
    return null;
  }

  let clues: Clue[] = [];

  let rowsWithClues: number[] = [];
  let colsWithClues: number[] = [];
  let answersAdded: string[] = [];

  for (let rowNum = 0; rowNum < 8; rowNum += 1) {
    for (let colNum = 0; colNum < 8; colNum += 1) {
      for (let i = 0; i < candidateClues.length; i++) {
        const candidate = candidateClues[i];
        if (answersAdded.includes(candidate.answer)) {
          // Skip (clue has already been used)
        } else {
          // STEP ONE - see if this CLUE fits on this TILE as a ROW

          if (
            rowsWithClues.includes(rowNum) ||
            rowsWithClues.includes(rowNum - 1) ||
            rowsWithClues.includes(rowNum + 1)
          ) {
            // Skip (row or adjacent row already has a clue)
          } else {
            // Create a full Clue object that will be attempted to be added to the Crossword
            const newRowClue: Clue = {
              id: "fillerid",
              ...candidate,
              rowStart: rowNum,
              colStart: colNum,
              isRow: true,
              isChecked: false,
              isCorrect: false,
              tiles: [],
              answerLength: getAnswerLength(candidate.answer),
            };

            // Populate the tiles array of the Clue object
            for (let i = 0; i < candidate.answer.length; i++) {
              newRowClue.tiles.push({
                letter: candidate.answer[i],
                row: rowNum,
                col: colNum + i,
              });
            }
            const tempClues = [...clues];
            tempClues.push(newRowClue);

            if (validateCrossword(tempClues)) {
              console.log("CLUE ADDED");
              clues.push(newRowClue);
              rowsWithClues.push(rowNum);
              answersAdded.push(candidate.answer);
            }
          }
        }

        if (answersAdded.includes(candidate.answer)) {
          // console.log("Clue already used", colNum, rowNum);
        } else {
          // STEP TWO - see if this CLUE fits on this TILE as a COL

          if (
            colsWithClues.includes(colNum) ||
            colsWithClues.includes(colNum - 1)
          ) {
            // console.log("Col (or adjacent) already occupied:", colNum);
          } else {
            const newColClue: Clue = {
              id: "fillerid",
              ...candidate,
              rowStart: rowNum,
              colStart: colNum,
              isRow: false,
              isChecked: false,
              isCorrect: false,
              tiles: [],
              answerLength: getAnswerLength(candidate.answer),
            };
            // Populate the tiles array of the Clue object
            for (let i = 0; i < candidate.answer.length; i++) {
              newColClue.tiles.push({
                letter: candidate.answer[i],
                row: rowNum + i,
                col: colNum,
              });
            }
            const tempClues2 = [...clues];
            tempClues2.push(newColClue);
            if (validateCrossword(tempClues2)) {
              console.log("CLUE ADDED");
              clues.push(newColClue);
              colsWithClues.push(colNum);
              answersAdded.push(candidate.answer);
            }
          }
        }
      }
    }
  }
  // }

  return { id: 123, clues: clues, withAnswers: true };
};

/**
 * Cycles through every clue in a BE Crossword and confirms
 * there are no tile clashes.
 */
const validateCrossword = (clues: Clue[]): boolean => {
  let answerGrid = alphaGridGenerator(8);

  for (const clue of clues) {
    const result = tryAddAnswerToGrid(
      answerGrid,
      clue.answer!,
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

/** Checks if a clue can be added to a specific grid position. */
const tryAddAnswerToGrid = (
  targetGrid: AlphaGrid,
  answer: string,
  isRow: boolean,
  rowStart: number,
  colStart: number
) => {
  // console.log("checking if ", answer, " can fit into ", rowStart, colStart);
  const answerGrid = structuredClone(targetGrid);

  // Remove all spaces from the answer
  const squashedClue = answer.replace(/\s+/g, "");

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
        answerGrid[rowStart][colStart + i] !== answer[i]
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
      answerGrid[rowStart][colStart + i] = answer[i];
    } else {
      // COL CLUES - same logic as above transposed
      if (
        answerGrid[rowStart + i][colStart] &&
        answerGrid[rowStart + i][colStart] !== answer[i]
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

      answerGrid[rowStart + i][colStart] = answer[i];
    }
  }
  return answerGrid;
};

/**
 * Server function to generate a new crossword and register it in the database.
 * If successful, returns the ID of the new crossword.
 */
export const generateAndRegister = async () => {
  const proposedCrossword = await generateCrossword();
  if (!proposedCrossword) {
    return null;
  }
  const confirmedCrossword = await registerCrossword(proposedCrossword);
  return confirmedCrossword.id;
};
