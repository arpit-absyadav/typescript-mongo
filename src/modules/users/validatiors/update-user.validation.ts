import { IsString, IsEnum, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { GENDER } from '../user.enum';

export class UpdateUserValidator {
  @IsOptional()
  @IsString()
  @Transform(() => String)
  first_name: string;

  @IsOptional()
  @IsString()
  @Transform(() => String)
  last_name: string;

  @IsOptional()
  @IsEnum(GENDER)
  @Transform(() => String)
  gender: GENDER = GENDER.MALE;

  @IsOptional()
  @IsEmail()
  @Transform(() => String)
  email: string;

  @IsOptional()
  @IsString()
  @Transform(() => String)
  password: string;
}
