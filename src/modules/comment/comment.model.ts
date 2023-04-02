import { STATUS } from '../../consts/status';
import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from './interfaces/comment.interface';

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface ICommentModel extends IComment, Document {
  _id: string;
}

//DEFINE USER SCHEMA
const CommentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
    commented_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
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
export const Comment = mongoose.model<ICommentModel>('Comment', CommentSchema);
