import {
  AlphaGrid,
  Author,
  BECrossword,
  BoolGrid,
  FECrossword,
  Results,
} from "../../shared/types";
import { testBECW } from "./generator";

export const stripAnswers = (be: BECrossword): FECrossword => {
  const feClues = be.clues.map((clue) => {
    const { answer, ...feClue } = clue;
    return {
      ...feClue,
      answerLength: answer.split(" ").map((word) => word.length),
    };
  });

  return {
    id: be.id,
    name: be.name,
    clues: feClues,
  };
};

/**
 *  This works (checks the results) but is AI-written and needs review.
 *
 *  Currently treats all black tiles as "incorrect" answers.
 *
 */
export const getResults = (cwid: number, guesses: AlphaGrid): Results => {
  console.log("getResults called");
  const dummyCorrectness = cwid === 100;

  const correctAnswer = testBECW;

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
