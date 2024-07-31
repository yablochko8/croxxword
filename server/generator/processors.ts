import {
  AlphaGrid,
  BoolGrid,
  Clue,
  Crossword,
  Results,
} from "../../shared/types";

export const getAnswerLength = (answer: string): number[] => {
  return answer.split(" ").map((word) => word.length);
};

/**
 * May be no longer needed. Currently the same job is handled in server.ts by zod parsing.
 */
const stripAnswers = (inputCrossword: Crossword): Crossword => {
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
 * Server-side function to take in the full Crossword object (that includes answers)
 * and an AlphaGrid of user guesses.
 */
export const getResults = (
  correctAnswer: Crossword,
  guesses: AlphaGrid
): Results => {
  let correctWords = 0;
  let wrongWords = 0;
  let correctLetters = 0;
  let wrongLetters = 0;

  for (const clue of correctAnswer.clues) {
    let fullWordCorrect = true;
    for (const tile of clue.tiles) {
      if (tile.letter === "") {
        // Skip black tiles
        continue;
      }
      const guess = guesses[tile.row][tile.col];
      if (guess === "") {
        // Empty guess is considered incorrect
        wrongLetters++;
        fullWordCorrect = false;
      } else if (tile.letter.toUpperCase() === guess.toUpperCase()) {
        correctLetters++;
      } else {
        wrongLetters++;
        fullWordCorrect = false;
      }
    }
    if (fullWordCorrect) {
      correctWords++;
    } else {
      wrongWords++;
    }
  }

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

      return correctLetter;
    })
  );

  const realResult: Results = {
    correctWords,
    wrongWords,
    correctLetters,
    wrongLetters,
    evaluationGrid,
  };

  return realResult;
};
