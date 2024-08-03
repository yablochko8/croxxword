import { useEffect, useState } from "react";
import { Results, GridDisplay, Crossword } from "../../../shared/types";
import { emptyFEGridDisplay } from "../../../shared/examples";
import { checkGuesses, getCrossword } from "./serverCalls";
import { buildGrid } from "./buildGrid";

export const useController = (crosswordId: number, playerId: string) => {
  console.log("To do: use these...", crosswordId, playerId);
  const [gridDisplay, setGridDisplay] =
    useState<GridDisplay>(emptyFEGridDisplay);

  const [crossword, setCrossword] = useState<Crossword | null>(null);

  useEffect(() => {
    const fetchCrossword = async () => {
      const crossword = await getCrossword(crosswordId);
      setCrossword(crossword);
      setGridDisplay(buildGrid(crossword));
      console.log("Fetched crossword:", crossword);
    };

    fetchCrossword();
  }, [crosswordId]);
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
  const handleGuessCheck = async () => {
    console.log("Checking the server now (for real)");
    try {
      const newResults = await checkGuesses(crosswordId, gridDisplay);
      setResults(newResults);
      setGridDisplay((prevGridDisplay) => ({
        ...prevGridDisplay,
        evaluation: newResults.evaluationGrid,
      }));
    } catch (error) {
      console.error("Error checking guesses:", error);
      // Optionally, set an error state or show a user-friendly message
    }
  };

  const clues = crossword ? crossword.clues : [];

  return {
    gridDisplay,
    clues,
    results,
    changeLetter,
    handleGuessCheck,
  };
};
