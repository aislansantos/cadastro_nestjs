import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async createToken() {
    // return this.jwtService.sign();
  }

  public async checkToken(token: string) {
    // return this.jwtService.verify();
  }

  

}
