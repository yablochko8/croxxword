import express from "express";
import cors from "cors";
import config from "../shared/config";
import { Crosswords, getFECW } from "./generator/generator";
import { getResults } from "./generator/processors";

const PORT = config.serverPort;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/api/crossword/latest", async (req, res) => {
  console.log("GET endpoint called.");
  const crossword = await getFECW();
  res.json({ crossword });
});

app.post("/api/crossword/check/:id", async (req, res) => {
  const crosswordId = req.params.id;
  console.log(
    "/crossword/check/ POST endpoint called for Crossword ID:",
    crosswordId
  );
  const correctCrossword = Crosswords[0];
  const { guesses } = req.body;
  const results = getResults(correctCrossword, guesses);
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
