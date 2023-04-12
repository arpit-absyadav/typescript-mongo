import { STATUS } from './../../consts/status';
import { Document, Schema, Model, Connection } from 'mongoose';
import { IUser } from './interfaces/user.interface';

export class UserModel {
  private User: Model<IUser & Document>;

  constructor(mongoose: Connection) {
    const UserSchema: Schema = new Schema(
      {
        first_name: {
          type: String,
          required: true,
        },
        last_name: {
          type: String,
          required: true,
        },
        gender: {
          type: String,
          default: 'male',
        },
        role: {
          type: String,
          default: 'user',
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        hash: {
          type: String,
          required: true,
        },
        salt: {
          type: String,
          required: true,
        },
        refresh_token: {
          type: String,
          required: true,
        },
        status: {
          type: Number,
          required: true,
          default: STATUS.ENABLED,
        },
        deleted_at: {
          type: Date,
          default: null,
        },
      },
      { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
    );

    this.User = mongoose.model<IUser & Document>('User', UserSchema);
  }

  public getModel(): Model<IUser & Document> {
    return this.User;
  }
}