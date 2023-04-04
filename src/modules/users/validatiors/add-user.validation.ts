import { IsString, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { GENDER, ROLE } from '../user.enum';

export class CreateUserValidator {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsEnum(GENDER)
  gender: GENDER = GENDER.MALE;

  @IsOptional()
  @IsEnum(ROLE)
  role: ROLE = ROLE.USER;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
