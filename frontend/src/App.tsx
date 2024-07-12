import React, { useState } from "react";
import "./App.css";
import { ShowCrossword } from "./components/ShowCW";
import { expandEvaluation } from "./services/expandEvaluation";
import { getCrossword, checkGuesses } from "./services/serverCalls";
import { AlphaGrid, Results, Author, GridDisplay } from "../../shared/types";
import { exampleAuthor, exampleCrossWord, exampleFEGridDisplay } from "../../shared/examples";
import { useController } from "./services/useController";

const currentUser = exampleAuthor



function App() {


  const { gridDisplay, onClickCheck, changeLetter, results } = useController(123, currentUser.id);

  // add useEffect, when guessEvaluation changes, apply evalation.evaluationGrid -> gridDisplay.evaluation

  return (
    <>
      <div>Welcome {currentUser.name}</div>
      <ShowCrossword gridDisplay={gridDisplay} clues={exampleCrossWord.clues} changeLetter={() => changeLetter} />

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
