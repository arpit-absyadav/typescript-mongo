import mongoose from 'mongoose';
import { config } from '../../config/index';

export class MongooseManager {
  private options: mongoose.ConnectOptions = {
    dbName: config.MONGO_DB_NAME,
    auth: {
      username: config.MONGO_USERNAME,
      password: config.MONGO_PASSWORD,
    },
  };

  public async init(): Promise<any> {
    mongoose
      .connect(`mongodb+srv://${config.MONGO_HOST}`, this.options)
      .then(() => {
        console.log('Connection Established With Database.', );
      })
      .catch((err: Error) => {
        console.error('Unable to connect to the database:', err);
      });
  }
}
