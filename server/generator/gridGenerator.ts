import { AlphaGrid, BoolGrid } from "../../shared/types";

export const alphaGridGenerator = (
  rowsAndCols: number,
  defaultCellValue: string = ""
): AlphaGrid => {
  if (rowsAndCols <= 0 || rowsAndCols >= 999) {
    throw new Error("Rows and columns must be positive integers under 999.");
  }
  const array: AlphaGrid = [];
  for (let i = 0; i < rowsAndCols; i++) {
    array[i] = [];
    for (let j = 0; j < rowsAndCols; j++) {
      array[i][j] = defaultCellValue;
    }
  }
  return array;
};

export const boolGridGenerator = (
  rowsAndCols: number,
  defaultCellValue: boolean = false
): BoolGrid => {
  if (rowsAndCols <= 0 || rowsAndCols >= 999) {
    throw new Error("Rows and columns must be positive integers under 999.");
  }
  const array: BoolGrid = [];
  for (let i = 0; i < rowsAndCols; i++) {
    array[i] = [];
    for (let j = 0; j < rowsAndCols; j++) {
      array[i][j] = defaultCellValue;
    }
  }
  return array;
};
