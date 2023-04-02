import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class IdValidator {
  @IsNumber()
  @IsPositive()
  @Transform(() => Number)
  id: number;
}
