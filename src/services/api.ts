import axios from "axios";

// Cria nova instância do axios com URL base
export const api = axios.create({ baseURL: "https://viacep.com.br/ws" });
