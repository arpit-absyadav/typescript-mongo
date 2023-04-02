import { IsString, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { GENDER } from '../post.enum';

export class CreatePostValidator {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsEnum(GENDER)
  gender: GENDER = GENDER.MALE;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
