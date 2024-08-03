import { useState } from "react";
import "./App.css";
import { LogoExplainer } from "./components/LogoExplainer";
import { ShowCrossword } from "./components/ShowCW";
import { ShowResults } from "./components/ShowResults";
import { useController } from "./services/useController";
import { primaryButton } from "./styles";


const playerId = "playerId"

function App() {

  const crosswordOptions = [108, 110, 111]
  type CrosswordId = (typeof crosswordOptions)[number]
  const [crosswordId, setCrosswordId] = useState<CrosswordId>(111)

  const { gridDisplay, clues, handleGuessCheck, changeLetter, results } = useController(crosswordId, playerId);


  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation


  return (
    <>
      <div className="min-h-screen">

        <LogoExplainer />
        <select
          value={crosswordId}
          onChange={(e) => setCrosswordId(Number(e.target.value))}
          className="mb-4 p-2 rounded bg-gray-700 text-white"
        >
          {crosswordOptions.map((option) => (
            <option key={option} value={option}>
              Crossword #{option}
            </option>
          ))}
        </select>

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
