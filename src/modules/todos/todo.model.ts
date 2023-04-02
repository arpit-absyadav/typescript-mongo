import mongoose, { Document, Schema } from 'mongoose';
import { ITodo } from './interfaces/todo.interface';
import { TodoStatus } from './todo.enum';

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface ITodoModel extends ITodo, Document {
  _id: string;
}

//DEFINE USER SCHEMA
const TodoSchema: Schema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    status: {
      type: Number,
      required: true,
      default: TodoStatus.TODO,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

//EXPORT
export const Todo = mongoose.model<ITodoModel>('Todo', TodoSchema);
