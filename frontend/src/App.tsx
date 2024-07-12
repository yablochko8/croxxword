import { useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { exampleCrossWord, exampleGuess } from "./data/examples";
import { AlphaGrid, Evaluation } from "./data/types";
import { expandEvaluation } from "./services/expandEvaluation";
import { getCrossword, checkGuesses } from "./services/serverCalls";
import { Author } from "../../shared/types";

const newAuthor: Author = { name: "Mr Jim" }


function App() {
  const [guessGrid, setGuessGrid] = useState<AlphaGrid>(exampleGuess);
  const [guessEvaluation, setGuessEvaluation] = useState<Evaluation | null>(null);


  return (
    <>
      <ShowCrossword cw={exampleCrossWord} gg={guessGrid} setGG={setGuessGrid} />
      <br />
      <div>{newAuthor.name}</div>
      <br />
      <button
        onClick={() =>
          checkGuesses(guessGrid, setGuessEvaluation)
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
