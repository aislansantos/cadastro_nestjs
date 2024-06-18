import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  /* 
    ! Resolvendo a questão de dependencia circular, usando o forwardRef(),
    ! temos de usar nos modulos que estão com a dependencia circular.
    ! Neste caso userModule e AuthModule
  */
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
