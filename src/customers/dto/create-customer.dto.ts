import { STATUS } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(3, {
    message: 'Minimo de 3 caracteres no nome.',
  })
  name: string;

  @IsString()
  @MinLength(3, {
    message: 'Minimo de 3 caracteres no sobrenome.',
  })
  lastname: string;

  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email: string;

  @IsString()
  city: string;
}
