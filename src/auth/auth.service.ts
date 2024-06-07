import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  public async createToken() {
    // return this.jwtService.sign();
  }

  public async checkToken(token: string) {
    // return this.jwtService.verify();
  }

  public async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return user;
  }

  public async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto.');
    }

    // TODO: enviar email ...

    return true;
  }

  public async reset(password: string, token: string) {
    const id = 0;
    // TODO: Validar o token

    // troca da senha
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return true;
  }
}
