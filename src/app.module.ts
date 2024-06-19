import { Module, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
	/* 
    ! Resolvendo a questão de dependencia circular, usando o forwardRef(),
    ! temos de usar nos modulos que estão com a dependencia circular.
    ! Neste caso userModule e AuthModule
  */
	imports: [
		// Para enxergar o dados do .ENV
		ConfigModule.forRoot({
			envFilePath: process.env.ENV === "test" ? ".env.test" : ".env",
		}),
		// Ferramenta para precaver ataques, RateLimit
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
		forwardRef(() => UsersModule),
		forwardRef(() => AuthModule),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [UserEntity],
			synchronize:
				process.env.ENV === "development" || process.env.ENV === "test",
		}),
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
