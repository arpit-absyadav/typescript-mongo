import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class IdValidator {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
