import {
  IsString,
  IsEmail,
  //   IsEnum,
  //   IsOptional,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
// import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  //   @IsEnum(UserRole)
  //   @IsOptional()
  //   roles?: UserRole;
}
