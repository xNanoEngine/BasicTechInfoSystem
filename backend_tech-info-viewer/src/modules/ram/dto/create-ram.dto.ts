import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
  IsUrl,
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

  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
