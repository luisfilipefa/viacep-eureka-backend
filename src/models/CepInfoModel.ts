import mongoose, { Document, Model, Schema } from "mongoose";

// Interface do Typescript com as propriedades de um cep retornado pelo serviço ViaCep,
// que extende as propriedades de um documento do mongoDB
export interface CepInfo extends Document {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

// Cria um novo Schema do mongoDB
const cepInfoSchema: Schema<CepInfo> = new mongoose.Schema({
  cep: { type: String, unique: true },
  logradouro: String,
  complemento: String,
  bairro: String,
  localidade: String,
  uf: String,
});

// Cria um novo modelo do mongoDB utilizando o Schema anterior
export const CepInfoModel: Model<CepInfo> = mongoose.model(
  "CepInfo",
  cepInfoSchema
);
