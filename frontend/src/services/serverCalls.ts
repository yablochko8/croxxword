import { emptyCrossword } from "../../../shared/examples";
import { Results, GridDisplay, FECrossword } from "../../../shared/types";

export const PORT = 4101; // change this to an import before doing anything serious

const serverPath = `http://localhost:${PORT}`;

/**
 * Fetches a crossword from the server. Returns a FECrossword object, no answers.
 */
export const getCrossword = async (): Promise<FECrossword> => {
  console.log("getCrossword called");
  try {
    const response = await fetch(`${serverPath}/api/crossword/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Server error: ${response.statusText}`);
      return emptyCrossword;
    }

    const json = await response.json();

    if (!json || !json.crossword) {
      console.error("Invalid response format");
      return emptyCrossword;
    }

    return json.crossword;
  } catch (error) {
    console.error("Fetch error:", error);
    return emptyCrossword;
  }
};

/**
 *
 * This will eventually let you send guesses to the server.
 *
 */
export const checkGuesses = async (
  crosswordId: number,
  gridDisplay: GridDisplay
) => {
  const guesses = gridDisplay.guesses;
  const response = await fetch(
    `${serverPath}/api/crossword/check/${crosswordId}`,
    {
      method: "POST",
      body: JSON.stringify({ guesses }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  const results: Results = json.results;
  console.log("The server response was:", results);
  return results; // unused here
};
