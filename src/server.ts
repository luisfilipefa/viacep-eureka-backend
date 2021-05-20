import express, { Request, Response } from "express";

import { cepRouter } from "./routes/cepRouter";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT || 3333;
const DB_URI = String(process.env.DB_URI);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const connection = connectDB(DB_URI);

connection.once("open", () =>
  console.log(`[DB] Connection open: ${connection.host}`)
);

app.get("/api", (req: Request, res: Response) => {
  res.send("OK");
});
app.use("/api/cep", cepRouter);

app.listen(PORT, () => {
  console.log("[SERVER] Listening on 3333");
});
