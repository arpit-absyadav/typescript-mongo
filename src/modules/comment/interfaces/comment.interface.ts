export interface IComment {
  _id?: string;
  commented_by: string;
  post_id: string;
  title: string;
  body: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ICreateComment {
  commented_by: string;
  post_id: string;
  title: string;
  body: string;
}
