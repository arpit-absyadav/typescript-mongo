import { IsObjectId } from './../../../common/validatiors/object-id.validator';
import { IsString, Validate } from 'class-validator';

export class CreateCommentValidator {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @Validate(IsObjectId)
  commented_by: string;

  @IsString()
  @Validate(IsObjectId)
  post_id: string;
}
