import { STATUS } from './../../consts/status';
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './interfaces/user.interface';

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

//EXPORT
export const User = mongoose.model<IUserModel>('User', UserSchema);
