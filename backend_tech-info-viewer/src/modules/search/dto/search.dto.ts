import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsPositive,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  maxPrice?: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'latest'])
  sort?: 'ASC' | 'DESC' | 'latest';

  @IsOptional()
  @IsString()
  socket?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minVram?: number;

  @IsOptional()
  @IsString()
  memoryType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minWattage?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1; 

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 20;
}
