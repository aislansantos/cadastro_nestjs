import { STATUS } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    { message: 'Pelo menos 6 caracteres a senha!' },
  )
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;
}
