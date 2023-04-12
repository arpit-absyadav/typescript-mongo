export interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  role: string;
  salt: string;
  hash: string;
  refresh_token?: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ICreateUser {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password?: string;
  role?: string;
}
