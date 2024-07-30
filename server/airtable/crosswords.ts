import { Crossword, FutureClue, Tile } from "../../shared/types";
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
  console.log("getCrossword called, response from AirTable:", json);
  const clues = json.records.map((record: any) => record.fields.clues);

  for (const rawClue of clues) {
    rawClue.isRow = rawClue.isRow === "true";
    rawClue.isChecked = false;
    rawClue.isCorrect = false;
    rawClue.answerLength = getAnswerLength(rawClue.answer);
    rawClue.tiles = [];
    for (let i = 0; i < rawClue.answerLength.length; i++) {
      if (rawClue.isRow) {
        rawClue.tiles.push([rawClue.rowStart + i, rawClue.colStart]);
      } else {
        rawClue.tiles.push([rawClue.rowStart, rawClue.colStart + i]);
      }
    }
  }

  return {
    id: id,
    clues: clues,
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
