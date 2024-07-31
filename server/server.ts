import express from "express";
import cors from "cors";
import config from "../shared/config";
import { getResults } from "./generator/processors";
import { getCrosswordFromDB } from "./airtable/crosswords";
import { z } from "zod";
import { Crossword } from "../shared/types";

const PORT = config.serverPort;
const app = express();

app.use(express.json());
app.use(cors());

// Zod schema that describes crosswords as they will be send to the Frontend
const StrippedTileSchema = z.object({
  row: z.number(),
  col: z.number(),
  letter: z.string().transform(() => ""),
});

const StrippedClueSchema = z.object({
  id: z.string(),
  hint: z.string(),
  answer: z.string().transform(() => ""),
  answerLength: z.array(z.number()),
  author: z.string(),
  isRow: z.boolean(),
  rowStart: z.number(),
  colStart: z.number(),
  tiles: z.array(StrippedTileSchema),
  isChecked: z.boolean(),
  isCorrect: z.boolean(),
});

const StrippedCrosswordSchema = z.object({
  id: z.number(),
  clues: z.array(StrippedClueSchema),
  withAnswers: z.boolean().transform(() => false),
});

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/api/crossword/:id", async (req, res) => {
  console.log("GET /api/crossword/:id endpoint called.");
  const crosswordId = req.params.id;
  console.log(`Requested crossword ID: ${crosswordId}`);

  try {
    const unsafeCrossword = await getCrosswordFromDB(Number(crosswordId));
    const crossword: Crossword = StrippedCrosswordSchema.parse(unsafeCrossword);
    res.json({ crossword });
  } catch (error) {
    console.error(
      `Error occurred while processing request for crossword ${crosswordId}:`,
      error
    );
    res
      .status(500)
      .json({ error: "An error occurred while fetching the crossword." });
  }
});

app.post("/api/crossword/check/:id", async (req, res) => {
  const crosswordId = req.params.id;
  console.log(
    "/crossword/check/ POST endpoint called for Crossword ID:",
    crosswordId
  );
  const correctCrossword = await getCrosswordFromDB(Number(crosswordId));
  const { guesses } = req.body;
  const results = getResults(correctCrossword, guesses);
  console.log("results at endpoint", results);
  res.json({ results });
});

const storedValues: string[] = [];

app.post("/newmessage", async (req, res) => {
  console.log("POST endpoint called.");
  const newMessage = req.body.message;
  storedValues.push(newMessage);
  res.json({ messages: storedValues });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
