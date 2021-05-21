import { cacheMiddleware } from "../middlewares/cacheMiddleware";
import express from "express";
import { getCepInfo } from "../controllers/cepController";

// Cria um novo router utilizado pela rota /api/cep
export const cepRouter = express.Router();

// Cria uma nova rota do método GET que recebe um cep como parâmetro
cepRouter.get("/:cep", cacheMiddleware, getCepInfo);
