import express, { Request, Response } from "express";

import { cepRouter } from "./routes/cepRouter";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();
const PORT = process.env.PORT || 3333;
const DB_URI = String(process.env.DB_URI);

// Criar uma instância do Express e definir alguns middlewares
// Middleware do pacote cors para conseguirmos utilizar a API de qualquer endereço
// Middleware do próprio Express para conseguirmos ler o body da requisição em formato JSON
// Middleware do pacote morgan para criar logs de requisição no console
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Chama a função que conecta o banco de dados dado uma URI e retorna uma função do mongoose para trabalharmos com a conexão
const connection = connectDB(DB_URI);

// Utiliza a conexão retornada pela função connectDB e quando a conexão estiver aberta é informado o endereço do banco no console
connection.once("open", () =>
  console.log(`[DB] Connection open: ${connection.host}`)
);

// Rota de testes para checar funcionamento da API
app.get("/api", (req: Request, res: Response) => {
  res.send("OK");
});

// Rota que utilizará o router cepRouter
app.use("/api/cep", cepRouter);

// Iniciar a instância do express que criamos no início do arquivo
app.listen(PORT, () => {
  console.log("[SERVER] Listening on 3333");
});
