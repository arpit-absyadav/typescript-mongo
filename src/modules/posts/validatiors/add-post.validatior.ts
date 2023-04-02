import { IsObjectId } from './../../../common/validatiors/object-id.validator';
import { IsString, Validate } from 'class-validator';

export class CreatePostValidator {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  @Validate(IsObjectId)
  user_id: string;
}
