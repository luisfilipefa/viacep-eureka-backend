import { Request, Response } from "express";

import { api } from "../services/api";

export const getCepInfo = async (req: Request, res: Response) => {
  try {
    const { data } = await api.get(`/${req.params.cep}/json`);

    if (!data) {
      res.status(400).json({
        error: true,
        code: "api.invalid",
        message: "Invalid CEP format",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      code: "server.internal_error",
      message: "Server internal error",
    });
  }
};
