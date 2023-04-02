import { IsObjectId } from '../../../common/validatiors/object-id.validator';
import { IsString, Validate } from 'class-validator';

export class CreateTodoValidator {
  @IsString()
  todo: string;

  @IsString()
  @Validate(IsObjectId)
  id: string;
}
