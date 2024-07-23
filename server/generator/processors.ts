import { BECrossword, FECrossword } from "../../shared/types";

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
