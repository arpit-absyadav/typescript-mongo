import { IsString } from 'class-validator';

export class UpdateTodoValidator {
  @IsString()
  first_name: string;
}
