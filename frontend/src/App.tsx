import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { expandEvaluation } from "./services/expandEvaluation";
import { useController } from "./services/useController";


const crosswordId = 100
const playerId = "playerId"

function App() {

  const { gridDisplay, clues, handleGuessCheck, changeLetter, results } = useController(crosswordId, playerId);
  console.log("clues", clues)

  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation


  return (
    <>
      <div className="min-h-screen">

        <div>Welcome {playerId}</div>

        <div>Crossword # {crosswordId}</div>

        <ShowCrossword gridDisplay={gridDisplay} clues={clues} onInput={changeLetter} showResults={!!results} />


        <button
          onClick={() => handleGuessCheck()}
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg m-5"
        >
          Check Answers
        </button>
        <div>
          {(results) ? expandEvaluation(results) : null}
        </div>
      </div>
    </>
  );
}

export default App;
