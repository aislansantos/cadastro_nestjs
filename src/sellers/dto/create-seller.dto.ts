import { STATUS } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email: string;
}
