import { useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { exampleCrossWord, exampleGuess } from "./data/examples";
import { AlphaGrid, Evaluation } from "./data/types";
import { expandEvaluation } from "./services/expandEvaluation";

export const PORT = 4101; // change this to an import before doing anything serious

const serverPath = `http://localhost:${PORT}`;

const getData = async () => {
  const response = await fetch(`${serverPath}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("The server response was:", json.message);
  return json.message; // unusued here
};

const postDataAndDisplayResponse = async (
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

function App() {
  const [guessGrid, setGuessGrid] = useState<AlphaGrid>(exampleGuess);
  const [guessEvaluation, setGuessEvaluation] = useState<Evaluation | null>(null);

  return (
    <>
      <ShowCrossword cw={exampleCrossWord} />
      <br />
      <br />
      <button
        onClick={() =>
          postDataAndDisplayResponse("guessGrid", setGuessEvaluation)
        }
      >
        Check Answers
      </button>
      <br />
      {(guessEvaluation) ? expandEvaluation(guessEvaluation) : null}
      <br />
      <button onClick={() => getData()}>Call the GET Endpoint</button>
    </>
  );
}

export default App;
