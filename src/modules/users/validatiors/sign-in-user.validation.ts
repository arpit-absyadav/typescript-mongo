import { IsString, IsEmail } from 'class-validator';

export class SignInUserValidator {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
