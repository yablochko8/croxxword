import { useEffect, useState } from "react";
import { Results, GridDisplay, FECrossword } from "../../../shared/types";
import { emptyFEGridDisplay, exampleResults } from "../../../shared/examples";
import { getCrossword } from "./serverCalls";
import { buildGrid } from "./buildGrid";
// import { checkGuesses } from "./serverCalls";

export const useController = (crosswordId: number, authorId: number) => {
  console.log("To do: use these...", crosswordId, authorId);
  const [gridDisplay, setGridDisplay] =
    useState<GridDisplay>(emptyFEGridDisplay);

  const [crossword, setCrossword] = useState<FECrossword | null>(null);

  useEffect(() => {
    const fetchCrossword = async () => {
      const crossword = await getCrossword();
      setCrossword(crossword);
      setGridDisplay(buildGrid(crossword));
      console.log("Fetched crossword:", crossword);
    };

    fetchCrossword();
  }, []);
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

  const clues = crossword ? crossword.clues : [];

  return { gridDisplay, clues, results, changeLetter, onClickCheck };
};
