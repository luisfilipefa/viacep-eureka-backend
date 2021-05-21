import mongoose from "mongoose";

// Função recebe um parâmetro uri e o usa para se conectar ao banco utilizando o mongoose.connect,
// e retorna a conexão
export const connectDB = (uri: string) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoose.connection;
};
