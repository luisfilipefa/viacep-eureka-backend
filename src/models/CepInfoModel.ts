import mongoose, { Document, Model, Schema } from "mongoose";

export interface CepInfo extends Document {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const cepInfoSchema: Schema<CepInfo> = new mongoose.Schema({
  cep: { type: String, unique: true },
  logradouro: String,
  complemento: String,
  bairro: String,
  localidade: String,
  uf: String,
});

export const CepInfoModel: Model<CepInfo> = mongoose.model(
  "CepInfo",
  cepInfoSchema
);
