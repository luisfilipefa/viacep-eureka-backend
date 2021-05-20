import { cacheMiddleware } from "../middlewares/cacheMiddleware";
import express from "express";
import { getCepInfo } from "../controllers/cepController";

export const cepRouter = express.Router();

cepRouter.get("/:cep", cacheMiddleware, getCepInfo);
