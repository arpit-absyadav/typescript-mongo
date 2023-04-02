import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentValidator {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;
}
