import { useState } from "react";
import { Results, GridDisplay } from "../../../shared/types";
import { exampleFEGridDisplay, exampleResults } from "../../../shared/examples";
// import { checkGuesses } from "./serverCalls";

export const useController = (crosswordId: number, authorId: number) => {
  const [gridDisplay, setGridDisplay] = useState<GridDisplay>(
    structuredClone(exampleFEGridDisplay)
  );

  const [results, setResults] = useState<Results | null>(null);

  /**
   * Updates the letter at the specified position in the grid.
   */
  const changeLetter = (newLetter: string, rowNum: number, colNum: number) => {
    console.log("Solo playMove:", rowNum, colNum);

    setGridDisplay((prevGridDisplay) => {
      const newGridDisplay = structuredClone(prevGridDisplay);
      newGridDisplay.guesses[rowNum][colNum] = newLetter.charAt(0);
      return newGridDisplay;
    });
  };

  /**
   * Sends user's guesses to the server to check if they are correct.
   */
  const onClickCheck = async () => {
    console.log("Checking the server now (not really)");
    // something something gridDisplay.evaluation
    setResults(exampleResults);
  };

  return { gridDisplay, results, changeLetter, onClickCheck };
};
