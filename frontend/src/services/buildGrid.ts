import { AlphaGrid, BoolGrid, GridDisplay } from "../../../shared/types";

import { Crossword } from "../../../shared/types";

export const buildGrid = (cw: Crossword): GridDisplay => {
  const size = 8; // Assuming a fixed size for the grid

  const tiles: BoolGrid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));
  const guesses: AlphaGrid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
  const evaluation: BoolGrid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));

  cw.clues.forEach((clue) => {
    const { isRow, rowStart, colStart, answerLength } = clue;
    let [row, col] = [rowStart, colStart];

    answerLength.forEach((length) => {
      for (let i = 0; i < length; i++) {
        tiles[row][col] = true;
        if (isRow) {
          col++;
        } else {
          row++;
        }
      }
      if (isRow) {
        col++;
      } else {
        row++;
      }
    });
  });

  return {
    tiles,
    guesses,
    evaluation,
  };
};
