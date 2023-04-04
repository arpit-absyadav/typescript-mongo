import { IsObjectId } from '../../../common/validators/object-id.validator';
import { IsString, Validate } from 'class-validator';

export class CreateTodoValidator {
  @IsString()
  todo: string;

  @IsString()
  @Validate(IsObjectId)
  user_id: string;
}
