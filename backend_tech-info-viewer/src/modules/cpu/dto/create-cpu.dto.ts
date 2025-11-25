import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateCpuDto {
  @IsString()
  @IsNotEmpty({ message: 'El fabricante (brand) es obligatorio' })
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  socket: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  cores: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  threads: number;

  @IsNumber()
  @IsPositive()
  baseClock: number;

  @IsNumber()
  @IsPositive()
  boostClock: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  tdp: number;

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
