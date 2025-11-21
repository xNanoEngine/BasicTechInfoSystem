import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateStorageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  formFactor: string;

  @IsString()
  @IsNotEmpty()
  interface: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  capacity: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  readSpeed?: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  writeSpeed?: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
