import dotenv from 'dotenv';
import mongoose, {ConnectOptions} from 'mongoose';

dotenv.config();

const ATLAS_URI: any = process.env.ATLAS_URI;

(async () => {
  const mongooseOptions: ConnectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  try {
    const db = await mongoose.connect(ATLAS_URI, mongooseOptions);

    // eslint-disable-next-line no-console
    console.log('Mongo connection established', db.connection.name);
  } catch (error) {
    throw new Error(error);
  }
})();
