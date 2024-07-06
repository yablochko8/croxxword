import { useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { exampleCrossWord, exampleGuess } from "./data/examples";
import { AlphaGrid, Evaluation } from "./data/types";
import { expandEvaluation } from "./services/expandEvaluation";
import { getCrossword, sendGuesses } from "./services/serverCalls";




function App() {
  const [guessGrid, setGuessGrid] = useState<AlphaGrid>(exampleGuess);
  const [guessEvaluation, setGuessEvaluation] = useState<Evaluation | null>(null);


  return (
    <>
      <ShowCrossword cw={exampleCrossWord} gg={guessGrid} setGG={setGuessGrid} />
      <br />
      <br />
      <button
        onClick={() =>
          sendGuesses("guessGrid", setGuessEvaluation)
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
