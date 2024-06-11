import { Module, forwardRef } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { SellersModule } from './sellers/sellers.module';
import { UsersModule } from './users/users.module';

@Module({
  /* 
    ! Resolvendo a questão de dependencia circular, usando o forwardRef(),
    ! temos de usar nos modulos que estão com a dependencia circular.
    ! Neste caso userModule e AuthModule
  */
  imports: [
    // Ferramenta para precaver ataques, RateLimit
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    forwardRef(() => UsersModule),
    CustomersModule,
    SellersModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [AppController],
  // Aqui protegempos toda a aplicação de tentativas seguida de acesso, podemos colocar como um guard em uma rota especifica
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
