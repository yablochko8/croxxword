import React, { useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { expandEvaluation } from "./services/expandEvaluation";
import { exampleAuthor, exampleCrossWord } from "../../shared/examples";
import { useController } from "./services/useController";

const currentUser = exampleAuthor



function App() {


  const { gridDisplay, onClickCheck, changeLetter, results } = useController(123, currentUser.id);

  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation

  return (
    <>
      <div>Welcome {currentUser.name}</div>
      <ShowCrossword gridDisplay={gridDisplay} clues={exampleCrossWord.clues} onInput={changeLetter} />

      <br />
      <br />
      <button
        onClick={() =>
          onClickCheck()
        }
      >
        Check Answers
      </button>
      <br />
      {(results) ? expandEvaluation(results) : null}
    </>
  );
}

export default App;
