import {
  AlphaGrid,
  BoolGrid,
  Clue,
  Crossword,
  Results,
} from "../../shared/types";

import { testCWviaAirtable } from "./generator";

export const getAnswerLength = (answer: string): number[] => {
  return answer.split(" ").map((word) => word.length);
};

// hint: string;
// isRow: boolean;
// rowStart: number;
// colStart: number;
// author: Author;
// answerLength: number[];

export const stripAnswers = (inputCrossword: Crossword): Crossword => {
  const feClues: Clue[] = inputCrossword.clues.map((clue) => {
    const newClue: Clue = {
      id: clue.id,
      hint: clue.hint,
      isRow: clue.isRow,
      rowStart: clue.rowStart,
      colStart: clue.colStart,
      author: clue.author,
      answerLength: clue.answerLength,
      answer: "",
      tiles: clue.tiles.map((tile) => ({ ...tile, letter: "" })),
      isChecked: false,
      isCorrect: false,
    };
    return newClue;
  });

  return {
    id: inputCrossword.id,
    clues: feClues,
    withAnswers: false,
  };
};

/**
 *  This works (checks the results) but is AI-written and needs review.
 *
 *  Currently treats all black tiles as "incorrect" answers.
 *
 */
export const getResults = (
  correctAnswer: Crossword,
  guesses: AlphaGrid
): Results => {
  console.log("getResults called");

  let correctWords = 0;
  let wrongWords = 0;
  let correctLetters = 0;
  let wrongLetters = 0;

  const evaluationGrid: BoolGrid = guesses.map((row, rowIndex) =>
    row.map((guess, colIndex) => {
      const correctLetter = correctAnswer.clues.some((clue) => {
        if (clue.isRow) {
          return (
            clue.rowStart === rowIndex &&
            clue.colStart <= colIndex &&
            clue.colStart + clue.answer.length > colIndex &&
            clue.answer[colIndex - clue.colStart] === guess
          );
        } else {
          return (
            clue.colStart === colIndex &&
            clue.rowStart <= rowIndex &&
            clue.rowStart + clue.answer.length > rowIndex &&
            clue.answer[rowIndex - clue.rowStart] === guess
          );
        }
      });

      if (correctLetter) {
        correctLetters++;
      } else {
        wrongLetters++;
      }

      return correctLetter;
    })
  );

  correctAnswer.clues.forEach((clue) => {
    const guessWord = clue.isRow
      ? guesses[clue.rowStart]
          .slice(clue.colStart, clue.colStart + clue.answer.length)
          .join("")
      : guesses
          .slice(clue.rowStart, clue.rowStart + clue.answer.length)
          .map((row) => row[clue.colStart])
          .join("");

    if (guessWord === clue.answer) {
      correctWords++;
    } else {
      wrongWords++;
    }
  });

  const realResult: Results = {
    correctWords,
    wrongWords,
    correctLetters,
    wrongLetters,
    evaluationGrid,
  };

  return realResult;
};
