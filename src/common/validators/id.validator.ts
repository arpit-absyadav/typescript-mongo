import { IsString, Validate } from 'class-validator';
import { IsObjectId } from './object-id.validator';

export class IdValidator {
  @IsString()
  @Validate(IsObjectId)
  id: string;
}
