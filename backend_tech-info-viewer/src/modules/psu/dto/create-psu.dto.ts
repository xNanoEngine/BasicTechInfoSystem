import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
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

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
