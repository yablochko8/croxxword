import express from "express";
import cors from "cors";
import config from "../shared/config";
import { getResults, stripAnswers } from "./generator/processors";
import { getCrosswordFromDB } from "./airtable/crosswords";

const PORT = config.serverPort;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/api/crossword/:id", async (req, res) => {
  console.log("GET /api/crossword/:id endpoint called.");
  const crosswordId = req.params.id;
  console.log(`Requested crossword ID: ${crosswordId}`);

  // try {
  //   console.log(`Fetching crossword with ID ${crosswordId} from database...`);
  //   const json = await getCrosswordFromDB(Number(crosswordId));
  //   console.log(
  //     `Crossword fetched successfully: ${JSON.stringify(unsafeCrossword)}`
  //   );

  //   const unsafeCrossword: Crossword = JSON.stringify(json);

  //   console.log("Stripping answers from the crossword...");
  //   const crossword = stripAnswers(unsafeCrossword);
  //   console.log(`Crossword stripped of answers: ${JSON.stringify(crossword)}`);

  //   console.log("Sending response to client...");
  //   res.json({ crossword });
  //   console.log("Response sent successfully.");
  // } catch (error) {
  //   console.error(
  //     `Error occurred while processing request for crossword ${crosswordId}:`,
  //     error
  //   );
  //   res
  //     .status(500)
  //     .json({ error: "An error occurred while fetching the crossword." });
  // }
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
