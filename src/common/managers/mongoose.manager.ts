import mongoose, { Model } from 'mongoose';
import { config } from '../../config/index';


export class MongooseManager {
  private static _database: MongooseManager
  private options = {
    dbName: config.MONGO_DB_NAME,
    auth: {
      username: config.MONGO_USERNAME,
      password: config.MONGO_PASSWORD,
    },
    useNewUrlParser: true, useUnifiedTopology: true, 
  };

  public async init() {
    await mongoose
      .connect(`mongodb+srv://${config.MONGO_HOST}`, this.options)
      // .connect(`mongodb://localhost:27017`,)
      .then(() => {
        console.log('Connection Established With Database.',);
      })
      .catch((err: Error) => {
        console.error('Unable to connect to the database:', err);
      });

  }
  public serverStatus () {
    console.log('Db Connection state',mongoose.connection.readyState);
    
    return {
      state: 'up',
      dbState: mongoose.STATES[mongoose.connection.readyState]
    }
  };

  static getInstance() {
    if (!this._database) {
      this._database = new MongooseManager();
    }
    return this._database;
  }

  public getModel<T extends mongoose.Document>(name: string, schema: mongoose.Schema<T>): Model<T> {
    return mongoose.model<T>(name, schema);
  }

}

