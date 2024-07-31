import { FutureClue } from "../../shared/types";
import { rootPath, baseId, AIRTABLE_TOKEN } from "./config";

export const cluesTable = "clues"; // tblexSgyLsH7s5378

/**
 * Add a new clue to the clues table on Airtable.
 * This job is currently done by an Airtable form, but this function
 * will be part of a replacement for that eventually.
 */
const addClue = async (
  clue: string,
  answer: string,
  authorName: string
): Promise<void> => {
  const newEntry = {
    fields: {
      clue: clue,
      answer: answer,
      authorName: authorName,
    },
  };
  const records = [newEntry];

  const response = await fetch(`${rootPath}/${baseId}/${cluesTable}`, {
    method: "POST",
    body: JSON.stringify({ records }),
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  const json = await response.json();
  console.log("addClue called, response from AirTable:", json);
};

/*
 * Adds placement details to Clue entry in AT. Used during the registration process.
 */
export const addPlacementToClue = async (
  clueId: string,
  isRow: boolean,
  rowStart: number,
  colStart: number
) => {
  const fields = {
    isRow: isRow.toString(),
    rowStart: rowStart,
    colStart: colStart,
  };

  const response = await fetch(
    `${rootPath}/${baseId}/${cluesTable}/${clueId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ fields }),
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  const json = await response.json();
  console.log("addPlacementToClue called, response from AirTable:", json);
};

export const getUnusedClues = async (): Promise<FutureClue[]> => {
  // filtering for a blank string in crosswords column
  const filterParam = `filterByFormula=crosswords%3D%22%22`;
  const sortParam =
    "sort%5B0%5D%5Bfield%5D=quality&sort%5B0%5D%5Bdirection%5D=desc";

  const response = await fetch(
    `${rootPath}/${baseId}/${cluesTable}?${sortParam}&${filterParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  const json = await response.json();
  console.log("getUnusedClues called, response from AirTable:", json);
  return json.records.map((record: any) => ({
    id: record.id,
    hint: record.fields.hint,
    answer: record.fields.answer,
    author: record.fields.authorName,
  }));
};

export const getAllClues = async (): Promise<FutureClue[]> => {
  const sortParam =
    "sort%5B0%5D%5Bfield%5D=quality&sort%5B0%5D%5Bdirection%5D=desc";

  const response = await fetch(
    `${rootPath}/${baseId}/${cluesTable}?${sortParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  const json = await response.json();
  console.log("getAllClues called, response from AirTable:", json);
  return json.records.map((record: any) => ({
    id: record.id,
    hint: record.fields.hint,
    answer: record.fields.answer,
    author: record.fields.authorName,
  }));
};
