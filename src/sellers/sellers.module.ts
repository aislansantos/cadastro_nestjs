import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
