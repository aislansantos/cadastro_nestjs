import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { SellersModule } from './sellers/sellers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CustomersModule, SellersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
