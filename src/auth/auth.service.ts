import { MailerService } from "@nestjs-modules/mailer";
import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UsersService } from "..//users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserEntity } from "../users/entities/user.entity";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {
	private issuer: string = "login";
	private audience: string = "user";

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UsersService,
		private readonly mailer: MailerService,
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>
	) {}

	public createToken(user: UserEntity) {
		return {
			accessToken: this.jwtService.sign(
				{
					id: user.id,
					name: user.name,
					email: user.email
				},
				{
					expiresIn: "1 day",
					subject: String(user.id),
					issuer: this.issuer,
					audience: this.audience
				}
			)
		};
	}

	public checkToken(token: string) {
		try {
			const data = this.jwtService.verify(token, {
				issuer: this.issuer,
				audience: this.audience
			});

			return data;
		} catch (e) {
			throw new BadRequestException(e);
		}
	}

	public async login(email: string, password: string) {
		const user = await this.usersRepository.findOneBy({ email });
		if (!user) {
			throw new UnauthorizedException("Email e/ou senha incorretos");
		}
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			throw new UnauthorizedException("Email e/ou senha incorretos");
		}
		return this.createToken(user);
	}

	// TODO: implementar de esqueci a senha.
	public async forget(email: string) {
		const user = await this.usersRepository.findOneBy({ email });
		if (!user) {
			throw new UnauthorizedException("E-mail está incorreto.");
		}
		// TODO? enviar email - Daqui pra frente implementação do envio de email pelo nodemailer
		const token = this.jwtService.sign(
			{
				// colocar o payload para gerar o token de reset de senha.
				user: user.id
			},
			{
				expiresIn: "30 minutes",
				subject: String(user.id),
				issuer: "forget",
				audience: "users"
			}
		);

		await this.mailer.sendMail({
			subject: "Recuperação de senha.",
			to: "aislan.santos@gmail.com",
			template: "forget",
			context: {
				name: user.name,
				token
			}
		});

		return { success: true };
	}

	// TODO: implementar o reset de senha
	public async reset(password: string, token: string) {
		// const id = 0;
		// TODO: Validar o token
		// troca da senha
		// const user = await this.prisma.user.update({
		//   where: {
		//     id,
		//   },
		//   data: {
		//     password,
		//   },
		// });
		// return this.createToken(user);
	}

	public async register(data: AuthRegisterDto) {
		delete data.role;

		const user = await this.userService.create(data as CreateUserDto);

		return this.createToken(user);
	}

	public isValidToken(token: string) {
		try {
			this.checkToken(token);
			return true;
		} catch (e) {
			return false;
		}
	}
}
