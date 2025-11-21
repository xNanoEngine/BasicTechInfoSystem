import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateRamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  memoryType: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  capacity: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  speed: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  latency: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  modules: number;

  @IsBoolean()
  @IsNotEmpty()
  hasRgb: boolean;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
