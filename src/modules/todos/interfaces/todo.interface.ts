export interface ITodo {
  _id?: string;
  user_id?: string;
  todo: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ICreateTodo {
  todo: string;
  user_id?: string;
}
