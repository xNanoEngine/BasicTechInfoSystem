import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUrl,
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

  @IsUrl(
    { require_tld: false },
    { message: 'La imagen debe ser una URL válida' },
  )
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
