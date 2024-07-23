import express from "express";
import cors from "cors";

import { testFECW } from "./generator/generator";
import { getResults } from "./generator/processors";

export const PORT = 4101;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: "Hello from the server" });
});

app.get("/api/crossword/latest", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ crossword: testFECW });
});

app.post("/api/crossword/check/:id", async (req, res) => {
  const crosswordId = Number(req.params.id);
  console.log(
    "/crossword/check/ POST endpoint called for Crossword ID:",
    crosswordId
  );
  const { guesses } = req.body;
  const results = getResults(crosswordId, guesses);
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
