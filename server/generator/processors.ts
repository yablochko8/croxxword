import {
  AlphaGrid,
  BECrossword,
  BoolGrid,
  FECrossword,
  Results,
} from "../../shared/types";

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

export const getResults = (cwid: number, guesses: AlphaGrid): Results => {
  console.log("getResults called");
  const dummyCorrectness = cwid === 100;

  const dummyResult: Results = {
    correctWords: 0,
    wrongWords: 0,
    correctLetters: 0,
    wrongLetters: 0,
    evaluationGrid: guesses.map((row) => row.map(() => dummyCorrectness)),
  };

  return dummyResult;
};
