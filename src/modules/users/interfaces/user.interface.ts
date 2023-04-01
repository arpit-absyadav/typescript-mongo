export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  residence: string;
  avatar: string;
  email: string;
  password: string;
  role: any;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  residence: string;
  avatar: string;
  email: string;
  password: string;
  role: any;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
}
