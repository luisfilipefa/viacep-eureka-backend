import mongoose from "mongoose";

export const connectDB = (uri: string) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoose.connection;
};
