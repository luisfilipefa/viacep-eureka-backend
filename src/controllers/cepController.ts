import { Request, Response } from "express";

import { CepInfoModel } from "../models/CepInfoModel";
import { api } from "../services/api";

export const getCepInfo = async (req: Request, res: Response) => {
  try {
    const { data } = await api.get(`/${req.params.cep}/json`);

    if (data.erro) {
      return res.status(200).json({
        error: true,
        code: "viacep.not_found",
        message: "Resource not found in ViaCep API",
        data,
      });
    }

    const cep = {
      cep: String(data.cep).replace("-", ""),
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };

    const cepInfo = await CepInfoModel.create(cep);

    return res.status(200).json({
      success: true,
      data: cepInfo,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      code: "server.internal_error",
      message: err,
    });
  }
};
