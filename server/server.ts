import express from "express";
import cors from "cors";
import config from "../shared/config";
import { getResults, stripAnswers } from "./generator/processors";
import { getCrossword } from "./airtable/crosswords";

const PORT = config.serverPort;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/api/crossword/:id", async (req, res) => {
  console.log("GET endpoint called.");
  const crosswordId = req.params.id;
  const unsafeCrossword = await getCrossword(Number(crosswordId));
  const crossword = stripAnswers(unsafeCrossword);
  res.json({ crossword });
});

app.post("/api/crossword/check/:id", async (req, res) => {
  const crosswordId = req.params.id;
  console.log(
    "/crossword/check/ POST endpoint called for Crossword ID:",
    crosswordId
  );
  const correctCrossword = await getCrossword(Number(crosswordId));
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
