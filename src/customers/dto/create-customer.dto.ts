import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Status } from 'src/enums/active.enum';

export class CreateCustomerDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsDefined({ message: 'É obrigatório nome.' })
  @IsString()
  @MinLength(3, { message: 'Minimo de 3 caracteres no nome.' })
  nome: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Minimo de 3 caracteres no nome fantasia.' })
  nomefantasia: string;

  @IsDefined({ message: 'É obrigatório! a rua' })
  @IsString()
  @MinLength(3, { message: 'Minimo de 3 caracteres no nome da rua.' })
  rua: string;

  @IsDefined({ message: 'É obrigatório! o numero da residencia' })
  @IsString()
  @MinLength(1, { message: 'Minimo de 1 caracteres no numero da residencia.' })
  numero: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Minimo de 3 caracteres complemento.' })
  complemento: string;

  @IsDefined({ message: 'É obrigatório o bairro da residencia!' })
  @IsString()
  @MinLength(3, { message: 'Minimo de 3 caracteres no nome do bairro.' })
  bairro: string;

  @IsDefined({ message: 'É obrigatório! cidade' })
  @IsString()
  @MinLength(3, { message: 'Minimo de 3 caracteres no nome da cidade.' })
  cidade: string;

  @IsDefined({ message: 'É obrigatório o estado!' })
  @IsString()
  @Length(2)
  estado: string;

  @IsDefined({ message: 'É obrigatório telefone!' })
  @IsString()
  @MinLength(11, { message: 'No minimo 11 caracteres!' })
  telefone: string;

  @IsDefined({ message: 'É obrigatório emmail!' })
  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  email: string;
}
