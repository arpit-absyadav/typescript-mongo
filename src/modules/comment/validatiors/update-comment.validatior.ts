import { IsString } from 'class-validator';

export class UpdateCommentValidator {
  @IsString()
  title: string;

  @IsString()
  body: string;
}
