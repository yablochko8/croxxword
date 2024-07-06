import { Evaluation } from "../data/types";

export const expandEvaluation = (evaluation: Evaluation): string => {
  return `${evaluation.correctWords} correct words, ${evaluation.wrongWords} wrong words, ${evaluation.correctLetters} correct letters, ${evaluation.wrongLetters} wrong letters`;
};
