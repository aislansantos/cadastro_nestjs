import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('Customers')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: AuthLoginDto) {}

  @Post('register')
  public async register(@Body() body: AuthRegisterDto) {}

  // TODO: Fazer um metodo de solicitar recuperação de senha FORGET.

  // TODO: Fazer um metodo de troca de senha RESET
}
