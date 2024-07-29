import { BankClue } from "../../shared/types";
import { getEnv } from "../utils/getEnv";

const rootPath = "https://api.airtable.com/v0";
// on an Airtable URL: baseId starts with 'app', tableId starts with 'tbl', viewId starts with 'viw'
const baseId = "appKt0Zoe7tx4IWk9";
const tableIdOrName = "clues"; // tblexSgyLsH7s5378
const AIRTABLE_TOKEN =
  "pat7r5nabpOM9zI9O.1b147aac2375f08eabeb31395ed00836b2e3601ef90d2f666a325ac5341d1f2a";
// const AIRTABLE_TOKEN = getEnv("AIRTABLE_TOKEN");

const addClue = async (
  clue: string,
  answer: string,
  submitter: string
): Promise<void> => {
  const newEntry = {
    fields: {
      Clue: clue,
      Answer: answer,
      Submitter: submitter,
    },
  };
  const records = [newEntry];

  const response = await fetch(`${rootPath}/${baseId}/${tableIdOrName}`, {
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

export const getClues = async (): Promise<BankClue[]> => {
  const sortParam =
    "sort%5B0%5D%5Bfield%5D=quality&sort%5B0%5D%5Bdirection%5D=desc";

  const response = await fetch(
    `${rootPath}/${baseId}/${tableIdOrName}?${sortParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  const json = await response.json();
  console.log("getClues called, response from AirTable:", json);
  return json.records.map((record: any) => ({
    id: record.id,
    clue: record.fields.hint,
    answer: record.fields.answer,
    submitter: record.fields.authorName,
  }));
};

// addClue("test", "this", "endpoint");

const test = await getClues();
console.log(test);
