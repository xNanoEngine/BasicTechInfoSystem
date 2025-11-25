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

export class CreatePsuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  wattage: number;

  @IsString()
  @IsNotEmpty()
  certification: string;

  @IsString()
  @IsNotEmpty()
  modularity: string;

  @IsString()
  @IsNotEmpty()
  formFactor: string;

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
