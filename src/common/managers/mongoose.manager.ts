import mongoose, { Connection } from 'mongoose';
import { config } from '../../config/index';

export class MongooseManager {
  private static _instance: Connection;
  private options: mongoose.ConnectOptions = {
    dbName: config.MONGO_DB_NAME,
    auth: {
      username: config.MONGO_USERNAME,
      password: config.MONGO_PASSWORD,
    },
  };

  public async init(): Promise<Connection> {
    if (!MongooseManager._instance) {
      MongooseManager._instance = await mongoose.createConnection(`mongodb+srv://${config.MONGO_HOST}`, this.options)
      console.log(MongooseManager._instance);
      
    }
    return MongooseManager._instance;
  }

  public getInstance(): Connection {
    if (!MongooseManager._instance) {
      throw new Error('Mongoose instance not initialized');
    }
    return MongooseManager._instance;
  }
}
