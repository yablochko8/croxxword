import { getEnv } from "../utils/getEnv";

const rootPath = "https://api.airtable.com/v0";
// on an Airtable URL: baseId starts with 'app', tableId starts with 'tbl', viewId starts with 'viw'
const baseId = "appKt0Zoe7tx4IWk9";
const tableIdOrName = "clues"; // tblexSgyLsH7s5378
const AIRTABLE_TOKEN = getEnv("AIRTABLE_TOKEN");

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

// addClue("test", "this", "endpoint");
