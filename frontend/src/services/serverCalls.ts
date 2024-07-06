export const PORT = 4101; // change this to an import before doing anything serious

const serverPath = `http://localhost:${PORT}`;
/**
 *
 * This will eventually fetch a crossword from the server.
 *
 */
export const getCrossword = async () => {
  const response = await fetch(`${serverPath}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //
  // Update this to actually return a crossword
  //
  const json = await response.json();
  console.log("The server response was:", json.message);
  return json.message; // unusued here
};

/**
 *
 * This will eventually let you send guesses to the server.
 *
 */
export const sendGuesses = async (
  message: string,
  setValuesFromServer: Function
) => {
  const response = await fetch(`${serverPath}/newmessage`, {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  const updatedMessages = json.messages;
  console.log("The server response was:", updatedMessages);
  setValuesFromServer(updatedMessages);
  return json.messages; // unused here
};
