import { Clue, Crossword, FutureClue, Tile } from "../../shared/types";
import { getAnswerLength } from "../generator/processors";
import { addPlacementToClue, cluesTable } from "./clues";
import { rootPath, baseId, AIRTABLE_TOKEN } from "./config";

const crosswordTable = "crosswords";

export const getCrosswordIds = async (): Promise<number[]> => {
  const sortParam = "sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=desc";

  const response = await fetch(
    `${rootPath}/${baseId}/${crosswordTable}?${sortParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  const json = await response.json();
  console.log("getCrosswordIds called, response from AirTable:", json);

  const ids = json.records.map((record: any) => record.fields.id);

  return ids;
};

/** we use croxxword id, not the airtable one
 * in airtable this lives under fields.id
 */
export const getCrosswordFromDB = async (id: number): Promise<Crossword> => {
  const filterParam = `filterByFormula=SEARCH(%22${id}%22%2C%20%7Bcrosswords%7D)`;
  const url = `${rootPath}/${baseId}/${cluesTable}?${filterParam}`;

  // note this calls the CLUES table
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  const json = await response.json();
  console.log("getCrosswordFromDB called, response from AirTable:", json);
  const rawClues = json.records.map((record: any) => record);
  console.log("raw clues:", rawClues);

  const typedClues: Clue[] = [];

  for (const rawClue of rawClues) {
    console.log("rawClue:", rawClue);

    const typedClue: Clue = {
      id: rawClue.id,
      hint: rawClue.fields.hint,
      answer: rawClue.fields.answer,
      author: rawClue.fields.authorName, // TODO... fix this discrepancy
      isRow: rawClue.fields.isRow === "true",
      rowStart: rawClue.fields.rowStart,
      colStart: rawClue.fields.colStart,
      isChecked: false,
      isCorrect: false,
      answerLength: getAnswerLength(rawClue.fields.answer),
      tiles: [],
    };
    const totalLength = typedClue.answerLength.reduce(
      (sum, length) => sum + length,
      0
    );
    for (let i = 0; i < totalLength; i++) {
      if (typedClue.isRow) {
        typedClue.tiles.push({
          row: typedClue.rowStart,
          col: typedClue.colStart + i,
          letter: typedClue.answer[i],
        });
      } else {
        typedClue.tiles.push({
          row: typedClue.rowStart + i,
          col: typedClue.colStart,
          letter: typedClue.answer[i],
        });
      }
    }
    console.log("typedClue hint:", typedClue.hint);
    typedClues.push(typedClue);
  }

  return {
    id: id,
    clues: typedClues,
    withAnswers: true,
  };
};

export const getLatestCrosswords = async (
  quantity: number = 5
): Promise<Crossword[]> => {
  const ids = await getCrosswordIds();
  const latestIds = ids.slice(0, quantity);
  const latestCrosswords = await Promise.all(latestIds.map(getCrosswordFromDB));
  return latestCrosswords;
};

export const getNextCrosswordId = async (): Promise<number> => {
  const ids = await getCrosswordIds();
  return ids[0] + 1;
};

export const registerCrossword = async (
  crossword: Crossword
): Promise<Crossword> => {
  const newId = await getNextCrosswordId();
  const newEntry = {
    fields: {
      clues: crossword.clues.map((clue) => clue.id),
      id: newId,
    },
  };
  const records = [newEntry];

  const response = await fetch(`${rootPath}/${baseId}/${crosswordTable}`, {
    method: "POST",
    body: JSON.stringify({ records }),
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  const json = await response.json();
  const confirmedCrosswordId = Number(json.records[0].fields.id);

  if (confirmedCrosswordId !== newId) {
    throw new Error("Crossword not registered");
  }

  // add placement to every clue
  crossword.clues.forEach((clue) => {
    addPlacementToClue(clue.id, clue.isRow, clue.rowStart, clue.colStart);
  });

  const confirmedCrossword: Crossword = {
    ...crossword,
    id: confirmedCrosswordId,
  };
  return confirmedCrossword;
};

// const test = await getCrossword(100);
// console.log("returned ids:", test);
