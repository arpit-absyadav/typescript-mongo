import { STATUS } from './../../consts/status';
import { Document, Model, Schema } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { MongooseManager } from '../../common/managers/mongoose.manager';

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IUserModel extends IUser, Document {
  _id: string;
}

//DEFINE USER SCHEMA
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

// export const User:Model<IUser> = MongooseManager.getInstance().model<IUserModel>('User', UserSchema);

export const User: Model<IUser> = MongooseManager.getInstance().getModel<IUserModel>('User', UserSchema);