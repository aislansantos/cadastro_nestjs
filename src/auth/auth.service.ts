import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
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
		// const user = await this.prisma.user.findFirst({
		//   where: {
		//     email,
		//   },
		// });
		// if (!user) {
		//   throw new UnauthorizedException('E-mail está incorreto.');
		// }
		// // TODO: enviar email ...
		// return true;
	}

	// TODO: implementar o reset de senha
	public async reset(password: string, token: string) {
		// const id = 0;
		// // TODO: Validar o token
		// // troca da senha
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
		//   try {
		//     this.checkToken(token);
		//     return true;
		//   } catch (e) {
		//     return false;
		//   }
		// }
	}
}
