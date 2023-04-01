import { IsNumber, IsPositive, IsString, IsEnum, IsArray, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export class ListValidator {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page_no = 1;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page_size = 10;

  @IsString()
  @Type(() => String)
  sort_by = 'created_at';

  @IsEnum(SortOrder)
  @Type(() => String)
  sort_order: SortOrder = SortOrder.DESC;

  @IsNumber()
  @IsEnum([1, 2, 3, 4])
  status?: number;

  @IsString()
  @MinLength(3)
  search?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  ids?: number[];
}
