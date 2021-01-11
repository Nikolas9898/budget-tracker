import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

const ATLAS_URI: any = process.env.ATLAS_URI;

(async () => {
  const mongooseOptions: ConnectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  const db = await mongoose.connect(ATLAS_URI, mongooseOptions);

  console.log("Mongo connection established", db.connection.name);
})();
