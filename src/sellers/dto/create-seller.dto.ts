import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Status } from 'src/enums/active.enum';

export class CreateSellerDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email: string;
}
