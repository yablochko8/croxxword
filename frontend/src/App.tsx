import React, { useEffect, useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { expandEvaluation } from "./services/expandEvaluation";
import { exampleAuthor } from "../../shared/examples";
import { useController } from "./services/useController";
import { getCrossword } from "./services/serverCalls";
import { FECrossword } from "../../shared/types";

const currentUser = exampleAuthor

const crosswordId = 123



function App() {


  const { gridDisplay, onClickCheck, changeLetter, results } = useController(crosswordId, currentUser.id);

  const [crossword, setCrossword] = useState<FECrossword | null>(null)

  useEffect(() => {
    const fetchCrossword = async () => {
      const crossword = await getCrossword();
      setCrossword(crossword)
      console.log("Fetched crossword:", crossword);
    };

    fetchCrossword();
  }, []);

  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation


  return (
    <>
      <div className="min-h-screen">


        <div>Welcome {currentUser.name}</div>

        <div>Crossword # {crosswordId}</div>
        {crossword &&
          <ShowCrossword gridDisplay={gridDisplay} clues={crossword.clues} onInput={changeLetter} />
        }


        <button
          onClick={() => onClickCheck()}
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
