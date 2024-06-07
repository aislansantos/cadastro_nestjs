import { STATUS } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

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
      minSymbols: 0,
    },
    {
      message:
        'Tem de ter caractere pelo menos 6 caracteres sendo 1 maiusculo, 1 minusculo, 1 numero.',
    },
  )
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
