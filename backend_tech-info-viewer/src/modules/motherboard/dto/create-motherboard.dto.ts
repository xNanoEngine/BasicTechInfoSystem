import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
  IsUrl,
} from 'class-validator';

export class CreateMotherboardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  socket: string;

  @IsString()
  @IsNotEmpty()
  chipset: string;

  @IsString()
  @IsNotEmpty()
  formFactor: string;

  @IsString()
  @IsNotEmpty()
  memoryType: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  memorySlots: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  m2Slots: number;

  @IsBoolean()
  @IsNotEmpty()
  hasWifi: boolean;

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
