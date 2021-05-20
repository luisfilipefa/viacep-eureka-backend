import { CepInfo, CepInfoModel } from "../models/CepInfoModel";
import { NextFunction, Request, Response } from "express";

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
        data: cepInfo,
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
