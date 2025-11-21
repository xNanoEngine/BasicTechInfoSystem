import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateGpuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  vram: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  tdp: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
