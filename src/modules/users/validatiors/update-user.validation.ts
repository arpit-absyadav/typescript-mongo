import { IsNumber, IsPositive, IsString, IsEnum, IsArray, MinLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export class UpdateUserValidator {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform((value) => Number(value))
  page_no = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform((value) => Number(value))
  page_size = 10;

  @IsOptional()
  @IsString()
  @Transform((value) => String(value))
  sort_by = 'created_at';

  @IsOptional()
  @IsEnum(SortOrder)
  @Transform((value) => String(value))
  sort_order: SortOrder = SortOrder.DESC;

  @IsOptional()
  @IsNumber()
  @IsEnum([1, 2, 3, 4])
  status?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  ids?: number[];
}
