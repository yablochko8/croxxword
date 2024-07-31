import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { ShowResults } from "./components/ShowResults";
import { useController } from "./services/useController";
import { primaryButton } from "./styles";


const crosswordId = 110
const playerId = "playerId"

function App() {

  const { gridDisplay, clues, handleGuessCheck, changeLetter, results } = useController(crosswordId, playerId);
  console.log("clues", clues)

  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation


  return (
    <>
      <div className="min-h-screen">

        <div>Crossword # {crosswordId}</div>
        <div className="text-sm text-green-600 m-2">All clues by real humans. If you solve it, you can add your clues to future crosswords.</div>

        <ShowCrossword gridDisplay={gridDisplay} clues={clues} onInput={changeLetter} showResults={!!results} />


        <button
          onClick={() => handleGuessCheck()}
          className={primaryButton}
        >
          Check Answers
        </button>
        <div>
          {(results) ? <ShowResults evaluation={results} /> : null}
        </div>
      </div>
    </>
  );
}

export default App;
