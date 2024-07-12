import express from "express";
import cors from "cors";

import { Author } from "../shared/types";
const newAuthor: Author = { name: "Mrs Berlaigne" };
const testingTypes = newAuthor.name;

export const PORT = 4101;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("GET endpoint called.");
  res.json({ message: `"Hello from the server" ${testingTypes}` });
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
