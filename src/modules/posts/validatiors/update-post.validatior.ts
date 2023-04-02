import { IsString, IsOptional } from 'class-validator';

export class UpdatePostValidator {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;
}
