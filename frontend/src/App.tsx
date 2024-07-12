import { useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { expandEvaluation } from "./services/expandEvaluation";
import { getCrossword, checkGuesses } from "./services/serverCalls";
import { AlphaGrid, Evaluation, Author, GridDisplay } from "../../shared/types";
import { exampleCrossWord, exampleFEGridDisplay } from "../../shared/examples";

const newAuthor: Author = { name: "Mr Jim" }


function App() {
  const [gridDisplay, setGridDisplay] = useState<GridDisplay>(exampleFEGridDisplay);
  const [guessEvaluation, setGuessEvaluation] = useState<Evaluation | null>(null);

  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation

  return (
    <>
      <ShowCrossword gridDisplay={gridDisplay} clues={exampleCrossWord.clues} />
      <br />
      <div>{newAuthor.name}</div>
      <br />
      <button
        onClick={() =>
          checkGuesses(gridDisplay, setGuessEvaluation)
        }
      >
        Check Answers
      </button>
      <br />
      {(guessEvaluation) ? expandEvaluation(guessEvaluation) : null}
      <br />
      <button onClick={() => getCrossword()}>Call the GET Endpoint</button>
    </>
  );
}

export default App;
