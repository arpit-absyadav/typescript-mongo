import { MongooseManager } from './mongoose.manager';
import { UserModel } from '../../modules/users/user.model';

export class ModelManager {
  private mongooseManager = new MongooseManager();
  private models: Record<any, any>

  public async set(): Promise<void> {
    const mongoose = await this.mongooseManager.init();
    const userModel = new UserModel(mongoose);
    this.models.User = userModel.getModel();
  }

  public get(key: string): Record<any, any> {
    return this.models[key]
  }

}
