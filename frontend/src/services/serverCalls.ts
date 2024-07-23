import {
  AlphaGrid,
  Results,
  GridDisplay,
  FECrossword,
} from "../../../shared/types";

export const PORT = 4101; // change this to an import before doing anything serious

const serverPath = `http://localhost:${PORT}`;

/**
 *
 * Fetches a crossword from the server.
 *
 */
export const getCrossword = async (): Promise<FECrossword> => {
  console.log("getCrossword called");
  const response = await fetch(`${serverPath}/api/crossword/latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //
  // Update this to actually return a crossword
  //
  const json = await response.json();
  console.log("The server response was (message):", json.message);
  console.log("The server response was:", json.crossword);
  return json.crossword; // unusued here
};

/**
 *
 * This will eventually let you send guesses to the server.
 *
 */
export const checkGuesses = async (
  gridDisplay: GridDisplay,
  callbackFn: Function
) => {
  const guesses = gridDisplay.guesses;
  const response = await fetch(`${serverPath}/newmessage`, {
    method: "POST",
    body: JSON.stringify({ guesses }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const updatedMessages: Results = json.messages;
  console.log("The server response was:", updatedMessages);
  callbackFn(updatedMessages);
  return json.messages; // unused here
};
