import { Results } from "../../../shared/types";

export const expandEvaluation = (evaluation: Results): string => {
  return `${evaluation.correctWords} correct words, ${evaluation.wrongWords} wrong words, ${evaluation.correctLetters} correct letters, ${evaluation.wrongLetters} wrong letters`;
};
