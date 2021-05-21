import { CepInfo, CepInfoModel } from "../models/CepInfoModel";
import { Request, Response } from "express";

import { api } from "../services/api";

// Função que recebe um cep como parâmetro nos dados da requisição e
// faz uma chamada ao serviço ViaCep para buscar os dados do cep desejado.
// Caso o serviço retorne um erro (cep não encontrado), é retornado um status 400
// com um código e uma mensagem, para ser tratado no frontend. Caso o serviço retorne
// os dados do cep, a informação é cacheada no banco para requisições posteriores, e
// o novo documento criado no banco é retornado
export const getCepInfo = async (req: Request, res: Response) => {
  try {
    const { data } = await api.get(`/${req.params.cep}/json`);

    if (data.erro) {
      return res.status(400).json({
        error: true,
        code: "viacep.not_found",
        message: "Resource not found in ViaCep API",
      });
    }

    const cepInfo = await CepInfoModel.create({
      cep: String(data.cep).replace("-", ""),
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    });

    return res.status(200).json({
      success: true,
      cepInfo,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      code: "server.internal_error",
      message: err,
    });
  }
};
