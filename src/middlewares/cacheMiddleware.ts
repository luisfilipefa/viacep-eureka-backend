import { CepInfo, CepInfoModel } from "../models/CepInfoModel";
import { NextFunction, Request, Response } from "express";

// Função de middleware que recebe um cep como parâmetro e faz uma busca no
// banco de dados pra ver se seus dados já foram cacheado, caso verdadeiro,
// retorna os dados cacheados na resposta, caso os dados não existam no cache
// a função next é chamada, direcionando a requisição para a função getCepInfo
// dentro do cepController
export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cepInfo = await CepInfoModel.findOne({ cep: req.params.cep });

    if (cepInfo) {
      return res.status(200).json({
        success: true,
        cepInfo,
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      error: true,
      code: "server.internal_error",
      message: err,
    });
  }
};
